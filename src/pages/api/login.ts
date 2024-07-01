import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const pool = require('@/config/db')
require('dotenv').config(); // Load environment variables from .env file

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!JWT_SECRET) {
        return res.status(500).json({ error: 'JWT_SECRET is not defined' });
    }

    if (req.method === 'POST') {
        const { username, userpassword } = req.body;

        try {
            // Check if the user exists
            const checkUserQuery = `
                SELECT id, userpassword FROM users 
                WHERE username = "${req.body.username}"
            `;
            const [rows] = await pool.execute(checkUserQuery, [username]);

            if (rows.length === 0) {
                // User not found
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            const user = rows[0];

            // Compare the provided password with the hashed password
            const isPasswordValid = await bcrypt.compare(userpassword, user.userpassword);

            if (!isPasswordValid) {
                // Invalid password
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            // Generate a JWT token
            const token = jwt.sign({ userId: user.id }, JWT_SECRET as string, { expiresIn: '1h' });

            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
