import axios from "axios";
import { Briefcase, Trash } from "lucide-react";
import { useContext } from "react";
import { FiClock, FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";

const MyJobs = ({ jobs, setJobs }) => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    // Function to calculate relative time
    const getRelativeTime = (dateString) => {
        const now = new Date();
        const postedDate = new Date(dateString);
        const diffInMinutes = Math.floor((now - postedDate) / (1000 * 60));

        if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
        return `${Math.floor(diffInMinutes / 1440)} days ago`;
    };

    const deleteJob = async (jobId) => {
        if (!user) {
            toast.error("Please log in first");
            return;
        }
        try {
            await axios.delete(`http://localhost:4000/api/v1/user/Jobs/${jobId}`, {
                withCredentials: true,
            });
            setJobs(jobs.filter(job => job._id !== jobId));
            toast.success("Job removed");
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    return (
        <>
            <h1 className="text-2xl font-bold text-purple-700 mb-6">My Job Posts</h1>

            {jobs.length === 0 ? (
                <div className="text-center py-10">
                    <Briefcase className="mx-auto text-purple-300" size={40} />
                    <p className="text-purple-500 mt-2">No jobs posted yet</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {jobs.map((job) => (
                        <div
                            key={job._id}
                            className="w-full p-5 bg-white rounded-lg border border-purple-100 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div
                                className="flex items-start gap-3 cursor-pointer"
                                onClick={() => navigate(`/job/${job._id}`)}
                            >
                                <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                                    <Briefcase size={20} />
                                </div>
                                <div className="flex-1">
                                    <h2 className="font-medium text-purple-800">{job.title}</h2>
                                    <div className="flex items-center text-sm text-purple-500 mt-1">
                                        <FiMapPin className="mr-1" />
                                        {job.location}
                                    </div>
                                    <div className="flex items-center text-xs text-purple-400 mt-1">
                                        <FiClock className="mr-1" />
                                        {getRelativeTime(job.createdAt)}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3">
                                {/* Skills Section */}
                                {job.skills?.length > 0 && (
                                    <div className="mb-3">
                                        <h4 className="text-xs font-semibold text-purple-600 mb-1">SKILLS REQUIRED</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {job.skills.map((skill, i) => (
                                                <span key={i} className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded-full">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Tags Section */}
                                {job.tags?.length > 0 && (
                                    <div className="mb-3">
                                        <h4 className="text-xs font-semibold text-purple-600 mb-1">TAGS</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {job.tags.map((tag, i) => (
                                                <span key={i} className="text-xs px-2 py-1 bg-white text-purple-600 border border-purple-200 rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {job.createdBy?._id === user?._id && (
                                    <div className="flex justify-end mt-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteJob(job._id);
                                            }}
                                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                                            title="Delete job"
                                        >
                                            <Trash size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default MyJobs;