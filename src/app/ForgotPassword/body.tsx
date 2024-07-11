import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const router = useRouter();

    const handleOTPSend = (event: any) => {
        event.preventDefault();

        // Simulate OTP send
        setOtpSent(true);
        toast.success("OTP Sent. Check your email!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide
        });
    };

    const handleOTPSubmit = (event: any) => {
        event.preventDefault();

        // Simulate OTP verification
        setOtpVerified(true);
        toast.success("OTP Verified successfully!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide
        });
    };

    const handleLoginSubmit = (event: any) => {
        event.preventDefault();

        // Simulate login action
        toast.success("Password Reset Successfully!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide
        });
        // Perform other actions upon successful login
        router.push('/Login'); // Redirect to login page after successful reset
    };

    return (
        <form onSubmit={!otpSent ? handleOTPSend : !otpVerified ? handleOTPSubmit : handleLoginSubmit} className="mt-4">
            <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">User Name</label>
                <input
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    required
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Username"
                />
            </div>
            <div className="mt-8">
                <button
                    type="submit"
                    className="bg-gray-900 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                >
                    {!otpSent ? "Request OTP" : !otpVerified ? "Submit OTP" : "Login"}
                </button>
            </div>

            {/* Conditionally render OTP input after OTP is sent */}
            {otpSent && !otpVerified && (
                <div>
                    <div className="mt-4">
                        <div className="flex justify-between">
                            <label className="block text-gray-700 text-sm font-bold mb-2">OTP</label>
                        </div>
                        <input
                            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                            required
                            type="password"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter Your One Time Password"
                        />
                    </div>
                    <div className="mt-8">
                        <button
                            type="submit"
                            className="bg-gray-900 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}

            {/* Conditionally render new password input after OTP is verified */}
            {otpVerified && (
                <div className="mt-4">
                    <div className="flex justify-between">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Enter New Password</label>
                    </div>
                    <input
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Your New Password"
                    />
                    <div className="mt-8">
                        <button
                            type="submit"
                            className="bg-gray-900 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                        >
                            Reset Password
                        </button>
                        
                    </div>
                    
                </div>
            )}

        </form>
    );
};

export default function Body() {
    return (
        <div className="py-2">
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Slide}
            />
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                <div className="hidden lg:block lg:w-1/2 bg-cover"
                    style={{ backgroundImage: "url('https://images.pexels.com/photos/7620629/pexels-photo-7620629.jpeg?auto=compress&cs=tinysrgb&w=600')" }}>
                </div>
                <div className="w-full p-8 lg:w-1/2">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center">FabricShop</h2>
                    <p className="text-xl text-gray-600 text-center">Admin Portal</p>

                    <LoginForm />

                    {/* Additional UI elements */}
                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 lg:w-1/4"></span>
                        <a href="#" className="text-xs text-center text-gray-500 uppercase">Enter New Password</a>
                        <span className="border-b w-1/5 lg:w-1/4"></span>
                    </div>

                </div>
            </div>
        </div>
    );
}
