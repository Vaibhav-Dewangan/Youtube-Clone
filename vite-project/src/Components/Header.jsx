import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBars, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import UserMenuHeader from "./UserMenuHeader";
import { useAuth } from "../Context/UserAuth.jsx";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import youtubeImg from '../Images/youtube-logo.png';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const { isLogin } = useAuth();
    const loginEmail = localStorage.getItem('email');
    const url = `http://localhost:5200/api/user/${loginEmail}`;
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [isSearching, setIsSearching] = useState(false);


    // handle search
    let searchTimeout;

    function handleSearch(e) {
        const input = e.target.value;
    
        if (input !== "") {
            // Navigate to search 
            navigate(`/search/${input}`);
        } else {
            // Clear any existing timeout 
            clearTimeout(searchTimeout);
            
            // Set a timeout to change `isSearching` to false after 3 seconds
            searchTimeout = setTimeout(() => {
                setIsSearching(false);
            }, 2000);
            navigate('/')
        }
    }

    // Fetch user data by email
    const fetchUserDataByEmail = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
            });
            setData(response.data); // Set the fetched data
        } catch (error) {
            console.error("Network error getting data:", error.message);
        }
    };

    useEffect(() => {
        fetchUserDataByEmail();
    }, [loginEmail]);

    // Toggle Menu
    function handleMenu() {
        setIsMenuOpen(!isMenuOpen)
    };

    // handle on close 
    function onClose() {
        setIsMenuOpen(!isMenuOpen);
    };

    // Toggle Account
    function handleAccount() {
        setIsAccountOpen(!isAccountOpen)
    };
    return (
        <>
            <div className="header sticky top-0 z-40 bg-white flex justify-between items-center h-14 lg:h-16 xl:h-20 sm:h-16 px-4 sm:px-7 md:px-10 max-sm:pb-6 py-3 sm:py-6    ">

                {!isSearching ? (
                    <>
                        <div className="logo flex items-center text-xl gap-10 sm:gap-8">
                            <button onClick={handleMenu} className="max-sm:hidden" >
                                <FontAwesomeIcon icon={faBars} />
                            </button>
                            <img className="h-7 sm:h-8" src={youtubeImg} alt="Youtube_logo" />
                        </div>

                        {/* Sidebar */}
                        <Sidebar isMenuOpen={isMenuOpen} handleMenu={handleMenu} onClose={onClose} />

                        {/* UserMenuHeader */}
                        <UserMenuHeader isAccountOpen={isAccountOpen} handleAccount={handleAccount} />

                        {/* NavTab for small screen */}
                        <div className="navTab sm:hidden ">
                            <ul className="flex gap-6  items-center align-middle text-lg sm:text-2xl">
                                <Link onClick={() => setIsSearching(!isSearching)}><li><FontAwesomeIcon icon={faMagnifyingGlass} /></li></Link>
                                <li><FontAwesomeIcon icon={faBell} /></li>
                                {isLogin ? (
                                    <button onClick={handleAccount} className=" items-center ">
                                        <li className="flex object-cover rounded-full overflow-hidden border-2  items-center">
                                            <img className="h-7 w-7" src={data.avatar} alt="" />
                                        </li>
                                    </button>
                                ) : (
                                    <Link to='/login'>
                                        <button className="text-nowrap text-xs rounded-full border-2 border-gray-600 lg:font-semibold p-2 lg:px-4 hover:bg-blue-400 hover:text-white">Sign in</button>
                                    </Link>
                                )}
                            </ul>
                        </div>
                    </>
                ) : (
                    <li className="flex justify-center bg-slate-100 sm:hidden  rounded-2xl mt-2 mx-auto border-2 items-center">
                        <input onChange={handleSearch} className=" w-56 p-1 rounded-l-2xl  px-3 text-base  shadow-inner " type="text" placeholder="Search" />
                        <FontAwesomeIcon className="px-5 " icon={faMagnifyingGlass} />
                    </li>
                )}


                {/* NavTab for large  screen */}
                <div className="navTab max-sm:hidden md:w-full md:flex md:justify-end   ">

                    <ul className="flex gap-6 sm:gap-10 items-center text-xl xl:text-2xl">
                        <li className="flex  bg-slate-100  rounded-2xl xl:rounded-full lg:mr-20 xl:mr-60  border-2 items-center">
                            <input onChange={handleSearch} className=" sm:w-56 md:w-60 lg:w-72 xl:w-96 p-1 rounded-l-2xl  px-3 text-base xl:text-lg  shadow-inner " type="text" placeholder="Search" />
                            <FontAwesomeIcon className="px-5 " icon={faMagnifyingGlass} />
                        </li>


                        <li><FontAwesomeIcon icon={faBell} /></li>

                        {isLogin ? (
                            <button onClick={handleAccount} className="flex flex-col items-center ">
                                <li className="flex object-cover flex-col rounded-full overflow-hidden border-2   items-center">
                                    <img className="sm:h-7 sm:w-7 lg:h-10 lg:w-10" src={data.avatar} alt="" />
                                </li>
                                <p className="text-xs text-nowrap">{data.username}</p>
                            </button>
                        ) : (
                            <Link to='/login'>
                                <button className="text-nowrap text-xs rounded-full border-2 border-gray-600 lg:font-semibold p-2 lg:px-4 hover:bg-blue-400 hover:text-white">Sign in</button>
                            </Link>
                        )}


                    </ul>
                </div>

            </div>

        </>
    )
};

export default Header;