import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHouse, faPlus } from '@fortawesome/free-solid-svg-icons';
import subscriptionImg from '../Images/subscription-icon.webp';
import shortsIcon from '../Images/shorts-icon.webp';
import { useAuth } from "../Context/UserAuth";

function BottomNav() {
    const {isBottomNav} = useAuth();

    return (
        <>
            {/* Bottom navigation bar */}
            <div className={`bottomNav fixed bottom-0 z-50 bg-white shadow-md sm:hidden h-14 w-screen px-4 py-3 border-t ${isBottomNav == false ? 'hidden' : 'block'} `}>

                <ul className="bottomNavTab flex  flex-row justify-evenly  align-middle items-center gap-6  text-lg ">

                    {/* Home */}
                    <Link to='/'><li className="flex flex-col items-center">
                        <FontAwesomeIcon icon={faHouse} />
                        <p className="text-xs text-slate-600">Home</p>
                    </li></Link>

                    {/* Shorts */}
                    <Link><li className="flex flex-col items-center">
                        <img className="h-5 filter grayscale" src={shortsIcon} alt="shorts" />
                        <p className="text-xs text-slate-600">Shorts</p>
                    </li></Link>

                    {/* Add videos/shorts */}
                    <Link className="pb-2 "><li className="border border-black px-2  rounded-full">
                        <FontAwesomeIcon icon={faPlus} />
                    </li></Link>

                    {/* Subscription */}
                    <Link><li className="flex flex-col items-center">
                        <img className=" h-5 " src={subscriptionImg} alt="Subscription" />
                        <p className="text-xs text-slate-600">Subscription</p>
                    </li></Link>

                    {/* You */}
                    <Link to='/account'><li className="flex flex-col items-center">
                        <FontAwesomeIcon icon={faUser} />
                        <p className="text-xs text-slate-600">You</p>
                    </li></Link>

                </ul>

            </div>

        </>
    )
};

export default BottomNav;