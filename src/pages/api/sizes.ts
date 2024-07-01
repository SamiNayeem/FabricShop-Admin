import type { NextApiRequest, NextApiResponse } from 'next';
const pool = require('@/config/db')
const databaseConnection = require('@/config/dbconnect')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // view all the size information
    if (req.method === 'GET') {
        try {
            // Process a GET request
            const GetSizeInfo = "SELECT name, chest, waist, createdat, createdby, updatedat, updatedby FROM sizes WHERE activitystatus = 1";
            const [result] = await pool.execute(GetSizeInfo);
            console.log([result])
            // debugger;
            res.status(200).json([result]);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
        // Add nother size
    } else if (req.method === 'POST') {
        const InsertSizeInfo = `
            INSERT INTO sizes (name, chest, waist, createdby, createdat)
            VALUES (?, ?, ?, ?, NOW())
        `;
        
        const { name, chest, waist, createdby } = req.body;

        try {
            const result = await pool.execute(InsertSizeInfo, [name, chest, waist, createdby]);
            res.status(200).json({ message: 'Size added successfully', result });
            console.log("Inserted Successfully");
        } catch (error) {
            console.error('Error inserting Size:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }

        // update size information
    } else if (req.method === 'PUT') {
        try {
            const updateQuery = `
                UPDATE sizes
                SET name = ?, chest = ?, waist = ?, updatedby = ?, updatedat = NOW()
                WHERE id = ?
            `;
            const { id, name, chest, waist, updatedby } = req.body;

            const result = await pool.execute(updateQuery, [name, chest, waist, updatedby, id]);

            res.status(200).json({ message: 'Size updated successfully', result });
        } catch (error) {
            console.error('Error updating size:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    
    }else if(req.method === 'DELETE'){

        try{
            const deleteSize = `
            UPDATE sizes
            SET activitystatus = 0, deletedby = ?, deletedat = NOW()
            WHERE id = ${req.body.id}
        `
        const { deletedby } = req.body;
        const [result] = await pool.execute(deleteSize, [deletedby]);

        res.status(200).json([result]);
        }catch{
            res.status(500).json({ error: 'Internal Server Error' });
        }
        
    }
}