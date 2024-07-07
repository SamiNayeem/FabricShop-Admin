import type { NextApiRequest, NextApiResponse } from 'next';
const pool = require('@/config/db')
const databaseConnection = require('@/config/dbconnect')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // view all the Category information
    if (req.method === 'GET') {
        try {
            // Process a GET request
            const GetCategoryInfo = "SELECT name, createdat, createdby, updatedat, updatedby FROM categories WHERE activestatus = 1";
            const [result] = await pool.execute(GetCategoryInfo);
            console.log([result])
            // debugger;
            res.status(200).json([result]);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
        // Add nother Category
    } else if (req.method === 'POST') {
        const InsertCategoryInfo = `
            INSERT INTO categories (name, createdby, createdat)
            VALUES (?, ?, NOW())
        `;
        
        const CheckDuplicateName = `
            SELECT COUNT(*) AS count FROM categories WHERE LOWER(name) = LOWER(?) AND activestatus = 1
        `;
        
        const { name, createdby } = req.body;
    
        try {
            // Check for duplicate name in a case-insensitive manner
            const [rows] = await pool.execute(CheckDuplicateName, [name]);
            const count = rows[0].count;
            
            if (count > 0) {
                return res.status(400).json({ error: 'Category name already exists' });
            }
    
            // Insert new category
            const result = await pool.execute(InsertCategoryInfo, [name, createdby]);
            res.status(200).json({ message: 'Category added successfully', result });
            console.log("Inserted Successfully");
        } catch (error) {
            console.error('Error inserting Category:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
     else if (req.method === 'PUT'){
        try {
            const updateQuery = `
                UPDATE categories
                SET name = ?, updatedby = ?, updatedat = NOW()
                WHERE id = ${req.body.id}
            `;

            const CheckDuplicateName = `
            SELECT COUNT(*) AS count FROM categories WHERE LOWER(name) = LOWER(?) AND activestatus = 1
        `;

            const { name, updatedby} = req.body;

            // Check for duplicate name in a case-insensitive manner
            const [rows] = await pool.execute(CheckDuplicateName, [name]);
            const count = rows[0].count;
            
            if (count > 0) {
                return res.status(400).json({ error: 'Category name already exists' });
            }

            const result = await pool.execute(updateQuery, [ name, updatedby]);

            res.status(200).json(result);

        }catch{
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }else if(req.method === 'DELETE'){

        try{
            const deleteCategory = `
            UPDATE categories
            SET activestatus = 0, deletedby = ?, deletedat = NOW()
            WHERE id = ${req.body.id}
        `
        const { deletedby } = req.body;
        const [result] = await pool.execute(deleteCategory, [deletedby]);

        res.status(200).json([result]);
        }catch{
            res.status(500).json({ error: 'Internal Server Error' });
        }
        
    }
}

