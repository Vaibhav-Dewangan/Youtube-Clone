import React from "react";

function Footer() {
    return (
        <>
            <div className=" pb-20 md:pb-10 mt-10 p-6 md:mx-14 border-t border-gray-300">
            <div className="max-w-6xl mx-auto flex flex-wrap justify-between">
                <div className="flex space-x-20">
                    <ul className="space-y-2">
                        <li><a href="#" className="text-sm text-gray-600 hover:text-black">About</a></li>
                        <li><a href="#" className="text-sm text-gray-600 hover:text-black">Press</a></li>
                        <li><a href="#" className="text-sm text-gray-600 hover:text-black">Copyright</a></li>
                        <li><a href="#" className="text-sm text-gray-600 hover:text-black">Contact us</a></li>
                        <li><a href="#" className="text-sm text-gray-600 hover:text-black">Creators</a></li>
                        <li><a href="#" className="text-sm text-gray-600 hover:text-black">Advertise</a></li>
                        <li><a href="#" className="text-sm text-gray-600 hover:text-black">Developers</a></li>
                    </ul>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-sm text-gray-600 hover:text-black">Terms</a></li>
                        <li><a href="#" className="text-sm text-gray-600 hover:text-black">Privacy</a></li>
                        <li><a href="#" className="text-sm text-gray-600 hover:text-black">Policy & Safety</a></li>
                        <li><a href="#" className="text-sm text-gray-600 hover:text-black">How YouTube works</a></li>
                        <li><a href="#" className="text-sm text-gray-600 hover:text-black">Test new features</a></li>
                    </ul>
                </div>
                <div className="flex flex-col justify-center space-y-2 mt-4 md:mt-0">
                    <span className="text-sm text-gray-600">Language: English</span>
                    <span className="text-sm text-gray-600">Location: Worldwide</span>
                    <span><a href="#" className="text-sm text-gray-600 hover:text-black">Restricted Mode: Off</a></span>
                </div>
            </div>
            <div className="mt-6 border-t border-gray-300 pt-4">
                <p className="text-sm text-gray-600 text-center">
                    {new Date().getFullYear()} Youtube Clone. All rights reserved.
                </p>
            </div>
        </div>
        </>
    )
};

export default Footer;