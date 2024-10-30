import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function ShortsCard({ shortsDetails, shortId }) {
    const [isHovering, setIsHovering] = useState(false);
    const iframeURL = `https://www.youtube.com/embed/${shortId}?autoplay=1&controls=0&showinfo=0&modestbranding=1&rel=0&end=0`;

    // Event handlers for hover
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    return (
        <>
            
                <div className="shortsItem flex flex-col space-y-2 pb-1" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >


                    <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
                        {/* Setting the aspect ratio to 9:16 for Shorts */}
                        {isHovering ? (
                            <iframe
                                className="absolute sm:rounded-lg top-0 left-0 w-full h-full"
                                src={iframeURL}
                                title="YouTube video player"
                                allow="autoplay; encrypted-media"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className="absolute top-0 left-0 w-full h-full cursor-pointer">
                                <img
                                    src={shortsDetails.thumbnailUrl} // Thumbnail URL
                                    alt="short thumbnail"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                        )}

                        {/* Title and Views for below 'sm' */}
                        <div className="sm:hidden absolute  bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-2">
                            <h3 className="text-xs">{shortsDetails.title.slice(0,30)}</h3>
                            <div className="text-xs">
                                <span>{shortsDetails.views} views</span>
                            </div>
                        </div>
                    </div>

                    {/* Video Details for 'sm' and above */}
                    <div className="w-full flex flex-col px-2 sm:flex">
                        <h3 className="text-sm sm:block hidden">{shortsDetails.title}</h3>
                        <div className=" text-xs text-gray-600 sm:block hidden">
                            <span>{shortsDetails.views} views</span>
                        </div>
                    </div>

                </div>
          
        </>
    );
}

export default ShortsCard;
