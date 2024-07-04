import { error } from 'console';
import type { NextApiRequest, NextApiResponse } from 'next';
const pool = require('@/config/db')
const databaseConnection = require('@/config/dbconnect')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // view all the orderstatus information
    if (req.method === 'GET') {
        try {
            // Process a GET request
            const GetOrderStatusInfo = "SELECT orderstatus, createdat, createdby, updatedat, updatedby FROM orderstatus WHERE activestatus = 1";
            const [result] = await pool.execute(GetOrderStatusInfo);
            console.log([result])
            // debugger;
            res.status(200).json([result]);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
        // Add another orderstatus
    } else if (req.method === 'POST') {
        const InsertorderstatusInfo = `
            INSERT INTO orderstatus (status, createdby, createdat)
            VALUES (?, ?, NOW())
        `;
        
        const { status, createdby } = req.body;

        try {
            const result = await pool.execute(InsertorderstatusInfo, [status, createdby]);
            res.status(200).json({ message: 'orderstatus added successfully', result });
            console.log("Inserted Successfully");
        } catch (error) {
            console.error('Error inserting orderstatus:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }

        // update orderstatus information
    } else if (req.method === 'PUT'){
        try {
            const updateQuery = `
                UPDATE orderstatus
                SET shippingmethod = ?, updatedby = ?, updatedat = NOW()
                WHERE id = ${req.body.id}
            `;
            const { shippingmethod, updatedby} = req.body;
            const result = await pool.execute(updateQuery, [ shippingmethod, updatedby]);

            res.status(200).json(result);

        }catch{
            res.status(500).json({ error: 'Internal Server Error' });
            console.error(error)
        }
    }else if(req.method === 'DELETE'){

        try{
            const deleteorderstatus = `
            UPDATE orderstatus
            SET activestatus = 0
            WHERE id = ${req.body.id}
        `
        const { deletedby } = req.body;
        const [result] = await pool.execute(deleteorderstatus, [deletedby]);

        res.status(200).json([result]);
        }catch{
            res.status(500).json({ error: 'Internal Server Error' });
            console.error(error)
        }
        
    }
}