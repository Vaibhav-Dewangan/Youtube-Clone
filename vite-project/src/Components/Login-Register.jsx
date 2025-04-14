import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../Context/UserAuth.jsx';
import { useNavigate } from "react-router-dom";


function LoginResister() {
    const { login, islogin } = useAuth(); // Get login function from context
    const [newUser, setNewUser] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    // Handle input change
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    // Handle form submission
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);  // Start loading
        setErrorMessage("");  // Clear previous error

        try {
            const url = newUser ? 'http://localhost:5200/api/user/register' : 'http://localhost:5200/api/user/login';
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData) // Send form data as JSON
            });

            const data = await response.json();
            if (response.ok) {
                alert(newUser ? 'Resistration successful !' : 'Login successful !')
                if (newUser) {
                    // After successful registration, switch to login form
                    setNewUser(false);
                } else {
                    login(data.token);
                    localStorage.setItem('email', formData.email); // Store email in localStorage
                    localStorage.setItem('username', formData.username); // Store username in localStorage
                    navigate('/');
                }
            } else {
                setErrorMessage(data.message || "Something went wrong, please try again.");
            }

        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Something went wrong, please try again.');

        } finally {
            setLoading(false);  // Stop loading
        }
    };

    // Toggle between Register and Login forms
    function handleToggle() {
        setNewUser(!newUser);
        setErrorMessage("");  // Clear error message when toggling forms
    };

    return (
        <div className="min-h-screen bg-slate-100 z-10  ">
            <div className="loginPage min-h-full flex flex-col items-center text-base lg:text-lg px-6 pt-14 sm:pt-16 lg:px-8">
                <h2 className="text-xl font-semibold text-gray-800">
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    {newUser === false ? "Login" : "Register"}
                </h2>

                <div className="mt-8 bg-white shadow-lg rounded-lg p-8 w-full sm:w-80 md:w-96">
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        {newUser === true && (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="username" className="block text-gray-600">Username</label>
                                    <input
                                        className="mt-2 w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        id="username"
                                        autoComplete="username"
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>

                        )}

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-600">Email address</label>
                            <input
                                className="mt-2 w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                id="email"
                                type="email"
                                autoComplete="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-600">Password</label>
                            <input
                                className="mt-2 w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                id="password"
                                autoComplete="current-password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        {errorMessage && (
                            <p className="text-red-600 mt-2">{errorMessage}</p>
                        )}

                        <div className="mt-5">
                            <button
                                className="bg-red-600 hover:bg-red-700 border-2 border-red-600 rounded-md w-full text-white py-2 transition duration-200"
                                disabled={loading}
                                type="submit"
                            >
                                {loading ? "Please wait..." : newUser ? "Register" : "Login"}
                            </button>
                        </div>
                    </form>

                    <p className="mt-5 text-center">
                        {newUser ? "Already have an account?" : "New user?"}
                        <a onClick={handleToggle} className="font-semibold text-blue-600 hover:text-blue-500 cursor-pointer">
                            {newUser ? "Login here" : "Register here"}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginResister;