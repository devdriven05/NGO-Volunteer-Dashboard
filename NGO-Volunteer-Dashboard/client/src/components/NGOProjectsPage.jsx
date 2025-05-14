import axios from "axios";
import { Calendar, Mail, MapPin, Phone, Trash, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import Header from "../pages/Header";

const NGOProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        startDate: "",
        endDate: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [userId, setUserId] = useState(null);

    const fetchProjects = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/v1/user/projects/public", {
                withCredentials: true,
            });
            setProjects(res.data.projects);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const fetchUser = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/v1/me", {
                withCredentials: true,
            });
            setUserId(res.data.user._id);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            await axios.post("http://localhost:4000/api/v1/user/projects", formData, {
                withCredentials: true,
            });
            setMessage("Project added successfully!");
            setFormData({
                title: "",
                description: "",
                location: "",
                startDate: "",
                endDate: "",
            });
            setShowModal(false);
            fetchProjects();
        } catch (err) {
            setMessage("Failed to add project.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (projectId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this project?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:4000/api/v1/user/projects/${projectId}`, {
                withCredentials: true,
            });
            fetchProjects();
        } catch (error) {
            console.error("Failed to delete project:", error);
        }
    };

    useEffect(() => {
        fetchProjects();
        fetchUser();
    }, []);

    return (
        <>
            <Header />
            <div className="max-w-6xl mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">NGO Projects</h2>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                    >
                        + Post a New Project
                    </button>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-xl relative">
                            <h2 className="text-xl font-bold mb-4 text-purple-700">Post a New Project</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Project Title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 p-2 rounded-lg"
                                />
                                <textarea
                                    name="description"
                                    placeholder="Project Description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded-lg"
                                />
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded-lg"
                                />
                                <div className="flex space-x-4">
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-2 rounded-lg"
                                    />
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-2 rounded-lg"
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                                    >
                                        {loading ? "Posting..." : "Post Project"}
                                    </button>
                                </div>
                                {message && <p className="text-green-600 mt-2">{message}</p>}
                            </form>
                        </div>
                    </div>
                )}

                <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-700">Posted Projects</h2>
                <div className="space-y-6">
                    {projects.length === 0 ? (
                        <p>No projects found.</p>
                    ) : (
                        projects.map((project) => (
                            <div
                                key={project._id}
                                className="w-full max-w-4xl mx-auto rounded-2xl bg-white shadow-md border border-gray-200 p-6 transition hover:shadow-xl"
                            >
                                <div className="mb-3">
                                    <h3 className="text-xl font-bold text-purple-700">{project.title}</h3>
                                    <p className="mt-1 text-gray-700">{project.description}</p>
                                </div>

                                <div className="text-sm text-gray-600 space-y-1 mt-2">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} className="text-purple-600" />
                                        <span>{project.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} className="text-purple-600" />
                                        <span>
                                            {new Date(project.startDate).toLocaleDateString()} -{" "}
                                            {new Date(project.endDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                {project.postedBy && (
                                    <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
                                        <h4 className="text-sm font-semibold text-purple-600 mb-3">NGO Contact</h4>
                                        <div className="space-y-2 text-sm text-gray-700">
                                            <div className="flex items-center gap-2">
                                                <User size={16} className="text-purple-600" />
                                                <span>{project.postedBy.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Mail size={16} className="text-purple-600" />
                                                <span>{project.postedBy.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone size={16} className="text-purple-600" />
                                                <span>{project.postedBy.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Delete Button */}
                                {project.postedBy && project.postedBy._id === userId && (
                                    <div className="flex justify-end mt-4">
                                        <button
                                            onClick={() => handleDelete(project._id)}
                                            className="flex items-center gap-1 text-red-600 hover:text-red-800 transition text-sm"
                                        >
                                            <Trash size={16} />
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default NGOProjectsPage;
