import React from "react";

const JobSummary = ({ jobTitle, jobDescription, employmentTypes, skills, tags, location }) => {
    const activeTypes = Object.entries(employmentTypes)
        .filter(([_, value]) => value)
        .map(([key]) => key);

    return (
        <div className="text-gray-800 space-y-4">
            <h2 className="text-xl font-semibold text-[#7263F3] mb-4">Job Summary</h2>

            <div>
                <h3 className="font-semibold">Title:</h3>
                <p>{jobTitle}</p>
            </div>

            <div>
                <h3 className="font-semibold">Employment Types:</h3>
                <p>{activeTypes.join(", ")}</p>
            </div>

            <div>
                <h3 className="font-semibold">Description:</h3>
                <p>{jobDescription}</p>
            </div>

            <div>
                <h3 className="font-semibold">Skills:</h3>
                <p>{skills.join(", ")}</p>
            </div>

            <div>
                <h3 className="font-semibold">Tags:</h3>
                <p>{tags.join(", ")}</p>
            </div>

            <div>
                <h3 className="font-semibold">Location:</h3>
                <p>{location.address}, {location.city}, {location.country}</p>
            </div>
        </div>
    );
};

export default JobSummary;
