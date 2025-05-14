import React from 'react';
import { Link } from 'react-router-dom';

const AllData = () => {
    return (
        <div className="py-10 bg-[#D7DEDC] text-gray-500 flex justify-between items-center px-4">
            <Link to="/">
                <img src="" alt="Logo" />
                <h1 className="font-extrabold text-2xl text-[#7263f3]">VolunteerHub</h1>

            </Link>
            <ul className="flex items-center gap-8">
                <li>
                    <Link to="/findWork">FindWork
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default AllData;
