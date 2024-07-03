import type { NextApiRequest, NextApiResponse } from 'next';
const pool = require('@/config/db')
const databaseConnection = require('@/config/dbconnect')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // view all the paymentmethod information
    if (req.method === 'GET') {
        try {
            // Process a GET request
            const GetPaymentMethodInfo = "SELECT paymentmethod, createdat, createdby, updatedat, updatedby FROM paymentmethods WHERE activestatus = 1";
            const [result] = await pool.execute(GetPaymentMethodInfo);
            console.log([result])
            // debugger;
            res.status(200).json([result]);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
        // Add nother paymentmethod
    } else if (req.method === 'POST') {
        const InsertPaymentMethodInfo = `
            INSERT INTO paymentmethods (PaymentMethod, CreatedBy, CreatedAt)
            VALUES (?, ?, NOW())
        `;
        
        const { paymentmethod, createdby } = req.body;

        try {
            const result = await pool.execute(InsertPaymentMethodInfo, [paymentmethod, createdby]);
            res.status(200).json({ message: 'payment method added successfully', result });
            console.log("Inserted Successfully");
        } catch (error) {
            console.error('Error inserting paymentmethod:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }

        // update paymentmethod information
    } else if (req.method === 'PUT'){
        try {
            const updateQuery = `
                UPDATE paymentmethods
                SET paymentmethod = ?, updatedby = ?, updatedat = NOW()
                WHERE id = ${req.body.id}
            `;
            const { paymentmethod, updatedby} = req.body;
            const result = await pool.execute(updateQuery, [ paymentmethod, updatedby]);

            res.status(200).json(result);

        }catch{
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }else if(req.method === 'DELETE'){

        try{
            const deletepaymentmethod = `
            UPDATE paymentmethods
            SET activestatus = 0, deletedby = ?, deletedat = NOW()
            WHERE id = ${req.body.id}
        `
        const { deletedby } = req.body;
        const [result] = await pool.execute(deletepaymentmethod, [deletedby]);

        res.status(200).json([result]);
        }catch{
            res.status(500).json({ error: 'Internal Server Error' });
        }
        
    }
}