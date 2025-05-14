import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import JobDetails from "../JobPost/JobDetails";
import JobLocation from "../JobPost/JobLocation";
import JobSkills from "../JobPost/JobSkills";
import JobTitle from "../JobPost/JobTitle";
import { Context } from "../main";

const JobForm = () => {
    const { userProfile, isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

    const sections = ["About", "Job Details", "Skills", "Location", "Confirmation"];
    const [currentSection, setCurrentSection] = useState(sections[0]);
    const [completedSections, setCompletedSections] = useState([]);

    const [jobTitle, setJobTitle] = useState(localStorage.getItem("jobTitle") || "");
    const [jobDescription, setJobDescription] = useState(localStorage.getItem("jobDescription") || "");
    const [location, setLocation] = useState(() => {
        const stored = localStorage.getItem("location");
        return stored ? JSON.parse(stored) : { country: "", city: "", address: "" };
    });
    const [tags, setTags] = useState(() => JSON.parse(localStorage.getItem("tags")) || []);
    const [skills, setSkills] = useState(() => JSON.parse(localStorage.getItem("skills")) || []);
    const [loading, setLoading] = useState(false);

    const [employmentTypes, setEmploymentTypes] = useState(() => {
        const stored = localStorage.getItem("employmentTypes");
        return stored
            ? JSON.parse(stored)
            : {
                "Full Time": false,
                "Part Time": false,
                Contract: false,
                Internship: false,
                Temporary: false,
            };
    });

    const handleTitleChange = (e) => setJobTitle(e.target.value.trimStart());

    const handleEmploymentTypeChange = (type) => {
        setEmploymentTypes((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };

    const validateCurrentSection = () => {
        switch (currentSection) {
            case "About":
                return jobTitle.trim() && Object.values(employmentTypes).some(v => v);
            case "Job Details":
                return jobDescription.trim().length >= 20;
            case "Skills":
                return skills.length > 0;
            case "Location":
                return location?.country && location?.city;
            case "Confirmation":
                return true; // Confirmation doesn't need validation
            default:
                return true;
        }
    };

    const createJob = async (jobData) => {
        setLoading(true);
        try {
            const res = await axios.post(
                "http://localhost:4000/api/v1/user/Jobs",
                jobData,
                { withCredentials: true }
            );

            toast.success("Job created successfully");

            // Clear fields & localStorage
            setJobTitle("");
            setJobDescription("");
            setLocation({ country: "", city: "", address: "" });
            setTags([]);
            setSkills([]);
            setEmploymentTypes({
                "Full Time": false,
                "Part Time": false,
                Contract: false,
                Internship: false,
                Temporary: false,
            });

            localStorage.removeItem("jobTitle");
            localStorage.removeItem("jobDescription");
            localStorage.removeItem("location");
            localStorage.removeItem("skills");
            localStorage.removeItem("tags");
            localStorage.removeItem("employmentTypes");

            setCurrentSection(sections[0]);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create job");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!jobTitle.trim()) return toast.error("Please enter a job title");

        const activeEmploymentTypes = Object.keys(employmentTypes).filter(type => employmentTypes[type]);
        if (activeEmploymentTypes.length === 0) return toast.error("Please select at least one employment type");

        const jobData = {
            title: jobTitle,
            description: jobDescription,
            jobType: activeEmploymentTypes,
            location: `${location.address}, ${location.city}, ${location.country}`,
            skills,
            tags,
        };

        createJob(jobData);
    };

    useEffect(() => {
        const completed = [];
        if (jobTitle.trim()) completed.push("About");
        if (jobDescription.trim().length >= 20) completed.push("Job Details");
        if (skills.length > 0) completed.push("Skills");
        if (location?.country && location?.city) completed.push("Location");
        setCompletedSections(completed);
    }, [jobTitle, jobDescription, skills, location]);

    // Persist form state
    useEffect(() => {
        localStorage.setItem("jobTitle", jobTitle);
        localStorage.setItem("jobDescription", jobDescription);
        localStorage.setItem("location", JSON.stringify(location));
        localStorage.setItem("skills", JSON.stringify(skills));
        localStorage.setItem("tags", JSON.stringify(tags));
        localStorage.setItem("employmentTypes", JSON.stringify(employmentTypes));
    }, [jobTitle, jobDescription, location, skills, tags, employmentTypes]);

    const getCompletedColor = (section) => {
        if (completedSections.includes(section)) {
            return "bg-[#7263F3] text-white";
        }
        return "bg-white";
    };

    const renderStages = () => {
        switch (currentSection) {
            case "About":
                return (
                    <JobTitle
                        jobTitle={jobTitle}
                        handleTitleChange={handleTitleChange}
                        employmentTypes={employmentTypes}
                        handleEmploymentTypeChange={handleEmploymentTypeChange}
                    />
                );
            case "Job Details":
                return <JobDetails jobDescription={jobDescription} setJobDescription={setJobDescription} />;
            case "Skills":
                return <JobSkills skills={skills} setSkills={setSkills} tags={tags} setTags={setTags} />;
            case "Location":
                return <JobLocation location={location} setLocation={setLocation} />;
            case "Confirmation":
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium mb-2">Job Title</h3>
                            <p className="text-gray-700">{jobTitle}</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-2">Job Description</h3>
                            <p className="text-gray-700 whitespace-pre-line">
                                {jobDescription.trim().length > 0
                                    ? jobDescription.replace(/<p><br><\/p>/g, "") // Remove empty <p><br></p> tags
                                    : "No description provided."}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-2">Employment Types</h3>
                            <div className="flex flex-wrap gap-2">
                                {Object.keys(employmentTypes)
                                    .filter(type => employmentTypes[type])
                                    .map(type => (
                                        <span key={type} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                            {type}
                                        </span>
                                    ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-2">Required Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map(skill => (
                                    <span key={skill} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-2">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-2">Location</h3>
                            <p className="text-gray-700">
                                {location.address && `${location.address}, `}
                                {location.city && `${location.city}, `}
                                {location.country}
                            </p>
                        </div>

                        <div className="flex justify-between gap-4 mt-6">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-[#7263F3] text-white rounded-md"
                                disabled={loading}
                            >
                                {loading ? "Posting..." : "Post Job"}
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full flex gap-6">
            {/* Sidebar navigation */}
            <div className="self-start w-[10rem] flex flex-col bg-white rounded-md shadow-sm overflow-hidden">
                {sections.map((section, index) => (
                    <button
                        key={index}
                        className={`pl-4 py-3 relative flex self-start items-center gap-2 font-medium 
              ${currentSection === section ? "text-[#7263F3]" : "text-gray-500"}`}
                        onClick={() => setCurrentSection(section)}
                    >
                        <span
                            className={`w-6 h-6 rounded-full flex items-center border border-gray-400/60 justify-center 
                ${getCompletedColor(section)} ${currentSection === section ? "text-white" : "text-gray-500"}`}
                        >
                            {index}
                        </span>
                        {section}
                        {currentSection === section && (
                            <span className="w-1 h-full absolute left-0 top-0 bg-[#7263F3] rounded-full"></span>
                        )}
                    </button>
                ))}
            </div>

            {/* Main form */}
            <form
                className="p-6 flex-1 bg-white rounded-lg self-start"
                onSubmit={handleSubmit}
            >
                {renderStages()}
            </form>
        </div>
    );
};

export default JobForm;
