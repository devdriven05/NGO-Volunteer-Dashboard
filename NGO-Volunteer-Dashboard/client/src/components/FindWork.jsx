import axios from "axios";
import React, { useEffect, useState } from "react";
import JobCard from "../layout/JobCard";
import Header from "../pages/Header";
import Filter from "./Filter";
import SearchForm from "./SearchForm";

const FindWork = () => {
    const [jobs, setJobs] = useState([]);
    const [columns, setColumns] = useState(3);
    const [filters, setFilters] = useState({
        fullTime: false,
        partTime: false,
        internship: false,
        contract: false,
    });

    const handleFilterChange = (filterName) => {
        setFilters((prev) => ({ ...prev, [filterName]: !prev[filterName] }));
    };

    const filteredJobs =
        filters.fullTime || filters.partTime || filters.contract || filters.internship
            ? jobs.filter((job) => {
                if (filters.fullTime && job.jobType.includes("Full Time")) return true;
                if (filters.partTime && job.jobType.includes("Part Time")) return true;
                if (filters.contract && job.jobType.includes("Contract")) return true;
                if (filters.internship && job.jobType.includes("Internship")) return true;
                return false;
            })
            : jobs;

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/v1/user/Jobs");
                setJobs(res.data);
            } catch (err) {
                console.error("Error fetching jobs", err);
            }
        };
        fetchJobs();
    }, []);

    const toggleGridColumns = () => {
        setColumns((prev) => (prev === 3 ? 2 : prev === 2 ? 1 : 3));
    };

    const getIcon = () => {
        if (columns === 3) return "🔳";
        if (columns === 2) return "📋";
        return "📄";
    };

    return (
        <main>
            <Header />
            <div className="relative px-8 py-4 bg-gradient-to-r from-purple-300 via-purple-200 to-purple-100 overflow-hidden">
                <div className="pb-6 relative z-10">
                    <SearchForm setJobs={setJobs} />
                </div>
            </div>

            <div className="w-[90%] mx-auto mb-14">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-black py-8">Recent Jobs</h2>

                    <button
                        onClick={toggleGridColumns}
                        className="flex items-center gap-4 border border-gray-400 px-8 py-2 rounded-full font-medium"
                    >
                        <span>
                            {columns === 3
                                ? "Grid View"
                                : columns === 2
                                    ? "Table View"
                                    : "List View"}
                        </span>
                        <span className="text-lg">{getIcon()}</span>
                    </button>
                </div>

                <div className="flex gap-8">
                    <Filter setJobs={setJobs} />

                    <div
                        className={`self-start flex-1 grid gap-8 ${columns === 3
                            ? "grid-cols-3"
                            : columns === 2
                                ? "grid-cols-2"
                                : "grid-cols-1"
                            }`}
                    >
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => (
                                <JobCard key={job._id} job={job} />
                            ))
                        ) : (
                            <div className="mt-1 flex items-center">
                                <p className="text-2xl font-bold">No Jobs Found!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default FindWork;
