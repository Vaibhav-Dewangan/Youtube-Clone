import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faHome, faFilm, faBell, faUserCircle, faHistory, faList, faVideo, faClock, faThumbsUp, faStar, faTachometerAlt, faMusic, faChild, faCog, faFlag, faQuestionCircle, faPaperPlane } from '@fortawesome/free-solid-svg-icons';


function Sidebar(props) {
    const navigate = useNavigate();
    const listCss = "hover:bg-slate-100 p-2 flex items-center gap-5 rounded";

    // Navigate to home and close the sidebar
    function handleHomeClick() {
        navigate("/"); // Navigate to home
        props.onClose(); // Call a function to close the sidebar
    }

    return (
        <div className={`sideBar fixed top-10 sm:top-14 md:top-16 left-0 z-40  w-full  sm:max-w-72 scrollbar-thin shadow-xl pb-28 sm:pb-20 text-sm h-screen transition-transform duration-200 ease-linear bg-white overflow-y-auto p-4 space-y-4 ${props.isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>

            <hr />
            <div className="space-y-2">
                <ul className="space-y-1">
                    <li className={listCss} onClick={handleHomeClick}>
                        <FontAwesomeIcon icon={faHome} />
                        <span>Home</span>
                    </li>
                    <Link><li className={listCss}><FontAwesomeIcon icon={faFilm} />Shorts</li></Link>
                    <li className={listCss}><FontAwesomeIcon icon={faBell} /><a href="#">Subscriptions</a></li>
                </ul>
            </div> <hr />

            {/* You Section */}
            <div className="space-y-2">
                <h2 className="text-lg font-bold">You</h2>
                <ul className="space-y-1">
                    <Link to='/account' onClick={props.onClose}><li className={listCss}><FontAwesomeIcon icon={faUserCircle} />Your Account</li></Link>
                    <li className={listCss}><FontAwesomeIcon icon={faHistory} /><a href="#">History</a></li>
                    <li className={listCss}><FontAwesomeIcon icon={faList} /><a href="#">Playlists</a></li>
                    <li className={listCss}><FontAwesomeIcon icon={faVideo} /><a href="#">Your videos</a></li>
                    <li className={listCss}><FontAwesomeIcon icon={faClock} /><a href="#">Watch Later</a></li>
                    <li className={listCss}><FontAwesomeIcon icon={faThumbsUp} /><a href="#">Liked videos</a></li>
                </ul>
            </div>  <hr />

            {/* Subscriptions Section */}
            <div className="space-y-2">
                <h2 className="text-lg font-bold">Subscriptions</h2>
                <ul className="space-y-1">

                </ul>
            </div> <hr />

            {/* More from YouTube Section */}
            <div className="space-y-2">
                <h2 className="text-lg font-bold">More from YouTube</h2>
                <ul className="space-y-1">
                    <li className={listCss}><FontAwesomeIcon icon={faStar} /><a href="#">YouTube Premium</a></li>
                    <li className={listCss}><FontAwesomeIcon icon={faTachometerAlt} /><a href="#">YouTube Studio</a></li>
                    <li className={listCss}><FontAwesomeIcon icon={faMusic} /><a href="#">YouTube Music</a></li>
                    <li className={listCss}><FontAwesomeIcon icon={faChild} /><a href="#">YouTube Kids</a></li>
                </ul>
            </div> <hr />

            {/* Settings Section */}
            <div className="space-y-2">
                <h2 className="text-lg font-bold">Settings</h2>
                <ul className="space-y-1">
                    <li className={listCss}><FontAwesomeIcon icon={faCog} /><a href="#">Settings</a></li>
                    <li className={listCss}><FontAwesomeIcon icon={faFlag} /><a href="#">Report history</a></li>
                    <li className={listCss}><FontAwesomeIcon icon={faQuestionCircle} /><a href="#">Help</a></li>
                    <li className={listCss}><FontAwesomeIcon icon={faPaperPlane} /><a href="#">Send feedback</a></li>
                </ul>
            </div>
        </div>
    )
};

export default Sidebar;

