import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useAuth } from "../context/auth-context";

const Body = () => {
    const { authState } = useAuth();
    const [categories, setCategories] = useState<any[]>([]);
    const [newCategoryName, setNewCategoryName] = useState<string>("");
    const [editingCategory, setEditingCategory] = useState<number | null>(null);
    const [updatedCategoryName, setUpdatedCategoryName] = useState<string>("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                console.log('Fetched categories:', response.data);  // Log the fetched categories
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, [authState.user?.userid]);

    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(`/api/categories`, { data: { id, deletedby: authState.user?.userid } });
            if (response.status === 200) {
                setCategories(prevCategories => prevCategories.filter(category => category.id !== id));
                console.log('Category deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleInsert = async () => {
        try {
            const response = await axios.post(`/api/categories`, { name: newCategoryName, createdby: authState.user?.userid });
            if (response.status === 200) {
                const newCategory = { id: response.data.result.insertId, name: newCategoryName, activestatus: 1 };
                setCategories(prevCategories => [...prevCategories, newCategory]);
                console.log('Category added successfully');
                setNewCategoryName("");  // Clear the input field after successful insertion
            }
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleUpdate = async (id: number) => {
        try {
            const response = await axios.put(`/api/categories`, { id, name: updatedCategoryName, updatedby: authState.user?.userid });
            if (response.status === 200) {
                setCategories(prevCategories => prevCategories.map(category => category.id === id ? { ...category, name: updatedCategoryName } : category));
                console.log('Category updated successfully');
                setEditingCategory(null);  // Exit edit mode
                setUpdatedCategoryName("");  // Clear the input field after successful update
            }
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const startEditing = (id: number, currentName: string) => {
        setEditingCategory(id);
        setUpdatedCategoryName(currentName);
    };

    return (
        <div className="w-full">
            <div className="flex flex-col text-center w-full mb-12 mt-10">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Category List</h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Available categories in Database</p>
            </div>
            <div className="flex w-fit">
                <div className="p-2 w-1/4">
                    <div className="relative">
                        <label htmlFor="category" className="leading-7 text-sm text-gray-600">Insert New Category Name</label>
                        <input 
                            type="text" 
                            id="category" 
                            name="category" 
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                        />
                        <button 
                            className="mt-2 w-fit px-2 py-2 rounded-full bg-gray-800 text-white" 
                            onClick={handleInsert}
                        >
                            Add Category
                        </button>
                    </div>
                </div>
                <ul className="w-full bg-white shadow-md overflow-hidden sm:rounded-md max-w-sm mx-40 mt-16">
                    {categories.map((category) => (
                        <li key={category.id} className="border-t border-gray-200">
                            <div className="px-4 py-5 sm:px-6">
                                <div className="flex items-center justify-between">
                                    {editingCategory === category.id ? (
                                        <div>
                                            <input 
                                                type="text" 
                                                value={updatedCategoryName}
                                                onChange={(e) => setUpdatedCategoryName(e.target.value)}
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            />
                                            <button 
                                                className="mt-2 w-fit px-2 py-2 rounded-full bg-blue-500 text-white" 
                                                onClick={() => handleUpdate(category.id)}
                                            >
                                                Update
                                            </button>
                                            <button 
                                                className="float-right mt-2 w-fit px-2 py-2 rounded-full bg-red-500 text-white" 
                                                onClick={() => setEditingCategory(null)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">{category.name}</h3>
                                    )}
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-500">Status:
                                        <span className={category.activestatus === 1 ? 'text-green-600' : 'text-red-600'}>
                                            {category.activestatus === 1 ? 'Active' : 'Inactive'}
                                        </span>
                                    </p>
                                    <button className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => startEditing(category.id, category.name)}>
                                        <Image
                                            src={"/images/edit.png"}
                                            width={25}
                                            height={25}
                                            alt="edit icon"
                                        />
                                    </button>
                                    <button className="font-medium text-red-600 hover:text-red-500" onClick={() => handleDelete(category.id)}>
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
