import React from "react";

const JobTitle = ({ jobTitle, handleTitleChange, employmentTypes, handleEmploymentTypeChange }) => {
    return (
        <div className="p-6 flex flex-col gap-4 bg-white border border-gray-300 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold">Job Title</h3>
                    <label htmlFor="jobTitle" className="text-sm text-gray-500 mt-2 block">
                        A job title is a specific designation of a post in an organization.
                    </label>
                </div>
                <input
                    type="text"
                    id="jobTitle"
                    value={jobTitle}
                    onChange={handleTitleChange}
                    className="flex-1 w-full mt-2 p-2 border border-gray-300 rounded-md"
                    placeholder="Enter Job Title"
                />
            </div>

            <hr className="my-4 border-gray-300" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold">Employment Type</h3>
                    <label htmlFor="employmentType" className="text-sm text-gray-500 mt-2 block">
                        Select the type of employment.
                    </label>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    {Object.entries(employmentTypes).map(([type, checked]) => (
                        <div
                            key={type}
                            className="flex items-center space-x-2 border border-gray-300 rounded-md p-2"
                        >
                            <input
                                type="checkbox"
                                id={type}
                                checked={checked}
                                onChange={() => handleEmploymentTypeChange(type)}
                                className="w-4 h-4"
                            />
                            <label htmlFor={type} className="text-sm font-medium">
                                {type}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JobTitle;
