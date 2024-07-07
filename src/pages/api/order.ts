import type { NextApiRequest, NextApiResponse } from 'next';
const pool = require('@/config/db');
const databaseConnection = require('@/config/dbconnect');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { cartId, userId, paymentMethodId, transactionId, shippingMethodId } = req.body;

        if (!cartId || !userId || !paymentMethodId || !shippingMethodId) {
            return res.status(400).json({ message: 'Cart ID, User ID, Payment Method ID, and Shipping Method ID are required' });
        }

        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            // Fetch cart details
            const [cartDetails] = await connection.query(
                'SELECT * FROM cartdetails WHERE CartMasterId = ?',
                [cartId]
            );

            if (cartDetails.length === 0) {
                await connection.rollback();
                return res.status(404).json({ message: 'Cart not found' });
            }

            // Calculate total amount from cart details
            const totalAmount = cartDetails.reduce((sum: number, product: any) => sum + product.TotalPrice, 0);

            // Generate a random order number
            const orderNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

            // Insert order master record
            const insertOrderMasterQuery = `
                INSERT INTO ordermaster (UserId, TotalAmount, OrderDate, OrderNumber, OrderStatusId)
                VALUES (?, ?, NOW(), ?, 2)
            `;
            const [orderMasterResult] = await connection.query(insertOrderMasterQuery, [userId, totalAmount, orderNumber]);
            const orderMasterId = orderMasterResult.insertId;

            // Insert order details records
            const insertOrderDetailsPromises = cartDetails.map((product: any) => {
                const { ProductMasterId, Quantity, TotalPrice } = product;
                const insertOrderDetailsQuery = `
                    INSERT INTO orderdetails (OrderMasterId, ProductMasterId, Quantity, TotalPrice)
                    VALUES (?, ?, ?, ?)
                `;
                return connection.query(insertOrderDetailsQuery, [orderMasterId, ProductMasterId, Quantity, TotalPrice]);
            });

            await Promise.all(insertOrderDetailsPromises);

            // Determine payment status ID based on payment method ID
            const paymentStatusId = paymentMethodId === 1 ? 2 : 1;

            // Insert payment information
            const insertPaymentInfoQuery = `
                INSERT INTO paymentinformations (UserId, PaymentMethodId, OrderMasterId, TransactionId, PaymentStatusId, PaymentDate)
                VALUES (?, ?, ?, ?, ?, NOW())
            `;
            const insertPaymentInfoValues = [userId, paymentMethodId, orderMasterId, transactionId || null, paymentStatusId];
            await connection.query(insertPaymentInfoQuery, insertPaymentInfoValues);

            // Insert shipping information
            const insertShippingInfoQuery = `
                INSERT INTO shippinginformations (OrderMasterId, ShippingMethodId)
                VALUES (?, ?)
            `;
            await connection.query(insertShippingInfoQuery, [orderMasterId, shippingMethodId]);

            // Delete the cart and its details
            await connection.query('DELETE FROM cartdetails WHERE CartMasterId = ?', [cartId]);
            await connection.query('DELETE FROM cartmaster WHERE id = ?', [cartId]);

            await connection.commit();
            res.status(200).json({ message: 'Checkout successful' });
        } catch (error) {
            await connection.rollback();
            console.error('Error during checkout:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            connection.release();
        }
    } else if(req.method === 'GET'){
        try {
            const getOrderInfo = 'CALL GetAllOrderInformation()';
            const [result] = await pool.execute(getOrderInfo);
            res.status(200).json([result]);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            console.error(error)
        }
    }
    
    else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
