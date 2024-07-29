import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const Body = () => {
    const [colors, setColors] = useState<any[]>([]);
    const [newColorName, setNewColorName] = useState<string>("");
    const [newHexCode, setNewHexCode] = useState<string>("");
    const [editingColor, setEditingColor] = useState<number | null>(null);
    const [updatedColorName, setUpdatedColorName] = useState<string>("");
    const [updatedHexCode, setUpdatedHexCode] = useState<string>("");

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
            const response = await axios.post(`/api/colors`, { name: newColorName, hexcode: newHexCode, createdby: 12 });
            if (response.status === 200) {
                setColors(prevColors => [...prevColors, { id: response.data.result.insertId, name: newColorName, hexcode: newHexCode, activestatus: 1 }]);
                console.log('Color added successfully');
                setNewColorName("");  // Clear the input field after successful insertion
                setNewHexCode("");  // Clear the input field after successful insertion
            }
        } catch (error) {
            console.error('Error adding color:', error);
        }
    };

    const handleUpdate = async (id: number) => {
        try {
            const response = await axios.put(`/api/colors`, { id, name: updatedColorName, hexcode: updatedHexCode, updatedby: 12 });
            if (response.status === 200) {
                setColors(prevColors => prevColors.map(color => color.id === id ? { ...color, name: updatedColorName, hexcode: updatedHexCode } : color));
                console.log('Color updated successfully');
                setEditingColor(null);  // Exit edit mode
                setUpdatedColorName("");  // Clear the input field after successful update
                setUpdatedHexCode("");  // Clear the input field after successful update
            }
        } catch (error) {
            console.error('Error updating color:', error);
        }
    };

    const startEditing = (id: number, currentName: string, currentHexCode: string) => {
        setEditingColor(id);
        setUpdatedColorName(currentName);
        setUpdatedHexCode(currentHexCode);
    };

    return (
        <div className="w-full mb-20 ml-10">
            <div className="flex flex-col text-center w-full mb-12 mt-10">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Color List</h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Available colors in Database</p>
            </div>
            <div className="flex w-fit">
                <div className="p-2 w-1/4">
                    <div className="relative">
                        <label htmlFor="color" className="leading-7 text-sm text-gray-600">Insert New Color Name</label>
                        <input 
                            type="text" 
                            id="color" 
                            name="color" 
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            value={newColorName}
                            onChange={(e) => setNewColorName(e.target.value)} 
                            required
                        />
                        <label htmlFor="colorhex" className="leading-7 text-sm text-gray-600">Insert Hex Code</label>
                        <input 
                            type="text" 
                            id="colorhex" 
                            name="colorhex" 
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            value={newHexCode}
                            onChange={(e) => setNewHexCode(e.target.value)}
                            required
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
                                            <input 
                                                type="text" 
                                                value={updatedHexCode}
                                                onChange={(e) => setUpdatedHexCode(e.target.value)}
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mt-1"
                                            />
                                            <button 
                                                className="mt-2 w-fit px-2 py-2 rounded-full bg-blue-500 text-white" 
                                                onClick={() => handleUpdate(color.id)}
                                            >
                                                Update
                                            </button>
                                            <button 
                                                className="float-right mt-2 w-fit px-2 py-2 rounded-full bg-red-500 text-white" 
                                                onClick={() => setEditingColor(null)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">{color.name}</h3>
                                            <svg width="30px" height="40px" viewBox="0 -2 24 24" id="meteor-icon-kit__solid-tshirt" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M5.00009 9.3873L3.31634 9.9485C2.7924 10.1232 2.22609 9.84 2.05144 9.3161L0.0514698 3.31616C-0.105899 2.84405 0.107827 2.32807 0.552933 2.10552L4.55288 0.10555C4.69174 0.03612 4.84485 -0.00003 5.00009 -0.00003H8.00005C8.31481 -0.00003 8.61119 0.14817 8.80004 0.39997C9.61118 1.48148 10.6481 1.99995 12 1.99995C13.3519 1.99995 14.3888 1.48148 15.2 0.39997C15.3888 0.14817 15.6852 -0.00003 16 -0.00003H18.9999C19.1552 -0.00003 19.3083 0.03612 19.4471 0.10555L23.4471 2.10552C23.8922 2.32807 24.1059 2.84405 23.9485 3.31616L21.9486 9.3161C21.7739 9.84 21.2076 10.1232 20.6837 9.9485L18.9999 9.3873V18.9997C18.9999 19.552 18.5522 19.9997 17.9999 19.9997H6.00008C5.4478 19.9997 5.00009 19.552 5.00009 18.9997V9.3873z" fill={color.hexcode}/>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-500">Status:
                                        <span className={color.activestatus === 1 ? 'text-green-600' : color.activestatus === 0 ? 'text-red-600' : ''}>
                                            {color.activestatus === 1 ? 'Active' : color.activestatus === 0 ? 'Inactive' : ''}
                                        </span>
                                    </p>
                                    <button className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => startEditing(color.id, color.name, color.hexcode)}>
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
