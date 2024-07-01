import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
const pool = require('@/config/db')
const databaseConnection = require('@/config/dbconnect')


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        try {
            // Process a GET request
            const GetUserInfo = "SELECT * FROM users";
            const [result] = await pool.execute(GetUserInfo);
            console.log([result])
            // debugger;
            res.status(200).json([result]);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
        
    } else if (req.method === 'POST') {
        // Handle any other HTTP method
        const saltRounds = 5;
    
        try {
            const HashedPassword = await bcrypt.hash(req.body.userpassword, saltRounds);
    
            const CheckUsernameQuery = "SELECT username FROM users WHERE username = ?";
            const [ExistingUsernames] = await pool.execute(CheckUsernameQuery, [req.body.username]);
    
            if (ExistingUsernames.length > 0) {
                return res.status(400).json({ error: 'Username already exists' });
            }
    
            const InsertUserInfo = `
                INSERT INTO users (firstname, lastname, username, userpassword, address, email, userrole)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            const { firstname, lastname, username,userpassword, address, email } = req.body;
            const userrole = 'admin'; // Assuming userrole is fixed as 'admin' based on your previous code
    
            const result = await pool.execute(InsertUserInfo, [firstname, lastname, username, HashedPassword, address, email, userrole]);
            res.status(200).json({ message: 'User registered successfully', result });
            console.log("Inserted Successfully");
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }else if (req.method === 'PUT'){
        try {
            const updateQuery = `
                UPDATE users
                SET firstname = ?, lastname = ?, username = ?, address = ?, email = ?
                WHERE id = ${req.body.id}
            `;
            const { firstname, lastname, username, address, email} = req.body;
            const result = await pool.execute(updateQuery, [ firstname, lastname, username, address, email]);

            res.status(200).json(result);

        }catch{
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}