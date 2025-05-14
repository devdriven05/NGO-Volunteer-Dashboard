import axios from 'axios';
import { MapPin, Search } from "lucide-react";
import React, { useState } from 'react';

const SearchForm = ({ setJobs }) => {
    const [searchQuery, setSearchQuery] = useState({
        tags: "",
        location: "",
        title: "",
    });

    const [loading, setLoading] = useState(false);

    const handleSearchChange = (key, value) => {
        setSearchQuery((prev) => ({ ...prev, [key]: value }));
    };

    const searchJobs = async (tags, location, title) => {
        setLoading(true);
        try {
            const query = new URLSearchParams();
            if (tags) query.append("tags", tags);
            if (location) query.append("location", location);
            if (title) query.append("title", title);

            const res = await axios.get(`http://localhost:4000/api/v1/user/Jobs/search?${query.toString()}`);

            // Handle both direct array response and nested data response
            const jobsData = Array.isArray(res.data) ? res.data : (res.data.data || res.data.jobs || []);
            if (setJobs) setJobs(jobsData);
        } catch (error) {
            console.log("Error searching jobs", error);
            if (setJobs) setJobs([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <form
                className="relative flex flex-wrap gap-3 items-center justify-center"
                onSubmit={(e) => {
                    e.preventDefault();
                    searchJobs(searchQuery.tags, searchQuery.location, searchQuery.title);
                }}
            >
                <div className="flex-1 min-w-[250px] relative">
                    <input
                        type="text"
                        id="job-title"
                        name="title"
                        value={searchQuery.title}
                        onChange={(e) => handleSearchChange("title", e.target.value)}
                        placeholder="🔍 Job Title"
                        className="w-full py-3 pl-12 pr-4 text-base rounded-full shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7263F3] bg-gradient-to-r from-white to-[#f8f9ff]"
                    />
                    <Search
                        size={18}
                        className="text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                    />
                </div>

                <div className="flex-1 min-w-[250px] relative">
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={searchQuery.location}
                        onChange={(e) => handleSearchChange("location", e.target.value)}
                        placeholder="📍 Location"
                        className="w-full py-3 pl-12 pr-4 text-base rounded-full shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7263F3] bg-gradient-to-r from-white to-[#f8f9ff]"
                    />
                    <MapPin
                        size={18}
                        className="text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                    />
                </div>

                <button
                    type="submit"
                    className="flex items-center gap-2 bg-gradient-to-r from-[#7263F3] to-[#988efc] hover:from-[#5d4de1] hover:to-[#8e7cf0] text-white text-base font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out"
                    disabled={loading}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="white"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                    >
                        <path d="M7 17.314V5a1 1 0 112 0v12.314a3 3 0 105.657-2.121L11 10.536a1 1 0 111.414-1.414l3.657 3.657a5 5 0 11-8.485 4.535z" />
                    </svg>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>
        </div>
    );
};

export default SearchForm;