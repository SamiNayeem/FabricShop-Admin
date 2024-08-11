'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Body from './body';
import Menu from '@/components/menu-bar/menu-bar';
import Preloader from '@/components/preloader/preloader';

interface Product {
    productmasterid: number;
    name: string;
    brandName: string;
    price: string;
    availability: string;
    description: string;
    imageUrls: string[];
    quantity: number;
    colorName: string;
    hexcode: string;
    sizeName: string;
}

const fetchProduct = async (id: string): Promise<Product> => {
    try {
        const response = await fetch(`/api/product-details?id=${id}`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error('Failed to fetch product:', error);
        throw error;
    }
};

const Page = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            fetchProduct(id)
                .then((data) => {
                    setProduct(data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error.message);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return <div><Preloader /></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>No product found.</div>;
    }

    return (
        <div className='flex w-full'>
            <Menu />
            <Body product={product} />
        </div>
    );
};

export default Page;
