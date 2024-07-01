import type { NextApiRequest, NextApiResponse } from 'next';
const pool = require('@/config/db')
const databaseConnection = require('@/config/dbconnect')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // view all the color information
    if (req.method === 'GET') {
        try {
            // Process a GET request
            const GetColorInfo = "SELECT name, createdat, createdby, updatedat, updatedby FROM colors WHERE activestatus = 1";
            const [result] = await pool.execute(GetColorInfo);
            console.log([result])
            // debugger;
            res.status(200).json([result]);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
        // Add nother color
    } else if (req.method === 'POST') {
        const InsertColorInfo = `
            INSERT INTO colors (name, createdby, createdat)
            VALUES (?, ?, NOW())
        `;
        
        const { name, createdby } = req.body;

        try {
            const result = await pool.execute(InsertColorInfo, [name, createdby]);
            res.status(200).json({ message: 'Color added successfully', result });
            console.log("Inserted Successfully");
        } catch (error) {
            console.error('Error inserting color:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }

        // update color information
    } else if (req.method === 'PUT'){
        try {
            const updateQuery = `
                UPDATE colors
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
            const deleteColor = `
            UPDATE colors
            SET activestatus = 0, deletedby = ?, deletedat = NOW()
            WHERE id = ${req.body.id}
        `
        const { deletedby } = req.body;
        const [result] = await pool.execute(deleteColor, [deletedby]);

        res.status(200).json([result]);
        }catch{
            res.status(500).json({ error: 'Internal Server Error' });
        }
        
    }
}