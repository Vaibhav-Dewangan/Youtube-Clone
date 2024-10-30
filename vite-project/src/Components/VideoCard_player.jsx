import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faShare, faHeart } from '@fortawesome/free-solid-svg-icons';

function VideoCardPlayer({ videoId, videoDetails, channelId }) {
    const [channel, setChannel] = useState(null);
    const [timeAgo, setTimeAgo] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const uploadDate = videoDetails.uploadDate;

    const getChannelData_URL = `http://localhost:5200/api/channel/data/${channelId}`;
    const iframeURL = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    const fetchChannel = async () => {
        try {
            const response = await axios.get(getChannelData_URL);
            setChannel(response.data.channel);
            setErrorMsg('');
        } catch (error) {
            setErrorMsg('Failed to load channel data.');
            console.error(error.message);
        }
    };

    const calculateTimeAgo = () => {
        const now = new Date();
        const upload = new Date(uploadDate);
        const InSeconds = Math.floor((now - upload) / 1000);

        if (InSeconds < 60) return `${InSeconds} seconds ago`;
        const InMinutes = Math.floor(InSeconds / 60);
        if (InMinutes < 60) return `${InMinutes} minutes ago`;
        const InHours = Math.floor(InMinutes / 60);
        if (InHours < 24) return `${InHours} hours ago`;
        const InDays = Math.floor(InHours / 24);
        if (InDays < 30) return `${InDays} days ago`;
        const InMonths = Math.floor(InDays / 30);
        return `${InMonths} month${InMonths > 1 ? 's' : ''} ago`;
    };

    useEffect(() => {
        fetchChannel();
        setTimeAgo(calculateTimeAgo(uploadDate));
    }, [channelId]);

    return (
        <div className="videoItem flex flex-col space-y-2 pb-1">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                    className="absolute sm:rounded-lg top-0 left-0 w-full h-full"
                    src={iframeURL}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen>
                </iframe>
            </div>

            <div className="w-full flex flex-col px-2 gap-1">
                <div className="flex gap-2 flex-col">
                    <p className="text-sm lg:text-lg">{videoDetails.title}</p>
                    <div className="flex gap-2 space-x-1 text-xs lg:text-sm text-gray-600">
                        <Link to={`/channel/${channelId}`}><p>{channel ? channel.channelName : 'Loading...'}</p></Link>
                        <span>•</span>
                        <span>{videoDetails.views} views</span>
                        <span>•</span>
                        <span>{timeAgo}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center bg-slate-50 p-2 lg:py-5">
                    <Link to={`/channel/${channelId}`} className="flex flex-row items-center">
                        {channel ? (
                            <>
                                <img
                                    className="bg-gray-600 w-10 h-10 object-cover rounded-full mr-2"
                                    src={channel.profilePicture}
                                    alt="Channel Logo"
                                />
                                <p className="text-sm lg:text-lg font-semibold">{videoDetails.channelName}</p>
                            </>
                        ) : (
                            <div className="bg-gray-400 w-9 h-9 rounded-full animate-pulse" />
                        )}
                    </Link>

                    {channel && (
                        <button className="bg-black text-white py-1 px-3 rounded-full">Subscribe</button>
                    )}
                </div>

                <div className="flex justify-between overflow-x-auto pb-2 items-center mt-2">
                    <div className="flex gap-6 lg:gap-14 ">
                        <button className="flex items-center rounded-full bg-slate-50 p-1 px-2 gap-1 text-gray-600 hover:text-blue-500">
                            <FontAwesomeIcon icon={faThumbsUp} />
                            <span>{videoDetails.likes}</span>
                        </button>
                        <button className="flex items-center rounded-full bg-slate-50 p-1 px-2 gap-1 text-gray-600 hover:text-blue-500">
                            <FontAwesomeIcon icon={faThumbsDown} />
                            <span>{videoDetails.dislikes}</span>
                        </button>
                        <button className="flex items-center rounded-full bg-slate-50 p-1 px-2 gap-1 text-gray-600 hover:text-blue-500">
                            <FontAwesomeIcon icon={faShare} />
                            <span>Share</span>
                        </button>
                        <button className="flex items-center rounded-full bg-slate-50 p-1 px-2 gap-1 text-gray-600 hover:text-blue-500">
                            <FontAwesomeIcon icon={faHeart} />
                            <span>Thanks</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoCardPlayer;
