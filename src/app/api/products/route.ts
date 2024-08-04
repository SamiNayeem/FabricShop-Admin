import { NextRequest, NextResponse } from 'next/server';
const pool = require('@/config/db');

type ProductDescription = {
    name: string;
    code: string;
    description: string;
    createdby?: number;
    categoryid: number;
    colorid: number;
    sizeid: number;
    brandid: number;
    imageurl?: string[];
    quantity?: number;
    searchkey?: string;
    sorttype?: string;
    productmasterid?: number;
    productdetailsid?: number;
    updatedby?: number;
    deletedby?: number;
    cost: number;
    price: number; // added price here
}

// Handle POST requests
export async function POST(req: NextRequest) {
    const {
        name, code, description, createdby,
        categoryid, colorid, sizeid, brandid,
        imageurl, cost, price, quantity
    } = await req.json() as ProductDescription;

    if (!name || !code || !description || !createdby || !categoryid || !colorid || !sizeid || !brandid || !cost || !price) {
        return NextResponse.json({ message: 'All required fields must be provided' }, { status: 400 });
    }

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // Check for duplicate products
        const [duplicateProductResult] = await connection.execute(
            `SELECT COUNT(*) AS count FROM productmaster WHERE LOWER(name) = LOWER(?) OR LOWER(code) = LOWER(?)`,
            [name, code]
        );
        if (duplicateProductResult[0].count > 0) {
            await connection.rollback();
            return NextResponse.json({ message: 'Product already exists' }, { status: 400 });
        }

        // Insert into productmaster
        const [productMasterResult] = await connection.execute(
            `INSERT INTO productmaster (name, code, description, createdby, createdat) VALUES (?, ?, ?, ?, NOW())`,
            [name, code, description, createdby]
        );
        const productMasterId = productMasterResult.insertId;

        // Insert into productdetails
        const [productDetailsResult] = await connection.execute(
            `INSERT INTO productdetails (productmasterid, categoryid, colorid, sizeid, brandid, createdby, createdat,buyingprice, price) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?)`,
            [productMasterId, categoryid, colorid, sizeid, brandid, createdby, cost, price]
        );
        const productDetailsId = productDetailsResult.insertId;

        // Insert images
        if (imageurl && imageurl.length > 0) {
            const insertImages = `INSERT INTO images (url, productmasterid, productdetailsid, createdby, createdat) VALUES (?, ?, ?, ?, NOW())`;
            for (const url of imageurl) {
                await connection.execute(insertImages, [url, productMasterId, productDetailsId, createdby]);
            }
        }

        // Insert quantity (if provided)
        if (quantity !== undefined) {
            await connection.execute(
                `INSERT INTO productinventory (productdetailsid, quantity, createdby, createdat) VALUES (?, ?, ?, NOW())`,
                [productDetailsId, quantity, createdby]
            );
        }

        await connection.commit();
        return NextResponse.json({ message: 'Product created successfully' }, { status: 200 });
    } catch (error) {
        await connection.rollback();
        console.error('Error adding product:', error);
        return NextResponse.json({ message: 'Error adding product' }, { status: 500 });
    } finally {
        connection.release();
    }
}

// Handle GET requests
export async function GET(req: NextRequest) {
    try {
        // Fetch product details including inventory and images
        const [rows] = await pool.query(`
            SELECT pm.id AS ProductMasterId, pm.name, pm.description, pd.price, b.name AS brandname, 
                   i.url AS imageurl, pi.quantity
            FROM productmaster pm
            JOIN productdetails pd ON pm.id = pd.productmasterid
            JOIN brands b ON pd.brandid = b.id
            LEFT JOIN images i ON pm.id = i.productmasterid
            LEFT JOIN productinventory pi ON pd.id = pi.productdetailsid
            WHERE pm.activestatus = 1
        `);

        // Process rows to group images by product
        const productsMap = new Map();

        rows.forEach((row: any) => {
            const productMasterId = row.ProductMasterId;

            if (!productsMap.has(productMasterId)) {
                productsMap.set(productMasterId, {
                    ProductMasterId: productMasterId,
                    Name: row.name,
                    Description: row.description,
                    Price: row.price,
                    BrandName: row.brandname,
                    Quantity: row.quantity,
                    ImageUrl: row.imageurl ? [row.imageurl] : [],
                });
            } else {
                const product = productsMap.get(productMasterId);
                if (row.imageurl) {
                    product.ImageUrl.push(row.imageurl);
                }
            }
        });

        const processedProductData = Array.from(productsMap.values());
        return NextResponse.json({ products: processedProductData }, { status: 200 });
    } catch (error) {
        console.error('Error fetching product data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// Handle PUT requests
export async function PUT(req: NextRequest) {
    const {
        productmasterid, productdetailsid,
        name, code, description, updatedby,
        categoryid, colorid, sizeid, brandid,
        imageurl, quantity, price
    } = await req.json() as ProductDescription;

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const checkActiveStatus = `
            SELECT 
                (SELECT COUNT(*) FROM categories WHERE id = ? AND activestatus = 1) AS categoryActive,
                (SELECT COUNT(*) FROM colors WHERE id = ? AND activestatus = 1) AS colorActive,
                (SELECT COUNT(*) FROM sizes WHERE id = ? AND activitystatus = 1) AS sizeActive,
                (SELECT COUNT(*) FROM brands WHERE id = ? AND activestatus = 1) AS brandActive
        `;
        const [activeStatusResult] = await connection.execute(checkActiveStatus, [categoryid, colorid, sizeid, brandid]);
        const { categoryActive, colorActive, sizeActive, brandActive } = activeStatusResult[0];

        if (!categoryActive || !colorActive || !sizeActive || !brandActive) {
            await connection.rollback();
            return NextResponse.json(
                { message: 'One or more related entities are not active' },
                { status: 400 }
            );
        }

        const updateProductMaster = `
            UPDATE productmaster
            SET name = ?, code = ?, description = ?, updatedby = ?, updatedat = NOW()
            WHERE id = ?
        `;
        await connection.execute(updateProductMaster, [name, code, description, updatedby, productmasterid]);

        const updateProductDetails = `
            UPDATE productdetails
            SET categoryid = ?, colorid = ?, sizeid = ?, brandid = ?, updatedby = ?, updatedat = NOW(), price = ?
            WHERE id = ?
        `;
        await connection.execute(updateProductDetails, [categoryid, colorid, sizeid, brandid, updatedby, price, productdetailsid]);

        if (quantity !== undefined) {
            const updateQuantity = `
                UPDATE productinventory
                SET quantity = ?, updatedby = ?, updatedat = NOW()
                WHERE productdetailsid = ?
            `;
            await connection.execute(updateQuantity, [quantity, updatedby, productdetailsid]);
        }

        if (imageurl && imageurl.length > 0) {
            const deleteImages = `
                DELETE FROM images WHERE productdetailsid = ?
            `;
            await connection.execute(deleteImages, [productdetailsid]);

            const insertImages = `
                INSERT INTO images (url, productmasterid, productdetailsid, createdby, createdat)
                VALUES (?, ?, ?, ?, NOW())
            `;
            for (const url of imageurl) {
                await connection.execute(insertImages, [url, productmasterid, productdetailsid, updatedby]);
            }
        }

        await connection.commit();
        return NextResponse.json(
            { message: 'Product updated successfully' },
            { status: 200 }
        );
    } catch (error) {
        await connection.rollback();
        console.error('Error updating product:', error);
        return NextResponse.json(
            { message: 'Error updating product' },
            { status: 500 }
        );
    } finally {
        connection.release();
    }
}

// Handle DELETE requests
export async function DELETE(req: NextRequest) {
    const deleteProduct = `
        UPDATE productmaster
        SET activestatus = 0, deletedby = ?, deletedat = NOW()
        WHERE id = ?
    `;
    const { deletedby, productmasterid } = await req.json() as ProductDescription;
    try {
        const [result] = await pool.execute(deleteProduct, [deletedby, productmasterid]);
        return NextResponse.json(
            { message: 'Product deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json(
            { message: 'Error deleting product' },
            { status: 500 }
        );
    }
}
