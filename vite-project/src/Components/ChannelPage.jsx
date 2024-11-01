import React, { useState, useEffect } from 'react';
import VideoCard from './VideoCard';
import ShortsCard from './ShortsCard';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ChannelPage = () => {
    const { id: channelId } = useParams();
    const [channel, setChannel] = useState(null);
    const [videos, setVideos] = useState([]);
    const [shorts, setShorts] = useState([]);
    const [activeTab, setActiveTab] = useState('videos');
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    // API URLs
    const getChannelData_URL = `http://localhost:5200/api/channel/data/${channelId}`;
    const url_to_getAll_Videos = `http://localhost:5200/api/videos/get/${channelId}`;
    const url_to_getAll_Shorts = `http://localhost:5200/api/shorts/get/${channelId}`;

    // Fetch channel data
    const fetchChannel = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(getChannelData_URL);
            setChannel(response.data.channel);
            setErrorMsg('');
        } catch (error) {
            setErrorMsg('Failed to load channel data.');
            console.error(error.message);
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
            setErrorMsg('');
        } catch (error) {
            setErrorMsg('Failed to load videos.');
            console.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch shorts from the API
    const fetchShorts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(url_to_getAll_Shorts);
            setShorts(response.data);
            setErrorMsg('');
        } catch (error) {
            setErrorMsg('Failed to load shorts.');
            console.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchChannel();
        fetchVideos();
        fetchShorts();
    }, []);

    // Format created date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="min-h-screen bg-gray-50 sm:ml-20 sm:mr-5 md:ml-24">
            {/* Channel Banner */}
            <div className="bg-cover bg-center lg:rounded-3xl h-36 sm:h-48 md:h-64" style={{ backgroundImage: `url(${channel?.bannerImage})` }}></div>

            {/* Profile Section */}
            <div className="bg-white p-2 sm:p-4 shadow-sm">
                <div className="flex items-center justify-between flex-nowrap lg:pr-10">
                    <div className="flex items-center gap-4 text-xs sm:text-sm">
                        <img src={channel?.profilePicture} alt="Profile" className="rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover" />
                        <div>
                            <h3 className="text-lg lg:text-2xl font-semibold">{channel?.channelName || 'Channel Name'}</h3>
                            <p className="text-gray-600">{channel?.subscriberCount || '0'} Subscribers</p>
                            <div className='flex flex-row gap-1 items-center text-xs md:text-sm max-sm:hidden'>
                                <p className=' text-nowrap overflow-hidden w-52 md:w-60 lg:w-96 '>{channel?.description} ...more</p>

                            </div>
                        </div>
                    </div>
                    <button className="bg-black text-white py-1 px-2 sm:py-2 sm:px-4 rounded-full mt-3 md:mt-0">Subscribe</button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="bg-white shadow-sm mt-2">
                <ul className="flex justify-evenly md:justify-start md:gap-4 text-sm text-gray-600 overflow-x-auto">
                    <li className={`p-3 cursor-pointer ${activeTab === 'videos' ? 'border-b-2 border-red-500' : ''}`} onClick={() => setActiveTab('videos')}>Videos</li>
                    <li className={`p-3 cursor-pointer ${activeTab === 'shorts' ? 'border-b-2 border-red-500' : ''}`} onClick={() => setActiveTab('shorts')}>Shorts</li>
                    <li className={`p-3 cursor-pointer ${activeTab === 'about' ? 'border-b-2 border-red-500' : ''}`} onClick={() => setActiveTab('about')}>About</li>
                </ul>
            </nav>

            {/* Content based on Active Tab */}
            <div className="sm:p-4">
                {isLoading ? (
                    <p>Loading...</p>
                ) : errorMsg ? (
                    <p className="text-red-500">{errorMsg}</p>
                ) : activeTab === 'videos' ? (
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {videos.map((video) => (
                                <VideoCard key={video._id} videoId={video.videoId} channelId={video.channelId} videoDetails={video} />
                            ))}
                        </div>
                    </div>
                ) : activeTab === 'shorts' ? (
                    <div>
                        <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 p-2">
                            {shorts.map((short) => (
                                <ShortsCard key={short._id} shortId={short.shortId} shortsDetails={short} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white p-4 rounded shadow-sm mt-4">
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">About {channel?.channelName}</h3>
                        <p className="text-gray-600 max-sm:text-sm mb-2">{channel?.description || 'No description available.'}</p>
                        <p className="text-gray-500 text-sm">Created on: {channel?.createdAt ? formatDate(channel.createdAt) : 'N/A'}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChannelPage;
