import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useAuth } from "../context/auth-context";

const Body = () => {
    const { authState } = useAuth();
    const [brands, setBrands] = useState<any[]>([]);
    const [newBrandName, setNewBrandName] = useState<string>("");
    const [editingBrand, setEditingBrand] = useState<number | null>(null);
    const [updatedBrandName, setUpdatedBrandName] = useState<string>("");

    useEffect(() => {
        console.log("User ID:", authState.user?.userid);

        const fetchBrands = async () => {
            try {
                const response = await axios.get('/api/brands');
                setBrands(response.data);
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        };

        fetchBrands();
    }, [authState.user?.userid]);

    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(`/api/brands`, { data: { id, deletedby: authState.user?.userid } });
            if (response.status === 200) {
                setBrands(prevBrands => prevBrands.filter(brand => brand.id !== id));
                console.log('Brand deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting brand:', error);
        }
    };

    const handleInsert = async () => {
        try {
            const response = await axios.post(`/api/brands`, { name: newBrandName, createdby: authState.user?.userid });
            if (response.status === 200) {
                setBrands(prevBrands => [...prevBrands, { id: response.data.result.insertId, name: newBrandName, activestatus: 1 }]);
                console.log('Brand added successfully');
                setNewBrandName("");  // Clear the input field after successful insertion
            }
        } catch (error) {
            console.error('Error adding brand:', error);
        }
    };

    const handleUpdate = async (id: number) => {
        try {
            const response = await axios.put(`/api/brands`, { id, name: updatedBrandName, updatedby: authState.user?.userid });
            if (response.status === 200) {
                setBrands(prevBrands => prevBrands.map(brand => brand.id === id ? { ...brand, name: updatedBrandName } : brand));
                console.log('Brand updated successfully');
                setEditingBrand(null);  // Exit edit mode
                setUpdatedBrandName("");  // Clear the input field after successful update
            }
        } catch (error) {
            console.error('Error updating brand:', error);
        }
    };

    const startEditing = (id: number, currentName: string) => {
        setEditingBrand(id);
        setUpdatedBrandName(currentName);
    };

    return (
        <div className="w-full ml-10">
            <div className="flex flex-col text-center w-full mb-10 mt-10">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Brand List</h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Available brands in Database</p>
            </div>
            <div className="flex w-fit">
                <div className="p-2 w-1/4">
                    <div className="relative">
                        <label htmlFor="brand" className="leading-7 text-sm text-gray-600">Insert New Brand Name</label>
                        <input 
                            type="text" 
                            id="brand" 
                            name="brand" 
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            value={newBrandName}
                            onChange={(e) => setNewBrandName(e.target.value)}
                        />
                        <button 
                            className="mt-2 w-fit px-2 py-2 rounded-full bg-gray-800 text-white" 
                            onClick={handleInsert}
                        >
                            Add Brand
                        </button>
                    </div>
                </div>
                <ul className="w-full bg-white shadow overflow-hidden sm:rounded-md max-w-sm mx-40 mt-5">
                    {brands.map((brand) => (
                        <li key={brand.id} className="border-t border-gray-200">
                            <div className="px-4 py-5 sm:px-6">
                                <div className="flex items-center justify-between">
                                    {editingBrand === brand.id ? (
                                        <div>
                                            <input 
                                                type="text" 
                                                value={updatedBrandName}
                                                onChange={(e) => setUpdatedBrandName(e.target.value)}
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            />
                                            <button 
                                                className="mt-2 w-fit px-2 py-2 rounded-full bg-blue-500 text-white" 
                                                onClick={() => handleUpdate(brand.id)}
                                            >
                                                Update
                                            </button>
                                            <button 
                                                className="float-right mt-2 w-fit px-2 py-2 rounded-full bg-red-500 text-white" 
                                                onClick={() => setEditingBrand(null)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">{brand.name}</h3>
                                    )}
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-500">Status:
                                        <span className={brand.activestatus === 1 ? 'text-green-600' : brand.activestatus === 0 ? 'text-red-600' : ''}>
                                            {brand.activestatus === 1 ? 'Active' : brand.activestatus === 0 ? 'Inactive' : ''}
                                        </span>
                                    </p>
                                    <button className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => startEditing(brand.id, brand.name)}>
                                        <Image
                                            src={"/images/edit.png"}
                                            width={25}
                                            height={25}
                                            alt="edit icon"
                                        />
                                    </button>
                                    <button className="font-medium text-red-600 hover:text-red-500" onClick={() => handleDelete(brand.id)}>
                                        <Image
                                            src={"/images/delete.png"}
                                            width={25}
                                            height={25}
                                            alt="delete icon"
                                        />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Body;
