import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

function VideoCard({ videoId, videoDetails, channelId }) {
    const [channel, setChannel] = useState(null);
    const [timeAgo, setTimeAgo] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isHovering, setIsHovering] = useState(false);
    const uploadDate = videoDetails.uploadDate;

    // API URL for channel data
    const getChannelData_URL = `http://localhost:5200/api/channel/data/${channelId}`;
    const iframeURL = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&end=0&rel=0`;

    // Fetch channel data
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

    // Calculate upload date
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

    // Event handlers for hover
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Scroll to the top when VideoCard is clicked
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>

            <div
                className="videoItem flex flex-col space-y-2 pb-1"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Link to={`/videoPlayer/${videoId}`} onClick={handleClick} >
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        {isHovering ? (
                            <iframe
                                className="absolute sm:rounded-lg top-0 left-0 w-full h-full pointer-events-none"
                                src={iframeURL}
                                title="YouTube video player"
                                allow="autoplay; encrypted-media"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className="absolute top-0 left-0 w-full h-full cursor-pointer">
                                <img
                                    src={videoDetails.thumbnailUrl} // Thumbnail URL
                                    alt="video thumbnail"
                                    className="w-full h-full object-cover sm:rounded-lg"
                                />
                            </div>
                        )}
                    </div>

                </Link>

                {/* Video Details */}
                <div className="w-full flex px-2 gap-2 items-center">

                    <div className="flex w-24">
                        <Link to={`/channel/${channelId}`}>
                            {channel ? (
                                <img
                                    className="bg-gray-600 w-10 h-10 object-cover rounded-full"
                                    src={channel.profilePicture}
                                    alt="logo"
                                />
                            ) : (
                                <div className="bg-gray-400 w-9 h-9 rounded-full animate-pulse" />
                            )}
                        </Link>
                    </div>


                    <div className="flex flex-col">
                        <p className="text-sm">{videoDetails.title}</p>
                        <div className="flex space-x-1 text-xs text-gray-600">
                            <Link to={`/channel/${channelId}`}><p className="text-blue-500">{channel ? channel.channelName : 'Loading...'}</p></Link>
                            <span>•</span>
                            <span>{videoDetails.views} views</span>
                            <span>•</span>
                            <span>{timeAgo}</span>
                        </div>
                    </div>
                </div>

                {errorMsg && <p className="text-red-500">{errorMsg}</p>}
            </div>

        </>
    );
}

export default VideoCard;
