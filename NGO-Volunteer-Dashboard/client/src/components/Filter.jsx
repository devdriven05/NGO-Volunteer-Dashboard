import axios from "axios";
import React, { useEffect, useState } from "react";

const Filter = ({ setJobs }) => {
    const [checkedTypes, setCheckedTypes] = useState({
        "Full Time": false,
        "Part Time": false,
        "Contract": false,
        "Internship": false,
    });
    const [checkedTags, setCheckedTags] = useState({});
    const [allTags, setAllTags] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/v1/user/Jobs");
                const allJobs = res.data;
                const tags = new Set();

                allJobs.forEach((job) => {
                    job.tags.forEach((tag) => tags.add(tag));
                });

                setAllTags([...tags]);
            } catch (err) {
                console.error("Error fetching jobs", err);
            }
        };

        fetchTags();
    }, []);

    // Filter jobs whenever checkedTypes or checkedTags change
    useEffect(() => {
        filterJobs();
    }, [checkedTypes, checkedTags]);

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;

        if (["Full Time", "Part Time", "Contract", "Internship"].includes(name)) {
            setCheckedTypes((prev) => ({
                ...prev,
                [name]: checked,
            }));
        } else {
            // Handle tag checkboxes
            setCheckedTags((prev) => ({
                ...prev,
                [name]: checked,
            }));
        }
    };

    const filterJobs = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/v1/user/Jobs");
            let allJobs = res.data;

            // Filter by job type
            const selectedTypes = Object.keys(checkedTypes).filter(
                (type) => checkedTypes[type]
            );
            if (selectedTypes.length > 0) {
                allJobs = allJobs.filter((job) =>
                    selectedTypes.some((type) => job.jobType.includes(type))
                );
            }

            // Filter by tags
            const selectedTags = Object.keys(checkedTags).filter(
                (tag) => checkedTags[tag]
            );
            if (selectedTags.length > 0) {
                allJobs = allJobs.filter((job) =>
                    selectedTags.every((tag) => job.tags.includes(tag))
                );
            }

            setJobs(allJobs);
        } catch (err) {
            console.error("Error filtering jobs", err);
        }
    };

    const clearFilters = () => {
        setCheckedTypes({
            "Full Time": false,
            "Part Time": false,
            "Contract": false,
            "Internship": false,
        });
        setCheckedTags({});
    };

    return (
        <div className="w-[22rem] pr-4 space-y-6">
            <div>
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-medium text-gray-800">Job Type</h2>
                    <button
                        type="button"
                        className="text-sm text-red-600 hover:text-red-800 transition"
                        onClick={clearFilters}
                    >
                        Clear All
                    </button>
                </div>

                {["Full Time", "Part Time", "Contract", "Internship"].map((type) => (
                    <div className="flex items-center gap-2" key={type}>
                        <input
                            type="checkbox"
                            name={type}
                            checked={checkedTypes[type]}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="text-sm text-gray-700 capitalize">{type}</label>
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-medium text-gray-800">Filter by Tags</h2>
                </div>
                {allTags.map((tag) => (
                    <div className="flex items-center gap-2" key={tag}>
                        <input
                            type="checkbox"
                            name={tag}
                            checked={checkedTags[tag] || false}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="text-sm text-gray-700 capitalize">{tag}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Filter;