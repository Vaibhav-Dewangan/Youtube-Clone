import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHouse } from '@fortawesome/free-solid-svg-icons';
import subscriptionImg from '../Images/subscription-icon.webp';
import shortsIcon from '../Images/shorts-icon.webp';


function SideNav() {
    // Scroll to the top when VideoCard is clicked
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <div className="sideNav_container z-30  bg-white fixed max-sm:hidden sm:pl-6 md:pl-8 sm:top-14 md:top-16 xl:top-20 sm:left-0 h-14 sm:h-screen md:w-20 sm:w-16 w-screen px-4 py-3 max-sm:border-t ">

                <ul className="sideNavTab flex sm:flex-col flex-row justify-evenly align-middle items-center gap-6  text-lg  ">
                    <Link to='/'><li className="flex flex-col items-center">
                        <FontAwesomeIcon icon={faHouse} />
                        <p className="text-xs text-slate-600">Home</p>
                    </li></Link>

                    <Link><li className="flex flex-col items-center">
                        <img className="h-5  filter grayscale" src={shortsIcon} alt="shorts" />
                        <p className="text-xs text-slate-600">Shorts</p>
                    </li></Link>

                    <Link><li className="flex flex-col items-center">
                        <img className=" h-5  " src={subscriptionImg} alt="Subscription" />
                        <p className="text-xs text-slate-600">Subscription</p>
                    </li></Link>

                    <Link to='/account' onClick={handleClick}><li className="flex flex-col items-center">
                        <FontAwesomeIcon icon={faUser} />
                        <p className="text-xs text-slate-600">You</p>
                    </li></Link>

                </ul>

            </div>

        </>
    )
};

export default SideNav;