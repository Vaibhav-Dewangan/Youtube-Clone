import React, { useState } from "react";
import SideNav from "./SideNav";
import FilterButtons from "./FilterButtons";
import VideoContents from "./VideoContents";


function Body() {

    return (
        <div className="bodyContainer">

            {/* Videos Container */}
            <div className="Video_Container h-full w-full">
                <VideoContents />
            </div>
            
        </div>
    )
};

export default Body;