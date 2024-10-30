import React from "react";
import { useState, useEffect } from "react";
import VideoCard from "./VideoCard";
import axios from 'axios';
import FilterButtons from "./FilterButtons";
import { useParams } from "react-router-dom";
import noResultImg from "../Images/noResult.gif";

function SearchComponent() {
    const { input: title } = useParams();
    const [relatedVideos, setRelatedVideos] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const fetchRelatedVideos = async () => {
            setIsLoading(true);
            if (title) {
                try {
                    const response = await axios.get(`http://localhost:5200/api/videos/title/${title}`);
                    setRelatedVideos(response.data);
                } catch (error) {
                    console.error("Error fetching related videos:", error);
                    setErrorMsg("Failed to load related videos.");
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchRelatedVideos();
    }, [title]);

    return (
        <>
            {/* Filter Buttons */}
            <div className="sticky bg-white top-14 sm:ml-10 sm:mr-5 md:ml-14 lg:top-16 z-30 xl:top-20 sm:top-16">
                <FilterButtons />
            </div>

            <div className={`sm:ml-20 sm:mr-5 min-h-screen md:ml-24 ${errorMsg && "flex bg-slate-50 flex-col items-center justify-center"}`}>
                {/* Conditional Background Image */}
                {isLoading ? (
                    <p>Loading...</p>
                ) : errorMsg ? (
                    <div className="flex flex-col  items-center justify-center ">
                        <img className="w-60 h-60 lg:w-96 lg:h-96 mb-4" src={noResultImg} alt="No Result" />
                    </div>
                ) : relatedVideos && relatedVideos.length > 0 ? (
                    <div className="Videos_Container grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {relatedVideos.map((video) => (
                            <VideoCard key={video._id} videoId={video.videoId} channelId={video.channelId} videoDetails={video} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center min-h-screen">
                        <img className="w-28 h-28 mb-4" src={noResultImg} alt="No Result" />
                        <p>No videos found.</p>
                    </div>
                )}
            </div>
        </>
    )
};

export default SearchComponent;