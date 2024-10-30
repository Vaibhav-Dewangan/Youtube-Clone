import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt, faShoppingCart, faDatabase, faPaintBrush, faLanguage, faFlag, faEyeSlash, faMapMarkerAlt, faKeyboard, faCog, faQuestionCircle, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { useAuth } from "../Context/UserAuth.jsx";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import CreateChannel from "./CreateChannel.jsx";


function UserMenuHeader(props) {
    const { isLogin, logout } = useAuth();
    const loginEmail = localStorage.getItem('email');
    const url = `http://localhost:5200/api/user/${loginEmail}`;
    const [data, setData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const listCss = "hover:bg-slate-100 p-2 flex items-center gap-5 rounded";
    const [error, setError] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const [channelId, setChannelId] = useState("");


    // Fetch user data by email
    const fetchUserDataByEmail = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
            });
            setData(response.data); // Set the fetched data
            setChannelId(response.data.channels[0]?.channelId);
        } catch (error) {
            console.error("Network error getting data:", error.message);
            setError(error.message || 'Network error');
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch user data when user logs in or after registration
    useEffect(() => {
        if (isLogin && loginEmail) {
            fetchUserDataByEmail();
        }
    }, [isLogin, loginEmail]);

    // Set user data once it's fetched
    useEffect(() => {
        if (isLogin && data) {
            setUserData(data || null);
        }
    }, [isLogin, data]);

    // Handle logout
    function handleLogout() {
        logout();
        navigate('/');
        props.handleAccount();
    };

    return (
        <>
        <div className={`UserMenuHeader fixed z-40  top-10 sm:top-14 md:top-16 right-0 transition-transform duration-200 ease-linear w-full  max-w-96 sm:max-w-72 sm:h-screen sm:pb-20  sm:shadow-xl  text-sm bg-white overflow-y-scroll scrollbar-thin p-4 space-y-4 
            ${props.isAccountOpen ? 'translate-x-0' : 'translate-x-full'}`}>

            <div className="profile flex justify-start items-center gap-8">
                <div className="profile-pic overflow-hidden bg-slate-600 h-16 w-16 rounded-full">
                    {userData && userData.avatar ? (
                        <Link to='/account' onClick={props.handleAccount}>
                            <img className="" src={userData.avatar} alt="profile-pic" />
                        </Link>
                    ) : (
                        <>
                            <img className="" src="https://cdn-icons-png.flaticon.com/512/9203/9203764.png" alt="profile-pic" />
                        </>
                    )}

                </div>
                <div>
                    {!isLogin ? (
                        <div className="text-blue-600 text-base  ">
                            <Link to='/login'><p>Login / Register</p></Link>
                        </div>
                    ) : (
                        <div>
                            {/* check if userData is available */}
                            {userData ? (
                                <>
                                    <p className="font-semibold">{userData.username}</p>
                                    <p className="max-sm:text-xs">{userData.email}</p>
                                    {userData.channels.length === 0 ? (
                                        <button
                                            onClick={() => setModalOpen(true)}
                                            className="rounded-md hover:text-blue-600 max-sm:text-xs"
                                        >
                                            Create Channel
                                        </button>
                                    ) : (
                                        <Link to={`/channel/${channelId}`} onClick={props.handleAccount}>
                                            <p className="max-sm:text-xs">View channel</p>
                                        </Link>
                                    )}
                                </>
                            ) : (
                                isLoading ? (  // loading message while fetching
                                    <p>Loading user data...</p>
                                ) : (
                                    <p>Error loading user data: {error}</p>  // error message if fetch fails
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>

            <hr />
            <div className="space-y-2">
                <ul className="space-y-1">
                    <Link><li className={listCss}><FontAwesomeIcon icon={faGoogle} /> Google Account</li></Link>
                    <Link><li className={listCss}><FontAwesomeIcon icon={faUser} /> Switch account</li></Link>
                    <li onClick={handleLogout} className={listCss}><FontAwesomeIcon icon={faSignOutAlt} /><button >Sign out</button></li>
                </ul>
            </div>
            <hr />

            <div className="space-y-2">
                <ul className="space-y-1">
                    <li className={listCss}><FontAwesomeIcon icon={faYoutube} /><a href="#">YouTube Studio</a></li>
                    <li className={listCss}><FontAwesomeIcon icon={faShoppingCart} /> <a href="#">Purchase and memberships</a></li>
                </ul>
            </div>
            <hr />

            <div className="space-y-2">
                <ul className="space-y-1">
                    <li className={listCss}><FontAwesomeIcon icon={faDatabase} /><a href="#">Your data in Youtube</a></li>
                    <li className={listCss}><FontAwesomeIcon icon={faPaintBrush} /><a href="#">Appearance: Device theme</a></li>
                    <li className={listCss}><FontAwesomeIcon icon={faLanguage} /><a href="#">Language: British English</a></li>
                    <li className={listCss}><FontAwesomeIcon icon={faEyeSlash} /><a href="#">Restricted Mode: Off</a></li>
                    <li className={listCss}><FontAwesomeIcon icon={faMapMarkerAlt} /><a href="#">Location: India</a></li>
                    <li className={listCss}><FontAwesomeIcon icon={faKeyboard} />	<a href="#">Keyboard shortcuts</a></li>
                </ul>
            </div>
            <hr />

            <div className="space-y-2">
                <ul className="space-y-1">
                    <li className={listCss}><FontAwesomeIcon icon={faCog} /><a href="#">Settings</a></li>
                </ul>
            </div>
            <hr />

            <div className="space-y-2">
                <ul className="space-y-1">
                    <li className={listCss}><FontAwesomeIcon icon={faQuestionCircle} /><a href="#">Help</a></li>
                    <li className={listCss}><FontAwesomeIcon icon={faCommentDots} /><a href="#">Send feedback</a></li>
                </ul>
            </div>
            

           

        </div>
        {isModalOpen && (
                <CreateChannel
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    userId={userData ? userData._id : null}
                />
            )}
        </>
    )
};

export default UserMenuHeader;
