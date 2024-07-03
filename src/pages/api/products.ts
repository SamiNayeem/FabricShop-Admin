import type { NextApiRequest, NextApiResponse } from 'next';
const pool = require('@/config/db');
const databaseConnection = require('@/config/dbconnect');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const {
            name, code, description, createdby,
            categoryid, colorid, sizeid, brandid,
            imageurl, quantity
        } = req.body;

        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            // Check category, color, size, brand active status
            const checkActiveStatus = `
                SELECT 
                    (SELECT COUNT(*) FROM categories WHERE id = ? AND activestatus = 1) AS categoryActive,
                    (SELECT COUNT(*) FROM colors WHERE id = ? AND activestatus = 1) AS colorActive,
                    (SELECT COUNT(*) FROM sizes WHERE id = ? AND activitystatus = 1) AS sizeActive,
                    (SELECT COUNT(*) FROM brands WHERE id = ? AND activestatus = 1) AS brandActive
            `;
            const [activeStatusResult] = await connection.execute(checkActiveStatus, [categoryid, colorid, sizeid, brandid]);
            const { categoryActive, colorActive, sizeActive, brandActive } = activeStatusResult[0];

            if (!categoryActive) {
                await connection.rollback();
                return res.status(400).json({ error: 'Category not available' });
            }
            if (!colorActive) {
                await connection.rollback();
                return res.status(400).json({ error: 'Color not available' });
            }
            if (!sizeActive) {
                await connection.rollback();
                return res.status(400).json({ error: 'Size not available' });
            }
            if (!brandActive) {
                await connection.rollback();
                return res.status(400).json({ error: 'Brand not available' });
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

            const insertImages = `
                INSERT INTO images (url, productmasterid, productdetailsid, createdby, createdat)
                VALUES (?, ?, ?, ?, NOW())
            `;

            for (const url of imageurl) {
                await connection.execute(insertImages, [url, productMasterId, productDetailsId, createdby]);
            }

            const insertProductInventory = `
                INSERT INTO productinventory (productdetailsid, quantity, createdby, createdat)
                VALUES (?, ?, ?, NOW())
            `;
            await connection.execute(insertProductInventory, [productDetailsId, quantity, createdby]);

            await connection.commit();
            res.status(200).json({ message: 'Product added successfully' });
        } catch (error) {
            await connection.rollback();
            console.error('Error adding product:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            connection.release();
        }
    } else if (req.method === 'GET') {

        const { searchkey } = req.body; // Assuming searchkey is correctly populated from req.body
        const {sorttype} = req.body;

        try {
            const [rows] = await pool.query('CALL searchgetsortitems(?, ?)', [searchkey, sorttype]);

            
            // Process rows as needed
            console.log('Search results:', rows);

            res.status(200).json(rows); 
        
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
            res.status(200).json(processedProductData);
        } catch (error) {
            console.error('Error fetching product data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (req.method === 'PUT') {
        const {
            productmasterid, productdetailsid,
            name, code, description, updatedby,
            categoryid, colorid, sizeid, brandid,
            imageurl, quantity
        } = req.body;

        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            // Check category, color, size, brand active status
            const checkActiveStatus = `
                SELECT 
                    (SELECT COUNT(*) FROM categories WHERE id = ? AND activestatus = 1) AS categoryActive,
                    (SELECT COUNT(*) FROM colors WHERE id = ? AND activestatus = 1) AS colorActive,
                    (SELECT COUNT(*) FROM sizes WHERE id = ? AND activitystatus = 1) AS sizeActive,
                    (SELECT COUNT(*) FROM brands WHERE id = ? AND activestatus = 1) AS brandActive
            `;
            const [activeStatusResult] = await connection.execute(checkActiveStatus, [categoryid, colorid, sizeid, brandid]);
            const { categoryActive, colorActive, sizeActive, brandActive } = activeStatusResult[0];

            if (!categoryActive) {
                await connection.rollback();
                return res.status(400).json({ error: 'Category not available' });
            }
            if (!colorActive) {
                await connection.rollback();
                return res.status(400).json({ error: 'Color not available' });
            }
            if (!sizeActive) {
                await connection.rollback();
                return res.status(400).json({ error: 'Size not available' });
            }
            if (!brandActive) {
                await connection.rollback();
                return res.status(400).json({ error: 'Brand not available' });
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

            const updateQuantity = `
                UPDATE productinventory
                SET quantity = ?, updatedby = ?, updatedat = NOW()
                WHERE productdetailsid = ?
            `;
            await connection.execute(updateQuantity, [quantity, updatedby, productdetailsid]);

            // Delete existing images
            const deleteImages = `
                DELETE FROM images WHERE productdetailsid = ?
            `;
            await connection.execute(deleteImages, [productdetailsid]);

            // Insert new images
            const insertImages = `
                INSERT INTO images (url, productmasterid, productdetailsid, createdby, createdat)
                VALUES (?, ?, ?, ?, NOW())
            `;
            for (const url of imageurl) {
                await connection.execute(insertImages, [url, productmasterid, productdetailsid, updatedby]);
            }

            await connection.commit();
            res.status(200).json({ message: 'Product updated successfully' });
        } catch (error) {
            await connection.rollback();
            console.error('Error updating product:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            connection.release();
        }
    }
    
    else if(req.method === 'DELETE'){
        const deleteProduct = `
            UPDATE productmaster
            SET activestatus = 0, deletedby = ?, deletedat = NOW()
            WHERE id = ?
        `;
        const { deletedby, productmasterid } = req.body;
        try {
            const [result] = await pool.execute(deleteProduct, [productmasterid, deletedby]);
            res.status(200).json({ message: 'Product deleted successfully', result });
        }
        catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
