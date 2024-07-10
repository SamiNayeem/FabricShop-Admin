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

        const CheckDuplicateName = `
            SELECT COUNT(*) AS count FROM colors WHERE LOWER(name) = LOWER(?)  AND activestatus = 1
        `;
        
        const { name, createdby } = req.body;

        try {
            // Check for duplicate name in a case-insensitive manner
            const [rows] = await pool.execute(CheckDuplicateName, [name]);
            const count = rows[0].count;
            
            if (count > 0) {
                return res.status(400).json({ error: 'Color name already exists' });
            }
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

            const CheckDuplicateName = `
            SELECT COUNT(*) AS count FROM colors WHERE LOWER(name) = LOWER(?) AND activestatus = 1
        `;

            const { name, updatedby} = req.body;

            const [rows] = await pool.execute(CheckDuplicateName, [name]);
            const count = rows[0].count;
            
            if (count > 0) {
                return res.status(400).json({ error: 'Color name already exists' });
            }

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