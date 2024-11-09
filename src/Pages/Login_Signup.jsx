import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/ContextProvider";


const serverUrl = 'https://taskmanager-server-production.up.railway.app'

export default function LoginSignup() {
    const [isSignup, setIsSignup] = useState(false);
    const [message, setMessage] = useState("");
    const { name, setName, email, setEmail, password, setPassword } =
        useContext(Context);
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsSignup(!isSignup);
        setName("");
        setEmail("");
        setPassword("");
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleLogSign();
    };

    const handleLogSign = async () => {
        if (isSignup) {
            try {
                const response = await axios.post(
                    serverUrl+"/api/user/signup",
                    { name, email, password  }
                );
                setMessage(response.data.message);
                
                localStorage.setItem("token", response.data.token);
                setIsSignup(false);
                navigate("/");
            } catch (error) {
                setMessage(
                    error.response?.data?.message || "Signup failed. Please try again."
                );
            }
        } else {
            try {
                const response = await axios.post(
                    serverUrl+"/api/user/login",
                    { email, password }
                );
                console.log(response.data);
                setMessage(response.data.message);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem('uid', response.data.user.id)
               window.location.href = '/'                
            } catch (error) {
                console.log(error);
                setMessage(error.response?.data || "Login failed. Please try again.");
            }
        }
    };

    return ( 
            <div className="relative m-auto h-screen flex items-center justify-center text-gray-500 ">
                <div className="m-auto w-[480px] ">
                    <div className="rounded-xl bg-white ">
                        <div className="p-16">
                            <div className="space-y-2 text-left mb-4">
                                <img src="https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-notes-icon-png-image_4256335.jpg" alt="logo" className=" mb-4 h-16 w-auto" />
                                <h2 className="font-bold text-2xl">RR-CODER</h2>
                                <h2 className="mb-8 text-2xl text-customGray font-bold">
                                    {isSignup ? "Create your account" : "Log in to your account"}
                                </h2>
                            </div>


                            <div className="mt-8 hidden">
                                <button className="group h-12 w-full px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-red-400 focus:bg-red-50 active:bg-red-100">
                                    <div className="relative flex items-center space-x-4 justify-center">
                                        <img
                                            src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                                            className="absolute left-0 w-5"
                                            alt="Google logo"
                                        />
                                        <span className="block font-semibold text-gray-700">
                                            Continue with Google
                                        </span>
                                    </div>
                                </button>
                            </div>


                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                {isSignup && (
                                    <div className="space-y-2">
                                        <label className="block text-xl  font-light text-gray-700">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none"
                                        />
                                    </div>
                                )}
                                <div   className="space-y-2">
                                    <label className="block text-xl  font-light text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xl  font-light text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full h-12 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600"
                                >
                                    {isSignup ? "Sign Up" : "Log In"}
                                </button>
                            </form>

                            {/* <p className=" my-4 text-center">{message}</p> */}
                            <p className="text-center my-4 ">OR</p>

                            <div className="mt-4 text-center">
                                <p className="text-lg text-gray-600">
                                    {isSignup
                                        ? "Already have an account?"
                                        : "Don't have an account?"}{" "}
                                    <button
                                        onClick={toggleForm}
                                        className="text-red-600 underline"
                                    >
                                        {isSignup ? "Log In" : "Sign Up"}
                                    </button>
                                </p>
                            </div>

                            <div className="mt-4  space-y-4 text-gray-600 text-center  ">
                                <p className="text-xs">
                                    By proceeding, you agree to our{" "}
                                    <a href="#" className="underline">
                                        Terms of Use
                                    </a>{" "}
                                    and confirm you have read our{" "}
                                    <a href="#" className="underline">
                                        Privacy and Cookie Statement
                                    </a>
                                    .
                                </p>
                                <marquee className="text-xs hidden">
                                    This site is protected by reCAPTCHA and the{" "}
                                    <a href="#" className="underline">
                                        Google Privacy Policy
                                    </a>{" "}
                                    and{" "}
                                    <a href="#" className="underline">
                                        Terms of Service
                                    </a>{" "}
                                    apply.
                                </marquee>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
    );
}
