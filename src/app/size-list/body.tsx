import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const Body = () => {
    const [sizes, setSizes] = useState<any[]>([]);
    const [newSizeName, setNewSizeName] = useState<string>("");
    const [newChestSize, setNewChestSize] = useState<number>(0);
    const [newWaistSize, setNewWaistSize] = useState<number>(0);
    const [editingSize, setEditingSize] = useState<number | null>(null);
    const [updatedSizeName, setUpdatedSizeName] = useState<string>("");
    const [updatedChestSize, setUpdatedChestSize] = useState<number>(0);
    const [updatedWaistSize, setUpdatedWaistSize] = useState<number>(0);

    useEffect(() => {
        const fetchSizes = async () => {
            try {
                const response = await axios.get('/api/sizes');
                console.log('Fetched sizes:', response.data);  // Log the fetched sizes
                setSizes(response.data);
            } catch (error) {
                console.error('Error fetching sizes:', error);
            }
        };

        fetchSizes();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(`/api/sizes`, { data: { id, deletedby: 12 } });
            console.log('Delete response:', response);  // Log the delete response
            if (response.status === 200) {
                setSizes(prevSizes => prevSizes.filter(size => size.id !== id));
                console.log('Size deleted successfully');
            } else {
                console.error('Error deleting size:', response);
            }
        } catch (error) {
            console.error('Error deleting size:', error);
        }
    };

    const handleInsert = async () => {
        try {
            const response = await axios.post(`/api/sizes`, {
                name: newSizeName,
                chest: newChestSize,
                waist: newWaistSize,
                createdby: 12,
            });
            console.log('Insert response:', response);  // Log the insert response
            if (response.status === 200) {
                const insertId = response.data.result.insertId;
                setSizes(prevSizes => [
                    ...prevSizes,
                    { id: insertId, name: newSizeName, chest: newChestSize, waist: newWaistSize, activitystatus: 1 },
                ]);
                console.log('Size added successfully');
                setNewSizeName("");
                setNewChestSize(0);
                setNewWaistSize(0);
            } else {
                console.error('Error adding size:', response);
            }
        } catch (error) {
            console.error('Error adding size:', error);
        }
    };

    const handleUpdate = async (id: number) => {
        try {
            const response = await axios.put(`/api/sizes`, {
                id,
                name: updatedSizeName,
                chest: updatedChestSize,
                waist: updatedWaistSize,
                updatedby: 12,
            });
            console.log('Update response:', response);  // Log the update response
            if (response.status === 200) {
                setSizes(prevSizes => prevSizes.map(size =>
                    size.id === id ? { ...size, name: updatedSizeName, chest: updatedChestSize, waist: updatedWaistSize } : size
                ));
                console.log('Size updated successfully');
                setEditingSize(null);
                setUpdatedSizeName("");
                setUpdatedChestSize(0);
                setUpdatedWaistSize(0);
            } else {
                console.error('Error updating size:', response);
            }
        } catch (error) {
            console.error('Error updating size:', error);
        }
    };

    const startEditing = (id: number, currentName: string, currentChestSize: number, currentWaistSize: number) => {
        setEditingSize(id);
        setUpdatedSizeName(currentName);
        setUpdatedChestSize(currentChestSize);
        setUpdatedWaistSize(currentWaistSize);
    };

    return (
        <div className="w-full">
            <div className="flex flex-col text-center w-full mb-12 mt-10">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Size List</h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Available sizes in Database</p>
            </div>
            <div className="flex w-fit">
                <div className="p-2 w-1/4">
                    <div className="relative">
                        <label htmlFor="size" className="leading-7 text-sm text-gray-600">Insert New Size Name</label>
                        <input 
                            type="text" 
                            id="size" 
                            name="size" 
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            value={newSizeName}
                            onChange={(e) => setNewSizeName(e.target.value)} 
                            required
                        />
                        <label htmlFor="chest" className="leading-7 text-sm text-gray-600">Insert Chest Size</label>
                        <input 
                            type="number" 
                            id="chest" 
                            name="chest" 
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            value={newChestSize}
                            onChange={(e) => setNewChestSize(Number(e.target.value))}
                            required
                        />
                        <label htmlFor="waist" className="leading-7 text-sm text-gray-600">Insert Waist Size</label>
                        <input 
                            type="number" 
                            id="waist" 
                            name="waist" 
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            value={newWaistSize}
                            onChange={(e) => setNewWaistSize(Number(e.target.value))}
                            required
                        />
                        <button 
                            className="mt-2 w-fit px-2 py-2 rounded-full bg-gray-800 text-white" 
                            onClick={handleInsert}
                        >
                            Add Size
                        </button>
                    </div>
                </div>
                <ul className="w-full bg-white shadow overflow-hidden sm:rounded-md max-w-sm mx-40 mt-16">
                    {sizes.map((size) => (
                        <li key={size.id} className="border-t border-gray-200">
                            <div className="px-4 py-5 sm:px-6">
                                <div className="flex items-center justify-between">
                                    {editingSize === size.id ? (
                                        <div>
                                            <input 
                                                type="text" 
                                                value={updatedSizeName}
                                                onChange={(e) => setUpdatedSizeName(e.target.value)}
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            />
                                            <input 
                                                type="number" 
                                                value={updatedChestSize}
                                                onChange={(e) => setUpdatedChestSize(Number(e.target.value))}
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mt-1"
                                            />
                                            <input 
                                                type="number" 
                                                value={updatedWaistSize}
                                                onChange={(e) => setUpdatedWaistSize(Number(e.target.value))}
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mt-1"
                                            />
                                            <button 
                                                className="mt-2 w-fit px-2 py-2 rounded-full bg-blue-500 text-white" 
                                                onClick={() => handleUpdate(size.id)}
                                            >
                                                Update
                                            </button>
                                            <button 
                                                className="float-right mt-2 w-fit px-2 py-2 rounded-full bg-red-500 text-white" 
                                                onClick={() => setEditingSize(null)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">{size.name}</h3>
                                            <p>Chest Size: {size.chest}</p>
                                            <p>Waist Size: {size.waist}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-500">Status:
                                        <span className={size.activitystatus === 1 ? 'text-green-600' : 'text-red-600'}>
                                            {size.activitystatus === 1 ? 'Active' : 'Inactive'}
                                        </span>
                                    </p>
                                    <button className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => startEditing(size.id, size.name, size.chest, size.waist)}>
                                        <Image
                                            src="/images/edit.png"
                                            width={25}
                                            height={25}
                                            alt="edit icon"
                                        />
                                    </button>
                                    <button className="font-medium text-red-600 hover:text-red-500" onClick={() => handleDelete(size.id)}>
                                        <Image
                                            src="/images/delete.png"
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
