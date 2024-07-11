import { NextRequest, NextResponse } from "next/server";
const pool = require('@/config/db')
const databaseConnection = require('@/config/dbconnect')

type UserRequest = {
    name: string;
    createdby: number;
    id: number;
    updatedby: number,
    deletedby: number
}

export async function handler(req: NextRequest, res: NextResponse) {

    // view all the Brand information
    if (req.method === 'GET') {
        try {
            // Process a GET request
            const GetBrandInfo = "SELECT name, createdat, createdby, updatedat, updatedby FROM brands WHERE activestatus = 1";
            const [result] = await pool.execute(GetBrandInfo);
            console.log([result])
            // debugger;
            
            return NextResponse.json([result], { status: 200 });
        } catch (error) {
            return NextResponse.json(
                { error: 'Internal Server Error' },
                { status: 500 }
            )
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
        
        const { name, createdby } = await req.json() as UserRequest;

        try {
            // Check for duplicate name in a case-insensitive manner
            const [rows] = await pool.execute(CheckDuplicateName, [name]);
            const count = rows[0].count;
            
            if (count > 0) {
                return NextResponse.json(
                    { error: 'Brand name already exists' },
                    { status: 400 }
                )
            }
            const result = await pool.execute(InsertBrandInfo, [name, createdby]);
            return NextResponse.json(
                { message: 'Brand added successfully', result },
                { status: 200 }
            )
            console.log("Inserted Successfully");
        } catch (error) {
            console.error('Error inserting Brand:', error);
            return NextResponse.json(
                { error: 'Internal Server Error' },
                { status: 500 }
            )
        }

        // update Brand information
    } else if (req.method === 'PUT'){
        const { id } = await req.json() as UserRequest;
        try {
            const updateQuery = `
                UPDATE brands
                SET name = ?, updatedby = ?, updatedat = NOW()
                WHERE id = ${id}
            `;

            const CheckDuplicateName = `
            SELECT COUNT(*) AS count FROM brands WHERE LOWER(name) = LOWER(?) AND activestatus = 1
        `;
        

            const { name, updatedby} = await req.json() as UserRequest;

            // Check for duplicate name in a case-insensitive manner
            const [rows] = await pool.execute(CheckDuplicateName, [name]);
            const count = rows[0].count;
            
            if (count > 0) {
                return NextResponse.json(
                    { error: 'Brand name already exists' },
                    { status: 400 }
                )
            }

            const result = await pool.execute(updateQuery, [ name, updatedby]);

            return NextResponse.json(
                result,
                { status: 200 }
            )

        }catch{
            return NextResponse.json(
                { error: 'Internal Server Error' },
                { status: 500 }
            )
        }
    }else if(req.method === 'DELETE'){
        const { id, deletedby } = await req.json() as UserRequest;
        try{
            const deleteBrand = `
            UPDATE brands
            SET activestatus = 0, deletedby = ?, deletedat = NOW()
            WHERE id = ${id}
        `
        

        const [result] = await pool.execute(deleteBrand, [deletedby]);

        return NextResponse.json(
            result,
            { status: 200 }
        )
        }catch{
            return NextResponse.json(
                { error: 'Internal Server Error' },
                { status: 500 }
            )
        }
        
    }
}