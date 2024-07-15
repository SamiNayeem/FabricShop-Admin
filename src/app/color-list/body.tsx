import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const Body = () => {
    const [colors, setColors] = useState<any[]>([]);
    const [newColorName, setNewColorName] = useState<string>("");
    const [editingColor, setEditingColor] = useState<number | null>(null);
    const [updatedColorName, setUpdatedColorName] = useState<string>("");

    useEffect(() => {
        const fetchColors = async () => {
            try {
                const response = await axios.get('/api/colors');
                setColors(response.data);
            } catch (error) {
                console.error('Error fetching colors:', error);
            }
        };

        fetchColors();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(`/api/colors`, { data: { id, deletedby: 12 } });
            if (response.status === 200) {
                setColors(prevColors => prevColors.filter(color => color.id !== id));
                console.log('Color deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting color:', error);
        }
    };

    const handleInsert = async () => {
        try {
            const response = await axios.post(`/api/colors`, { name: newColorName, createdby: 12 });
            if (response.status === 200) {
                setColors(prevColors => [...prevColors, { id: response.data.result.insertId, name: newColorName, activestatus: 1 }]);
                console.log('Color added successfully');
                setNewColorName("");  // Clear the input field after successful insertion
            }
        } catch (error) {
            console.error('Error adding color:', error);
        }
    };

    const handleUpdate = async (id: number) => {
        try {
            const response = await axios.put(`/api/colors`, { id, name: updatedColorName, updatedby: 12 });
            if (response.status === 200) {
                setColors(prevColors => prevColors.map(color => color.id === id ? { ...color, name: updatedColorName } : colors));
                console.log('Color updated successfully');
                setEditingColor(null);  // Exit edit mode
                setUpdatedColorName("");  // Clear the input field after successful update
            }
        } catch (error) {
            console.error('Error updating color:', error);
        }
    };

    const startEditing = (id: number, currentName: string) => {
        setEditingColor(id);
        setUpdatedColorName(currentName);
    };

    return (
        <div className="w-full">
            <div className="flex flex-col text-center w-full mb-12 mt-10">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Color List</h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Available colors in Database</p>
            </div>
            <div className="flex w-fit">
                <div className="p-2 w-1/4">
                    <div className="relative">
                        <label htmlFor="color" className="leading-7 text-sm text-gray-600">Insert New color Name</label>
                        <input 
                            type="text" 
                            id="color" 
                            name="color" 
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            value={newColorName}
                            onChange={(e) => setNewColorName(e.target.value)}
                        />
                        <button 
                            className="mt-2 w-fit px-2 py-2 rounded-full bg-gray-800 text-white" 
                            onClick={handleInsert}
                        >
                            Add Color
                        </button>
                    </div>
                </div>
                <ul className="w-full bg-white shadow overflow-hidden sm:rounded-md max-w-sm mx-40 mt-16">
                    {colors.map((color) => (
                        <li key={color.id} className="border-t border-gray-200">
                            <div className="px-4 py-5 sm:px-6">
                                <div className="flex items-center justify-between">
                                    {editingColor === color.id ? (
                                        <div>
                                            <input 
                                                type="text" 
                                                value={updatedColorName}
                                                onChange={(e) => setUpdatedColorName(e.target.value)}
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            />
                                            <button 
                                                className="mt-2 w-fit px-2 py-2 rounded-full bg-gray-800 text-white" 
                                                onClick={() => handleUpdate(color.id)}
                                            >
                                                Update
                                            </button>
                                            <button 
                                                className="mt-2 w-fit px-2 py-2 rounded-full bg-gray-800 text-white" 
                                                onClick={() => setEditingColor(null)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">{color.name}</h3>
                                    )}
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-500">Status:
                                        <span className={color.activestatus === 1 ? 'text-green-600' : color.activestatus === 0 ? 'text-red-600' : ''}>
                                            {color.activestatus === 1 ? 'Active' : color.activestatus === 0 ? 'Inactive' : ''}
                                        </span>
                                    </p>
                                    <button className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => startEditing(color.id, color.name)}>
                                        <Image
                                            src={"/images/edit.png"}
                                            width={25}
                                            height={25}
                                            alt="edit icon"
                                        />
                                    </button>
                                    <button className="font-medium text-red-600 hover:text-red-500" onClick={() => handleDelete(color.id)}>
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
