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
            SELECT 
                pm.id AS ProductMasterId, 
                pm.name, 
                pm.description, 
                pd.price, 
                c.name AS colorName, 
                c.hexcode AS hexcode,
                b.name AS brandName, 
                i.url AS imageUrl, 
                s.name AS sizeName,
                pi.quantity 
            FROM productmaster pm
            JOIN productdetails pd ON pm.id = pd.productmasterid
            JOIN brands b ON pd.brandid = b.id
            JOIN colors c ON pd.colorid = c.id
            JOIN sizes s ON pd.sizeid = s.id
            LEFT JOIN images i ON pm.id = i.productmasterid
            LEFT JOIN productinventory pi ON pd.id = pi.productdetailsid
            WHERE pm.activestatus = 1 AND pm.id = ?
        `, [id]);

        if (rows.length === 0) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }

        const product: {
            ProductMasterId: number | null;
            name: string;
            description: string;
            price: number | null;
            brandName: string;
            quantity: number | null;
            colorName: string[];
            imageUrls: string[];
            sizeName: string[];
            hexcode: string[]
        } = {
            ProductMasterId: null,
            name: '',
            description: '',
            price: null,
            brandName: '',
            quantity: null,
            colorName: [],
            imageUrls: [],
            sizeName: [],
            hexcode: []
        };

        rows.forEach((row: any) => {
            product.ProductMasterId = row.ProductMasterId;
            product.name = row.name;
            product.description = row.description;
            product.price = row.price;
            product.brandName = row.brandName;
            product.quantity = row.quantity;
            product.colorName = row.colorName;
            product.hexcode = row.hexcode;
            product.sizeName = row.sizeName;
            if (row.imageUrl) {
                product.imageUrls.push(row.imageUrl);
            }
        });

        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error('Error fetching product data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
