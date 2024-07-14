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
}

// Handle POST requests
export async function POST(req: NextRequest) {
    const {
        name, code, description, createdby,
        categoryid, colorid, sizeid, brandid,
        imageurl, quantity
    } = await req.json() as ProductDescription;

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const checkDuplicateProduct = `
            SELECT COUNT(*) AS count FROM productmaster WHERE LOWER(name) = LOWER(?) OR LOWER(code) = LOWER(?)
        `;
        const [duplicateProductResult] = await connection.execute(checkDuplicateProduct, [name, code]);
        const duplicateCount = duplicateProductResult[0].count;

        if (duplicateCount > 0) {
            await connection.rollback();
            return NextResponse.json(
                { message: 'Product already exists' },
                { status: 400 }
            );
        }

        const insertProductMaster = `
            INSERT INTO productmaster (name, code, description, createdby, createdat)
            VALUES (?, ?, ?, ?, NOW())
        `;
        const [productMasterResult] = await connection.execute(insertProductMaster, [name, code, description, createdby]);
        const productMasterId = productMasterResult.insertId;

        const insertProductDetails = `
            INSERT INTO productdetails (productmasterid, categoryid, colorid, sizeid, brandid, createdby, createdat)
            VALUES (?, ?, ?, ?, ?, ?, NOW())
        `;
        const [productDetailsResult] = await connection.execute(insertProductDetails, [productMasterId, categoryid, colorid, sizeid, brandid, createdby]);
        const productDetailsId = productDetailsResult.insertId;

        if (imageurl && imageurl.length > 0) {
            const insertImages = `
                INSERT INTO images (url, productmasterid, productdetailsid, createdby, createdat)
                VALUES (?, ?, ?, ?, NOW())
            `;
            for (const url of imageurl) {
                await connection.execute(insertImages, [url, productMasterId, productDetailsId, createdby]);
            }
        }

        if (quantity !== undefined) {
            const insertProductInventory = `
                INSERT INTO productinventory (productdetailsid, quantity, createdby, createdat)
                VALUES (?, ?, ?, NOW())
            `;
            await connection.execute(insertProductInventory, [productDetailsId, quantity, createdby]);
        }

        await connection.commit();
        return NextResponse.json(
            { message: 'Product created successfully' },
            { status: 200 }
        );
    } catch (error) {
        await connection.rollback();
        console.error('Error adding product:', error);
        return NextResponse.json(
            { message: 'Error adding product' },
            { status: 500 }
        );
    } finally {
        connection.release();
    }
}

// Handle GET requests
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const searchkey = searchParams.get('searchkey') || '';
    const sorttype = searchParams.get('sorttype') || 'low-to-high';

    try {
        const [rows] = await pool.query('CALL searchgetsortitems(?, ?)', [searchkey, sorttype]);

        const productsMap = new Map();

        rows[0].forEach((row: any) => {
            const productMasterId = row.productmasterid;

            if (!productsMap.has(productMasterId)) {
                productsMap.set(productMasterId, {
                    ProductMasterId: row.productmasterid,
                    Name: row.name,
                    Code: row.code,
                    Description: row.description,
                    CreatedAt: row.productmastercreatedat,
                    CreatedBy: row.productmastercreatedby,
                    Details: []
                });
            }

            const product = productsMap.get(productMasterId);
            const productDetailsId = row.productdetailsid;
            const productDetail = product.Details.find((detail: any) => detail.ProductDetailsId === productDetailsId);

            if (!productDetail) {
                const newDetail = {
                    ProductDetailsId: row.productdetailsid,
                    CategoryId: row.categoryid,
                    ColorId: row.colorid,
                    SizeId: row.sizeid,
                    BrandId: row.brandid,
                    Price: row.price,
                    CreatedAt: row.productdetailscreatedat,
                    CreatedBy: row.productdetailscreatedby,
                    Images: [],
                    Inventory: {
                        ProductInventoryId: row.productinventoryid,
                        Quantity: row.quantity,
                        AvailabilityStatus: row.availabilitystatus,
                        CreatedAt: row.productinventorycreatedat,
                        CreatedBy: row.productinventorycreatedby
                    }
                };
                product.Details.push(newDetail);
            } else {
                if (row.imageid) {
                    productDetail.Images.push({
                        ImageId: row.imageid,
                        Url: row.imageurl,
                        CreatedAt: row.imagecreatedat,
                        CreatedBy: row.imagecreatedby
                    });
                }
            }
        });

        const processedProductData = Array.from(productsMap.values());
        return NextResponse.json(
            { products: processedProductData },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching product data:', error);
        return NextResponse.json(
            { error: 'Error fetching product data' },
            { status: 500 }
        );
    }
}

// Handle PUT requests
export async function PUT(req: NextRequest) {
    const {
        productmasterid, productdetailsid,
        name, code, description, updatedby,
        categoryid, colorid, sizeid, brandid,
        imageurl, quantity
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
            SET categoryid = ?, colorid = ?, sizeid = ?, brandid = ?, updatedby = ?, updatedat = NOW()
            WHERE id = ?
        `;
        await connection.execute(updateProductDetails, [categoryid, colorid, sizeid, brandid, updatedby, productdetailsid]);

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
