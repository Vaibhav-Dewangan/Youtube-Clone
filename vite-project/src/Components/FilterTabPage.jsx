import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import VideoCard from "./VideoCard";
import axios from 'axios';
import FilterButtons from "./FilterButtons";
import ShortsCard from "./ShortsCard";
import shortsIcon from '../Images/shorts-icon.webp';

function FilterTabPage() {
    const { id: category } = useParams();
    const [relatedVideos, setRelatedVideos] = useState();
    const [relatedShorts, setRelatedShorts] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const fetchRelatedVideos = async () => {
            setIsLoading(true);
            if (category) {
                try {
                    const response = await axios.get(`http://localhost:5200/api/videos/category/${category}`);
                    setRelatedVideos(response.data);
                } catch (error) {
                    console.error("Error fetching related videos:", error);
                    setErrorMsg("Failed to load related videos.");
                } finally {
                    setIsLoading(false);
                }
            }
        };

        const fetchRelatedShorts = async () => {
            setIsLoading(true);
            if (category) {
                try {
                    const response = await axios.get(`http://localhost:5200/api/shorts/category/${category}`);
                    setRelatedShorts(response.data);
                } catch (error) {
                    console.error("Error fetching related videos:", error);
                    setErrorMsg("Failed to load related videos.");
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchRelatedShorts();
        fetchRelatedVideos();
    }, [category]);

    return (
        <>

            {/* Filter Buttons */}
            <div className=" sticky bg-white top-14 sm:ml-10 sm:mr-5 md:ml-14 lg:top-16 z-30 xl:top-20 sm:top-16  ">
                <FilterButtons />
            </div>


            <div className="sm:ml-20 sm:mr-5 md:ml-24">
                {/* Videos container */}
                <div className="Videos_Container grid gap-5 sm:gap-6 grid-cols-1 grid-rows-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
                    {relatedVideos ? (
                        relatedVideos.map((video) => {
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
                    <img className="h-5 md:h-6 " src={shortsIcon} alt="shorts" />
                    <h2 className="">Shorts</h2>
                </li>
                <div className="shorts_Container grid gap-5 grid-cols-2 grid-rows-2 sm:grid-rows-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 p-2 ">
                    {relatedShorts ? (
                        relatedShorts.map((short) => {
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
            </div>


        </>
    )
};

export default FilterTabPage;