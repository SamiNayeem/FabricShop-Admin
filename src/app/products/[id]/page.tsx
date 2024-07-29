'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Body from './body';
import Menu from '@/components/menu-bar/menu-bar';
import Preloader from '@/components/preloader/preloader';

interface Product {
    name: string;
    price: string;
    availability: string;
    description: string;
    imageUrl: string[];
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

const Page = () => {
    const router = useRouter();
    const { id } = useParams();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            console.log('Fetching product with ID:', id); // Debugging line
            fetchProduct(id.toString())
                .then((data) => {
                    console.log('Product data:', data); // Debugging line
                    setProduct(data);
                })
                .catch((error) => {
                    console.error('Error fetching product:', error);
                    router.replace('/404');
                })
                .finally(() => setLoading(false));
        } else {
            console.error('ID is not defined or invalid'); // Debugging line
            router.replace('/404');
        }
    }, [id, router]);

    if (loading) return <div><Preloader/></div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="flex">
            <Menu />
            <Body product={product} />
        </div>
    );
};

export default Page;
