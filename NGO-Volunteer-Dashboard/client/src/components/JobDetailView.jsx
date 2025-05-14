import axios from 'axios';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Context } from '../main';
import Header from '../pages/Header';

const JobDetailView = () => {
    const { jobId } = useParams();
    const { user } = useContext(Context);
    const [job, setJob] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [hasApplied, setHasApplied] = useState(false);
    const [hasLiked, setHasLiked] = useState(false);

    // Data fetching
    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const { data } = await axios.get(`http://localhost:4000/api/v1/user/Jobs/${jobId}`, {
                    withCredentials: true,
                });
                setJob(data);
                setHasApplied(data.applicants?.includes(user._id));
                setHasLiked(data.likes?.includes(user._id));
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to load job details');
            }
        };

        const fetchApplicants = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:4000/api/v1/user/job/${jobId}/applicants`,
                    { withCredentials: true }
                );
                setApplicants(data.applicants || []);
            } catch (error) {
                console.log("Applicants not fetched or user is not creator.");
            }
        };

        fetchJobDetails();
        fetchApplicants();
    }, [jobId, user._id]);

    // Handlers
    const handleApply = async () => {
        try {
            await axios.put(
                `http://localhost:4000/api/v1/user/Jobs/apply/${jobId}`,
                {},
                { withCredentials: true }
            );
            toast.success("Applied successfully!");
            setHasApplied(true);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to apply for the job");
        }
    };

    const handleLike = async () => {
        try {
            const { data } = await axios.put(
                `http://localhost:4000/api/v1/user/Jobs/like/${jobId}`,
                {},
                { withCredentials: true }
            );
            const liked = data.likes?.includes(user._id);
            setHasLiked(liked);
            toast.success(liked ? "Job bookmarked!" : "Bookmark removed");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to bookmark job");
        }
    };

    if (!job) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    const isCreator = job.createdBy?._id === user._id;

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Main Content Container */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Job Details Card */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                    <div className="p-6 md:p-8">
                        {/* Job Header */}
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold text-gray-900 break-words">
                                    {job.title}
                                </h1>
                                <div className="mt-2 flex items-center text-gray-600">
                                    <span className="font-medium">Posted by:</span>
                                    <span className="ml-1">{job.createdBy?.name || 'Unknown'}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleLike}
                                className={`p-2 rounded-full transition-colors ${hasLiked ? 'text-purple-600 hover:bg-purple-50' : 'text-gray-400 hover:bg-gray-100'}`}
                                aria-label={hasLiked ? "Remove bookmark" : "Bookmark this job"}
                            >
                                {hasLiked ? (
                                    <BookmarkCheck className="w-6 h-6" />
                                ) : (
                                    <Bookmark className="w-6 h-6" />
                                )}
                            </button>
                        </div>

                        {/* Job Details Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column - Job Description */}
                            <div className="lg:col-span-2 space-y-6">
                                <section className="space-y-4">
                                    <h2 className="text-xl font-semibold text-gray-800">Job Description</h2>
                                    <div
                                        className="prose max-w-none text-gray-700"
                                        dangerouslySetInnerHTML={{ __html: job.description }}
                                    />
                                </section>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-gray-700">Location</h3>
                                        <p className="mt-1 text-gray-900">{job.location || 'Not specified'}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-gray-700">Job Type</h3>
                                        <p className="mt-1 text-gray-900">{job.jobType || 'Not specified'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Skills & Tags */}
                            <div className="space-y-6">
                                {/* Skills Section */}
                                <section className="bg-purple-50 p-5 rounded-lg border border-purple-100">
                                    <h3 className="text-lg font-semibold text-purple-800 mb-3">Required Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {job.skills?.length > 0 ? (
                                            job.skills.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                                                >
                                                    {skill}
                                                </span>
                                            ))
                                        ) : (
                                            <p className="text-gray-500">No skills specified</p>
                                        )}
                                    </div>
                                </section>

                                {/* Tags Section */}
                                <section className="bg-purple-50 p-5 rounded-lg border border-purple-100">
                                    <h3 className="text-lg font-semibold text-purple-800 mb-3">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {job.tags?.length > 0 ? (
                                            job.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white text-purple-700 border border-purple-200"
                                                >
                                                    #{tag}
                                                </span>
                                            ))
                                        ) : (
                                            <p className="text-gray-500">No tags specified</p>
                                        )}
                                    </div>
                                </section>
                            </div>
                        </div>

                        {/* Apply Button */}
                        {!isCreator && (
                            <div className="mt-8 flex justify-center md:justify-start">
                                <button
                                    onClick={handleApply}
                                    disabled={hasApplied}
                                    className={`px-8 py-3 rounded-lg font-semibold text-white transition-all ${hasApplied
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg'}`}
                                >
                                    {hasApplied ? 'Applied Successfully' : 'Apply Now'}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Applicants Section (for creator only) */}
                    {isCreator && applicants.length > 0 && (
                        <div className="border-t border-gray-200 p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Applicants ({applicants.length})</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {applicants.map(applicant => (
                                            <tr key={applicant._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {applicant.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {applicant.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {applicant.phone || 'Not provided'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {applicant.profile?.resume ? (
                                                        <a
                                                            href={applicant.profile.resume}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-purple-600 hover:text-purple-800 hover:underline"
                                                        >
                                                            View Resume
                                                        </a>
                                                    ) : (
                                                        <span className="text-gray-400">Not available</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default JobDetailView;