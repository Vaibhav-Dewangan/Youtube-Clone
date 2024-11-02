import React, { useEffect } from "react";
import { useState } from "react";
import VideoCard from "./VideoCard";
import ShortsCard from "./ShortsCard";
import FilterButtons from "./FilterButtons";
import axios from 'axios';

function VideoContents() {
    const [videos, setVideos] = useState([]);
    const [shorts, setShorts] = useState([]);
    const [videoSection_top, setVideoSection_top] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const url_to_getAll_Videos = "http://localhost:5200/api/videos/getAll";
    const url_to_getAll_Shorts = "http://localhost:5200/api/shorts/getAll";


    // Function to shuffle an array
    const shuffleVideos = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const shuffleShorts = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    // Fetch videos from the API
    const fetchVideos = async () => {
        try {
            const response = await axios.get(url_to_getAll_Videos);
            const shuffledVideos = shuffleVideos(response.data); // Shuffle the fetched videos
            setVideos(shuffledVideos);
            setErrorMsg(''); // Clear any previous error messages
        } catch (error) {
            setErrorMsg('Failed to load videos.');
        } finally {
            setIsLoading(false); // Loading is finished
        }
    };

    // Fetch shorts from the API
    const fetchShorts = async () => {
        try {
            const response = await axios.get(url_to_getAll_Shorts);
            const shuffledShorts = shuffleShorts(response.data);
            setShorts(shuffledShorts);
            setErrorMsg('');
        } catch (error) {
            setErrorMsg('Failed to load videos.');
        } finally {
            setIsLoading(false); // Loading is finished
        }
    };

    useEffect(() => {
        fetchShorts();
    }, []);

    useEffect(() => {
        fetchVideos();
    }, []);

    // useEffect to check screen width and update the number of displayed videos
    useEffect(() => {
        const updateDisplayedVideos = () => {
            const width = window.innerWidth;
            const count = width >= 1280 ? 8 : width >= 1024 ? 6 : width >= 640 ? 4 : 1;
            setVideoSection_top(videos.slice(0, count));
        };

        const updateDisplayedShorts = () => {
            const width = window.innerWidth;
            const count = width >= 1280 ? 6 : width >= 1024 ? 4 : width >= 640 ? 3 : 4;
            setShorts(shorts.slice(0, count));
        };

        updateDisplayedShorts();
        updateDisplayedVideos();

        // event listener to handle window resizing
        window.addEventListener("resize", updateDisplayedVideos);
        window.addEventListener("resize", updateDisplayedShorts);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener("resize", updateDisplayedVideos);
            window.removeEventListener("resize", updateDisplayedShorts);
        };
    }, [videos]);

    // Filter out videos already in videoSection_top
    const remainingVideos = videos.filter(video => !videoSection_top.some(topVideo => topVideo._id === video._id));

    return (
        <>
            {/* Filter Buttons */}
            <div className=" sticky bg-white top-14 sm:ml-10 sm:mr-5 md:ml-14 lg:top-16 z-30 xl:top-20 sm:top-16  ">
                <FilterButtons />
            </div>

            <div className=" min-h-screen sm:ml-20 box-content scroll-smooth  sm:mr-5 md:ml-24 scrollbar-thin">
                {/* Sponsored Videos container */}
                <div className="Sponsored_Videos_Container grid gap-5 sm:gap-6 grid-cols-1 grid-rows-1 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-3 xl:grid-cols-4">
                    {videoSection_top ? (
                        videoSection_top.map((video) => {
                            return <VideoCard key={video._id} videoId={video.videoId} channelId={video.channelId} videoDetails={video} />
                        })
                    ) : (isLoading ? (
                        <div>
                            <p>Loading...</p>
                        </div>

                    ) : (
                        <p>Error: {errorMsg}</p>
                    )
                    )}
                </div>

                {/* Shorts */}
                <li className="flex gap-2 items-center p-3 mt-5">
                    <img className="h-5 md:h-6 " src="src/Images/shorts-icon.webp" alt="shorts" />
                    <h2 className="">Shorts</h2>
                </li>
                <div className="shorts_Container grid gap-5 grid-cols-2 grid-rows-2 sm:grid-rows-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 p-2 ">
                    {shorts ? (
                        shorts.map((short) => {
                            return <ShortsCard key={short._id} shortId={short.shortId} shortsDetails={short} />
                        })
                    ) : (isLoading ? (
                        <div>
                            <p>Loading...</p>
                        </div>

                    ) : (
                        <p>Error: {errorMsg}</p>
                    )
                    )}
                </div>

                {/* Videos container */}
                <div className="Videos_Container grid gap-5 sm:gap-6 grid-cols-1 grid-rows-1 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-3 xl:grid-cols-4">
                    {remainingVideos ? (
                        remainingVideos.map((video) => {
                            return <VideoCard key={video._id} videoId={video.videoId} channelId={video.channelId} videoDetails={video} />
                        })
                    ) : (isLoading ? (
                        <div>
                            <p>Loading...</p>
                        </div>

                    ) : (
                        <p>Error: {errorMsg}</p>
                    )
                    )}
                </div>

            </div>

        </>
    );
};

export default VideoContents;