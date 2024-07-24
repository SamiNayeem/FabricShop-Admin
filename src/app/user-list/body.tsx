import React, { useEffect, useState } from "react";
import axios from "axios";

const Body = () => {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="">
            <div className="flex flex-wrap -mx-3 mb-5">
                <div className="w-full max-w-full px-3 mb-6 mx-auto">
                    <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
                        <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                            {/* <!-- card header --> */}
                            <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                                    <span className="mr-3 font-bold text-dark">User Informations</span>
                                </h3>
                            </div>
                            {/* <!-- end card header -->
                            <!-- card body  --> */}
                            <div className="flex-auto block py-8 pt-6 px-9">
                                <div className="overflow-x-auto">
                                    <table className="w-full my-0 align-middle text-dark border-neutral-200">
                                        <thead className="align-bottom">
                                            <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                                                <th className="pb-3 text-start min-w-[175px]">FIRST NAME</th>
                                                <th className="pb-3 text-start min-w-[175px]">LAST NAME</th>
                                                <th className="pb-3 text-start min-w-[175px]">USERNAME</th>
                                                <th className="pb-3 text-start min-w-[100px]">ROLE</th>
                                                <th className="pb-3 text-start min-w-[175px]">STATUS</th>
                                                <th className="pb-3 text-start min-w-[100px]">EMAIL</th>
                                                <th className="pb-3 text-start min-w-[100px]">DATE OF JOINING</th>
                                                <th className="pb-3 text-start min-w-[50px]"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user) => (
                                                <tr key={user.id} className="border-b border-dashed last:border-b-0">
                                                    <td className="p-3 pl-0 text-start">
                                                        <div className="flex items-center">
                                                            <div className="flex flex-col justify-start">
                                                                <span className="text-center align-baseline inline-flex px-4 py-3 font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg italic">
                                                                    {user.firstname}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-3 pl-0 text-start">
                                                        <div className="flex items-center">
                                                            <div className="flex flex-col justify-start">
                                                                <span className="text-center align-baseline inline-flex px-4 py-3 font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg italic">
                                                                    {user.lastname}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-3 pl-0 text-start">
                                                        <div className="flex items-center">
                                                            <div className="flex flex-col justify-start">
                                                                <span className="text-center align-baseline inline-flex px-4 py-3 font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg italic">
                                                                    {user.username}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-3 text-start">
                                                        <span className="font-semibold text-light-inverse text-md/normal italic">{user.userrole}</span>
                                                    </td>
                                                    <td className="p-3 text-start">
                                                        <span className={`italic text-center align-baseline inline-flex px-2 py-1 font-semibold text-base/none ${user.status === 1 ? 'text-success bg-success-light text-green-600' : 'text-danger bg-danger-light text-red-500'} rounded-lg`}>
                                                            {user.status === 1 ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </td>
                                                    <td className=" text-start">
                                                        <span className="text-start align-baseline inline-flex  py-3 font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg italic">
                                                            {user.email}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 text-end">
                                                        <span className="italic font-semibold text-light-inverse text-md/normal text-end">{new Date(user.createdat).toLocaleDateString()}</span>
                                                    </td>
                                                    
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Body;
