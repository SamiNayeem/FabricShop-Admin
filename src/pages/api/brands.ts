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

        const CheckDuplicateName = `
            SELECT COUNT(*) AS count FROM brands WHERE LOWER(name) = LOWER(?) AND activestatus = 1
        `;
        
        const { name, createdby } = req.body;

        try {
            // Check for duplicate name in a case-insensitive manner
            const [rows] = await pool.execute(CheckDuplicateName, [name]);
            const count = rows[0].count;
            
            if (count > 0) {
                return res.status(400).json({ error: 'Brand name already exists' });
            }
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

            const CheckDuplicateName = `
            SELECT COUNT(*) AS count FROM brands WHERE LOWER(name) = LOWER(?) AND activestatus = 1
        `;
        

            const { name, updatedby} = req.body;

            // Check for duplicate name in a case-insensitive manner
            const [rows] = await pool.execute(CheckDuplicateName, [name]);
            const count = rows[0].count;
            
            if (count > 0) {
                return res.status(400).json({ error: 'Brand name already exists' });
            }

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