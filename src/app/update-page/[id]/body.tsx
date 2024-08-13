import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/app/context/auth-context';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Correctly import the CSS file

interface Product {
    productmasterid: number;
    name: string;
    code: string; // Add the code field here
    brandName: string;
    price: string;
    description: string;
    quantity: number;
    colorName: string;
    hexcode: string;
    sizeName: string;
    imageUrls: string[];
}

interface DropdownOption {
    id: number;
    name: string;
}

const Body: React.FC = () => {
    const { user } = useAuth().authState;
    const router = useRouter();
    const params = useParams();
    const id = params.id; // Get the product ID from the URL

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Product>>({});
    const [brands, setBrands] = useState<DropdownOption[]>([]);
    const [colors, setColors] = useState<DropdownOption[]>([]);
    const [sizes, setSizes] = useState<DropdownOption[]>([]);

    useEffect(() => {
        // Fetch the product details
        if (id) {
            axios.get(`/api/product-details?id=${id}`)
                .then((response) => {
                    setProduct(response.data);
                    setFormData(response.data); // Initialize form with product data, including the code
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error.message);
                    setLoading(false);
                });
        } else {
            setError('Product ID is missing');
            setLoading(false);
        }

        // Fetch brands, colors, and sizes for the dropdowns
        const fetchDropdownOptions = async () => {
            try {
                const [brandRes, colorRes, sizeRes] = await Promise.all([
                    axios.get('/api/brands'),
                    axios.get('/api/colors'),
                    axios.get('/api/sizes'),
                ]);
                setBrands(brandRes.data);
                setColors(colorRes.data);
                setSizes(sizeRes.data);
            } catch (error) {
                console.error('Error fetching dropdown options:', error);
            }
        };

        fetchDropdownOptions();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            const response = await axios.put(`/api/product-details/${id}`, {
                name: formData.name,
                code: formData.code, // Include the code in the PUT request
                brandName: formData.brandName,
                price: formData.price,
                description: formData.description,
                quantity: formData.quantity,
                colorName: formData.colorName,
                hexcode: formData.hexcode,
                sizeName: formData.sizeName,
                updatedby: user?.userid,
            });
    
            if (response.status === 200) {
                toast.success('Product updated successfully!');
                router.push(`/products/${id}`);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Failed to update product. Please try again.');
            console.error('Error updating product:', error);
        }
    };
    
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <ToastContainer />
            <h1 className="text-3xl font-bold mb-4">Modify Product Details</h1>
            <form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded-lg p-8">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Product Code</label>
                    <input
                        type="text"
                        name="code" // Correct name attribute for Product Code
                        value={formData.code || ''} // Bind value to formData.code
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Brand Name</label>
                    <select
                        name="brandName"
                        value={formData.brandName || ''}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select Brand</option>
                        {brands.map((brand) => (
                            <option key={brand.id} value={brand.name}>
                                {brand.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Price (BDT)</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price || ''}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity || ''}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Color</label>
                    <select
                        name="colorName"
                        value={formData.colorName || ''}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select Color</option>
                        {colors.map((color) => (
                            <option key={color.id} value={color.name}>
                                {color.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Size</label>
                    <select
                        name="sizeName"
                        value={formData.sizeName || ''}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select Size</option>
                        {sizes.map((size) => (
                            <option key={size.id} value={size.name}>
                                {size.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description || ''}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push(`/products/${id}`)}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Body;
