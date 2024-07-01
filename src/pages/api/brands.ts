import type { NextApiRequest, NextApiResponse } from 'next';
const pool = require('@/config/db')
const databaseConnection = require('@/config/dbconnect')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // view all the Brand information
    if (req.method === 'GET') {
        try {
            // Process a GET request
            const GetBrandInfo = "SELECT name, createdat, createdby, updatedat, updatedby FROM brands WHERE activestatus = 1";
            const [result] = await pool.execute(GetBrandInfo);
            console.log([result])
            // debugger;
            res.status(200).json([result]);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
        // Add nother Brand
    } else if (req.method === 'POST') {
        const InsertBrandInfo = `
            INSERT INTO brands (name, createdby, createdat)
            VALUES (?, ?, NOW())
        `;
        
        const { name, createdby } = req.body;

        try {
            const result = await pool.execute(InsertBrandInfo, [name, createdby]);
            res.status(200).json({ message: 'Brand added successfully', result });
            console.log("Inserted Successfully");
        } catch (error) {
            console.error('Error inserting Brand:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }

        // update Brand information
    } else if (req.method === 'PUT'){
        try {
            const updateQuery = `
                UPDATE brands
                SET name = ?, updatedby = ?, updatedat = NOW()
                WHERE id = ${req.body.id}
            `;
            const { name, updatedby} = req.body;
            const result = await pool.execute(updateQuery, [ name, updatedby]);

            res.status(200).json(result);

        }catch{
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }else if(req.method === 'DELETE'){

        try{
            const deleteBrand = `
            UPDATE brands
            SET activestatus = 0, deletedby = ?, deletedat = NOW()
            WHERE id = ${req.body.id}
        `
        const { deletedby } = req.body;
        const [result] = await pool.execute(deleteBrand, [deletedby]);

        res.status(200).json([result]);
        }catch{
            res.status(500).json({ error: 'Internal Server Error' });
        }
        
    }
}