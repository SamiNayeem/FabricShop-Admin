import { error } from 'console';
import { NextRequest, NextResponse } from "next/server";
const pool = require('@/config/db')
const databaseConnection = require('@/config/dbconnect')

type UserRequest = {
    name: string;
    userid: number;
    createdby: number;
    id: number;
    updatedby: number;
    createdny: number;
    products: number;
    cartDetailId: number;
    newQuantity: number;

}

export async function handler(req: NextRequest, res: NextResponse) {

    // view all the Brand information
    if (req.method === 'GET') {
        try {
            // Process a GET request
            const {userid} = await req.json() as UserRequest;
            // const { userid }: { userid: number } = req.body;
            const getCartInfo = `CALL GetUserCart(${userid}); `
            const [result] = await pool.execute(getCartInfo);
            console.log([result])
            // debugger;
            return NextResponse.json(
                [result],
                { status: 200 }
            )
        } catch (error) {
            return NextResponse.json(
                { error: 'Internal Server Error' },
                { status: 500 }
            )
            console.error(error);
        }
        // Add nother Brand
    } else if (req.method === 'POST') {
        const { userid, products } = await req.json() as UserRequest;
    
        if (!userid || !products || !Array.isArray(products) || products.length === 0) {
            return NextResponse.json(
                { error: 'UserId and Products are required' },
                { status: 400 }
            )
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
            return NextResponse.json(
                { message: 'Products added to cart successfully', cartDetailIds },
                { status: 200 }
            )
        } catch (error) {
            await connection.rollback();
            console.error('Error adding products to cart:', error);
            return NextResponse.json(
                { error: 'Internal Server Error' },
                { status: 500 }
            )
        } finally {
            connection.release();
        }
    }
    
    
     else if (req.method === 'PUT') {
        

    const { userid, cartDetailId, newQuantity } = await req.json() as UserRequest;

    if (!userid || !cartDetailId || !newQuantity) {
        return NextResponse.json(
            { error: 'UserId, CartDetailId, and NewQuantity are required' },
            { status: 400 }
        )
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
            return NextResponse.json(
                { message: 'Cart detail not found for the user' },
                { status: 404 }
            )
        }

        const productid = cartDetailRows[0].ProductMasterId;

        // Update product price and calculate new total price
        const [priceRows] = await connection.query(
            'SELECT price FROM productdetails WHERE ProductMasterId = ?',
            [productid]
        );

        if (priceRows.length === 0) {
            await connection.rollback();
            return NextResponse.json(
                { message: 'Product price not found' },
                { status: 404 }
            )
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
        return NextResponse.json(
            { message: 'Cart product updated successfully' },
            { status: 200 }
        )
    } catch (error) {
        await connection.rollback();
        console.error('Error updating cart product:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    } finally {
        connection.release();
        }
    }
    else if (req.method === 'DELETE') {
        try {
            const { userid, cartDetailId } =await req.json() as UserRequest;

            if (!userid || !cartDetailId) {
                return NextResponse.json(
                    { error: 'UserId and CartDetailId are required' },
                    { status: 400 }
                )
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
                    return NextResponse.json(
                        { message: 'Cart detail not found for the user' },
                        { status: 404 }
                    )
                }

                // Delete specific product from cart details
                await connection.query(
                    'DELETE FROM cartdetails WHERE id = ?',
                    [cartDetailId]
                );

                // Commit transaction
                await connection.commit();
                return NextResponse.json(
                    { message: 'Cart product deleted successfully' },
                    { status: 200 }
                )
            } catch (error) {
                await connection.rollback();
                console.error('Error deleting product from cart:', error);
                return NextResponse.json(
                    { error: 'Internal Server Error' },
                    { status: 500 }
                )
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Database connection error:', error);
            return NextResponse.json(
                { error: 'Internal Server Error' },
                { status: 500 }
            )
        }
    } else {
        return NextResponse.json(
            { error: 'Method Not Allowed' },
            { status: 405 }
        )
    }
}

