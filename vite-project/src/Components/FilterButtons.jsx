import React from "react";
import { Link } from "react-router-dom";

function FilterButtons() {
    return (
        <>

            {/* Filters Buttons */}
            <div className="filter-buttons pb-5 bg-white sm:pb-7 overflow-x-auto scroll-smooth flex-shrink-0">
                <ul className="flex gap-4 px-4 sm:px-10 text-sm">
                    <Link to='/'>
                        <li>
                            <button className="bg-slate-100 rounded-md p-1 sm:px-3 px-2 flex-shrink-0 hover:bg-slate-200 transition-colors">
                                All
                            </button>
                        </li>
                    </Link>
                    <Link to={`/filter/Music`}>
                        <li>
                            <button className="bg-slate-100 rounded-md p-1 sm:px-3 px-2 flex-shrink-0 hover:bg-slate-200 transition-colors">
                                Music
                            </button>
                        </li>
                    </Link>
                    <Link to={`/filter/Tech`}>
                        <li>
                            <button className="bg-slate-100 rounded-md p-1 sm:px-3 px-2 flex-shrink-0 hover:bg-slate-200 transition-colors">
                                Tech
                            </button>
                        </li>
                    </Link>
                    <Link to={`/filter/Education`}>
                        <li>
                            <button className="bg-slate-100 rounded-md p-1 sm:px-3 px-2 flex-shrink-0 hover:bg-slate-200 transition-colors">
                                Education
                            </button>
                        </li>
                    </Link>
                    <Link to={`/filter/Kids`}>
                        <li>
                            <button className="bg-slate-100 rounded-md p-1 sm:px-3 px-2 flex-shrink-0 hover:bg-slate-200 transition-colors">
                                Kids
                            </button>
                        </li>
                    </Link>
                    <Link to={`/filter/News`}>
                        <li>
                            <button className="bg-slate-100 rounded-md p-1 sm:px-3 px-2 flex-shrink-0 hover:bg-slate-200 transition-colors">
                                News
                            </button>
                        </li>
                    </Link>

                </ul>
            </div>

        </>
    );
};

export default FilterButtons;