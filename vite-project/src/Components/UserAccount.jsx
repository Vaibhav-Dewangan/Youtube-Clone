import React, { useState, useEffect } from "react";
import { useAuth } from '../Context/UserAuth.jsx';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShare, faUserSecret, faQuestionCircle, faClock, faStar, faFilm, faDownload } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import CreateChannel from "./CreateChannel.jsx";
import VideoCard from "./VideoCard.jsx";

function UserAccount() {
    const { isLogin, logout } = useAuth();
    const loginEmail = localStorage.getItem('email');
    const url = `http://localhost:5200/api/user/${loginEmail}`;
    const [data, setData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const url_to_getAll_Videos = "http://localhost:5200/api/videos/getAll";
    const updateAvatar_Url = "http://localhost:5200/api/user/update/avatar";
    const [channelId, setChannelId] = useState("");
    const [isEditingAvatar, setIsEditingAvatar] = useState(false);
    const [newAvatar, setNewAvatar] = useState("");



    // Update avatar
    const updateAvatar = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.put(updateAvatar_Url, {
                userId: userData._id,
                avatar: newAvatar,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            setUserData((prevData) => ({ ...prevData, avatar: newAvatar }));
            setIsEditingAvatar(false);
        } catch (error) {
            console.error("Error updating avatar:", error.message);
            setError(error.message || 'Network error');
        } finally {
            setIsLoading(false);
            handleRefresh();
        }
    };

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
            setData(response.data);
            setChannelId(response.data.channels[0]?.channelId);

        } catch (error) {
            console.error("Network error getting data:", error.message);
            setError(error.message || 'Network error');
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch videos from the API
    const fetchVideos = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(url_to_getAll_Videos);
            setVideos(response.data);
            setError('');
        } catch (error) {
            setError('Failed to load videos.');
            console.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Refresh window
    const handleRefresh = () => {
        window.location.reload();
    };

    // Fetch user data when user logs in or after registration
    useEffect(() => {
        if (isLogin && loginEmail) {
            fetchVideos();
            fetchUserDataByEmail();
        }
    }, [isLogin, loginEmail]);

    // Set user data once it's fetched
    useEffect(() => {
        if (isLogin && data) {
            setUserData(data || null);
        }
    }, [isLogin, data]);

    const renderVideoCards = (videoList) => {
        return videoList.length > 0 ? (
            videoList.map((video) => (
                <VideoCard key={video._id} videoId={video.videoId} channelId={video.channelId} videoDetails={video} />
            ))
        ) : (
            <p>No videos found.</p>
        );
    };

    return (
        <div className="UserAccount min-h-screen sm:ml-20 sm:mr-5 md:ml-24">
            {!isLogin ? (
                <div className="flex justify-center py-20">
                    <div className="flex flex-col justify-center items-center gap-2">
                        <img className="h-48 sm:h-52 lg:h-60" src="src/Images/signInDoor.png" alt="signInDoor" />
                        <h1 className="text-xl">You're not signed in</h1>
                        <p className="text-xs text-gray-600">Sign in now to upload, save and comment on videos</p>
                        <Link to='/login'>
                            <button className="bg-blue-500 mt-4 text-white text-sm rounded-full p-1 lg:px-3 lg:text-base px-2">Sign in</button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col justify-center space-y-5 p-4">
                    {/* User Data */}
                    <div className="profile flex justify-start items-center align-middle gap-8 lg:gap-12">
                        <div onClick={() => setIsEditingAvatar(true)} style={{ backgroundImage: `url(${userData?.avatar})` }} className={`profile-pic hover:cursor-pointer bg-center bg-contain  border-2 overflow-hidden bg-slate-600 h-16 w-16 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-36 lg:w-36 rounded-full`}>

                            <p className={`flex justify-center text-center md:text-sm hover:text-white mt-11 sm:mt-16 pb-8 md:mt-20 lg:mt-28 text-xs bg-white bg-opacity-40`}>Edit</p>

                        </div>

                        <div>
                            {userData ? (
                                <div className="flex flex-col text-nowrap md:space-y-3">
                                    <h1 className="text-xl lg:text-3xl font-bold">{userData.username}</h1>
                                    <div className="flex flex-row space-x-2 lg:space-x-6 items-center text-xs lg:text-sm">
                                        <p>{userData.email}</p>
                                        {userData.channels.length === 0 ? (
                                            <button
                                                onClick={() => setModalOpen(true)}
                                                className="rounded-md hover:text-blue-600"
                                            >
                                                Create Channel
                                            </button>
                                        ) : (
                                            <Link to={`/channel/${channelId}`}>
                                                <p>View channel</p>
                                            </Link>
                                        )}
                                    </div>

                                    {/* Account related buttons */}
                                    <div className="filter-buttons pb-3 bg-white sm:pb-7 hidden md:block scroll-smooth flex-shrink-0">
                                        <ul className="flex gap-6 text-xs">
                                            <Link>
                                                <li className="bg-slate-100 flex text-nowrap items-center gap-3 rounded-md p-2 sm:px-3 px-2 flex-shrink-0 hover:bg-slate-200 transition-colors">
                                                    <FontAwesomeIcon icon={faUser} /> Switch Account
                                                </li>
                                            </Link>
                                            <Link>
                                                <li className="bg-slate-100 flex text-nowrap items-center gap-3 rounded-md p-2 sm:px-3 px-2 flex-shrink-0 hover:bg-slate-200 transition-colors">
                                                    <FontAwesomeIcon icon={faGoogle} /> Google Account
                                                </li>
                                            </Link>
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                isLoading ? (
                                    <p>Loading user data...</p>
                                ) : (
                                    <p>Error in loading: {error}</p>
                                )
                            )}
                        </div>
                    </div>

                    {isEditingAvatar && (
                        <div className="avatar-edit">
                            <input
                                type="text"
                                placeholder="Enter new avatar URL"
                                value={newAvatar}
                                onChange={(e) => setNewAvatar(e.target.value)}
                                className="p-1 sm:p-2 border rounded" />

                            <button onClick={updateAvatar} className="bg-blue-500 text-white rounded p-1 sm:p-2 ml-2 ">Update</button>

                        </div>
                    )}

                    {/* Account related buttons for smaller screens */}
                    <div className="filter-buttons md:hidden pb-3 bg-white sm:pb-7 overflow-x-auto scroll-smooth flex-shrink-0">
                        <ul className="flex gap-4 text-xs">
                            <Link>
                                <li className="bg-slate-100 flex text-nowrap items-center gap-3 rounded-md p-1 sm:px-3 px-2 flex-shrink-0 hover:bg-slate-200 transition-colors">
                                    <FontAwesomeIcon icon={faUser} /> Switch Account
                                </li>
                            </Link>
                            <Link>
                                <li className="bg-slate-100 flex text-nowrap items-center gap-3 rounded-md p-1 sm:px-3 px-2 flex-shrink-0 hover:bg-slate-200 transition-colors">
                                    <FontAwesomeIcon icon={faGoogle} /> Google Account
                                </li>
                            </Link>
                            <Link>
                                <li className="bg-slate-100 flex text-nowrap items-center gap-3 rounded-md p-1 sm:px-3 px-2 flex-shrink-0 hover:bg-slate-200 transition-colors">
                                    <FontAwesomeIcon icon={faUserSecret} /> Turn on Incognito
                                </li>
                            </Link>
                            <Link>
                                <li className="bg-slate-100 flex text-nowrap items-center gap-3 rounded-md p-1 sm:px-3 px-2 flex-shrink-0 hover:bg-slate-200 transition-colors">
                                    <FontAwesomeIcon icon={faShare} /> Share channel
                                </li>
                            </Link>
                        </ul>
                    </div>

                    {/* History section */}
                    <h2>History</h2>
                    <div className="history flex flex-row gap-4 overflow-x-auto scroll-smooth scrollbar-thin">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>Error: {error}</p>
                        ) : renderVideoCards(videos)}
                    </div>

                    {/* Liked section */}
                    <h2>Liked video</h2>
                    <div className="LikedVideo flex flex-row gap-4 overflow-x-auto scroll-smooth scrollbar-thin">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>Error: {error}</p>
                        ) : renderVideoCards(videos)}
                    </div>

                    {/* Playlist section */}
                    <h2>Playlist</h2>
                    <div className="playlist h-20 bg-slate-100 flex items-center justify-center">
                        <p>No playlist available</p>
                    </div>

                    {/* Watch later section */}
                    <h2>Watch later</h2>
                    <div className="watchLater h-20 bg-slate-100 flex items-center justify-center">
                        <p>No watchLater added</p>
                    </div>

                    {/* Tools section */}
                    <h2 className="sm:hidden">Tools</h2>
                    <div className="flex flex-col gap-4 sm:hidden">
                        <button className="  rounded p-2 flex items-center gap-2">
                            <FontAwesomeIcon icon={faFilm} /> Create a Video
                        </button>
                        <button className="  rounded p-2 flex items-center gap-2">
                            <FontAwesomeIcon icon={faClock} /> Schedule a Video
                        </button>
                        <button className=" rounded p-2 flex items-center gap-2">
                            <FontAwesomeIcon icon={faStar} /> Bookmarks
                        </button>
                        <button className="  rounded p-2 flex items-center gap-2">
                            <FontAwesomeIcon icon={faDownload} /> Download Videos
                        </button>
                        <button className=" rounded p-2 flex items-center gap-2">
                            <FontAwesomeIcon icon={faQuestionCircle} /> Help & Feedback
                        </button>
                    </div>

                </div>
            )}
            {isModalOpen && (
                <CreateChannel
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    userId={userData ? userData._id : null}
                />
            )}
        </div>
    );
}

export default UserAccount;
