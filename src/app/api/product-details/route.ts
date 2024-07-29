import { NextRequest, NextResponse } from 'next/server';
const pool = require('@/config/db');

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: 'Product ID is required' }, { status: 400 });
    }

    try {
        const [rows] = await pool.query(`
            SELECT pm.id AS ProductMasterId, pm.name, pm.description, pd.price, b.name AS brandname, 
                   i.url AS imageurl, pi.quantity
            FROM productmaster pm
            JOIN productdetails pd ON pm.id = pd.productmasterid
            JOIN brands b ON pd.brandid = b.id
            LEFT JOIN images i ON pm.id = i.productmasterid
            LEFT JOIN productinventory pi ON pd.id = pi.productdetailsid
            WHERE pm.activestatus = 1 AND pm.id = ?
        `, [id]);

        if (rows.length === 0) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }

        // Process images
        const product = rows.reduce((acc: any, row: any) => {
            if (!acc.id) {
                acc = {
                    ProductMasterId: row.ProductMasterId,
                    Name: row.name,
                    Description: row.description,
                    Price: row.price,
                    BrandName: row.brandname,
                    Quantity: row.quantity,
                    ImageUrls: []
                };
            }
            if (row.imageurl) {
                acc.ImageUrls.push(row.imageurl);
            }
            return acc;
        }, {});

        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error('Error fetching product data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
