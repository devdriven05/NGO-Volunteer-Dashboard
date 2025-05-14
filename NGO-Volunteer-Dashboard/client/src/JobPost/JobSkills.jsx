import { X } from "lucide-react";
import { useState } from "react";

const JobSkills = ({ skills, setSkills, tags, setTags }) => {
    const [newSkill, setNewSkill] = useState("");
    const [newTag, setNewTag] = useState("");

    const handleAddSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills((prev) => [...prev, newSkill.trim()]);
            setNewSkill("");
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
    };

    const handleAddTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            setTags((prev) => [...prev, newTag.trim()]);
            setNewTag("");
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div className="p-6 flex flex-col gap-4 bg-white-100 border border-gray-300 rounded-lg">
            {/* Skills Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
                    <label htmlFor="skills" className="text-sm text-gray-600 mt-2 block">
                        Add relevant skills for the job position.
                    </label>
                </div>

                <div className="flex-1 flex flex-col gap-2">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            id="skills"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                            placeholder="Enter a skill"
                        />
                        <button
                            type="button"
                            onClick={handleAddSkill}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Add Skill
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                        {skills.map((skill, index) => (
                            <div
                                key={index}
                                className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center space-x-2"
                            >
                                <span>{skill}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveSkill(skill)}
                                    className="hover:text-red-500 focus:outline-none"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <hr className="my-4 border-gray-300" />

            {/* Tags Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">Tags</h3>
                    <label htmlFor="tags" className="text-sm text-gray-600 mt-2 block">
                        Add relevant tags for the job position.
                    </label>
                </div>

                <div className="flex-1 flex flex-col gap-2">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            id="tags"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                            placeholder="Enter a tag"
                        />
                        <button
                            type="button"
                            onClick={handleAddTag}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Add Tag
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag, index) => (
                            <div
                                key={index}
                                className="bg-gray-500 text-white px-3 py-1 rounded-full flex items-center space-x-2"
                            >
                                <span>{tag}</span>
                                <button
                                    onClick={() => handleRemoveTag(tag)}
                                    className="hover:text-red-500 focus:outline-none"
                                    aria-label={`Remove tag ${tag}`}
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobSkills;
