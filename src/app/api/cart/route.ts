import { error } from 'console';
import type { NextApiRequest, NextApiResponse } from 'next';
const pool = require('@/config/db')
const databaseConnection = require('@/config/dbconnect')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // view all the Brand information
    if (req.method === 'GET') {
        try {
            // Process a GET request
            const { userid }: { userid: number } = req.body;
            const getCartInfo = `CALL GetUserCart(${userid}); `
            const [result] = await pool.execute(getCartInfo);
            console.log([result])
            // debugger;
            res.status(200).json([result]);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            console.error(error);
        }
        // Add nother Brand
    } else if (req.method === 'POST') {
        const { userid, products } = req.body;
    
        if (!userid || !products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: 'UserId and a non-empty array of products are required' });
        }
    
        const connection = await pool.getConnection();
    
        try {
            await connection.beginTransaction();
    
            // Check if cart exists for the user
            let cartMasterId;
            const [cartMasterRows] = await connection.query(
                'SELECT id FROM cartmaster WHERE userid = ?',
                [userid]
            );
    
            if (cartMasterRows.length === 0) {
                // If cart not found, create a new cart
                const createCartMasterQuery = `
                    INSERT INTO cartmaster (UserId, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy)
                    VALUES (?, NOW(), ?, NOW(), ?)
                `;
                const createCartMasterValues = [userid, userid, userid];
    
                const [createCartMasterResult] = await connection.query(createCartMasterQuery, createCartMasterValues);
                cartMasterId = createCartMasterResult.insertId;
            } else {
                cartMasterId = cartMasterRows[0].id;
            }
    
            // Prepare multiple product insertions
            const insertPromises = products.map(async (product) => {
                const { productid, quantity } = product;
    
                // Insert into cartdetails for each product
                const insertCartDetailQuery = `
                    INSERT INTO cartdetails (CartMasterId, ProductMasterId, Quantity, TotalPrice, CreatedAt, CreatedBy)
                    VALUES (?, ?, ?, 
                        (SELECT price * ? FROM productdetails WHERE ProductMasterId = ?), 
                        NOW(), ?)
                `;
                const insertCartDetailValues = [cartMasterId, productid, quantity, quantity, productid, userid];
    
                const [insertCartDetailResult] = await connection.query(insertCartDetailQuery, insertCartDetailValues);
                return insertCartDetailResult.insertId;
            });
    
            // Execute all insertions
            const cartDetailIds = await Promise.all(insertPromises);
    
            // Commit transaction
            await connection.commit();
            res.status(201).json({ message: 'Products added to cart successfully', cartDetailIds });
        } catch (error) {
            await connection.rollback();
            console.error('Error adding products to cart:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            connection.release();
        }
    }
    
    
     else if (req.method === 'PUT') {
        

    const { userid, cartDetailId, newQuantity } = req.body;

    if (!userid || !cartDetailId || !newQuantity) {
        return res.status(400).json({ message: 'UserId, CartDetailId, and NewQuantity are required' });
    }

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // Check if cart detail exists for the user
        const [cartDetailRows] = await connection.query(
            'SELECT * FROM cartdetails WHERE id = ? AND CartMasterId IN (SELECT id FROM cartmaster WHERE userid = ?)',
            [cartDetailId, userid]
        );

        if (cartDetailRows.length === 0) {
            await connection.rollback();
            return res.status(404).json({ message: 'Cart detail not found for the user' });
        }

        const productid = cartDetailRows[0].ProductMasterId;

        // Update product price and calculate new total price
        const [priceRows] = await connection.query(
            'SELECT price FROM productdetails WHERE ProductMasterId = ?',
            [productid]
        );

        if (priceRows.length === 0) {
            await connection.rollback();
            return res.status(404).json({ message: 'Product details not found' });
        }

        const price = priceRows[0].price;
        const totalPrice = price * newQuantity;

        // Update cart detail with new quantity and total price
        const updateCartDetailQuery = `
            UPDATE cartdetails
            SET Quantity = ?, TotalPrice = ?, UpdatedAt = NOW()
            WHERE id = ?
        `;
        const updateCartDetailValues = [newQuantity, totalPrice, cartDetailId];

        await connection.query(updateCartDetailQuery, updateCartDetailValues);

        // Commit transaction
        await connection.commit();
        res.status(200).json({ message: 'Cart product updated successfully' });
    } catch (error) {
        await connection.rollback();
        console.error('Error updating cart product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        connection.release();
        }
    }
    else if (req.method === 'DELETE') {
        try {
            const { userid, cartDetailId } = req.body;

            if (!userid || !cartDetailId) {
                return res.status(400).json({ message: 'UserId and CartDetailId are required' });
            }

            const connection = await pool.getConnection();

            try {
                await connection.beginTransaction();

                // Check if cart detail exists for the user
                const [cartDetailRows] = await connection.query(
                    'SELECT * FROM cartdetails WHERE id = ? AND CartMasterId IN (SELECT id FROM cartmaster WHERE userid = ?)',
                    [cartDetailId, userid]
                );

                if (cartDetailRows.length === 0) {
                    await connection.rollback();
                    return res.status(404).json({ message: 'Cart detail not found for the user' });
                }

                // Delete specific product from cart details
                await connection.query(
                    'DELETE FROM cartdetails WHERE id = ?',
                    [cartDetailId]
                );

                // Commit transaction
                await connection.commit();
                res.status(200).json({ message: 'Product deleted from cart successfully' });
            } catch (error) {
                await connection.rollback();
                console.error('Error deleting product from cart:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Database connection error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}

