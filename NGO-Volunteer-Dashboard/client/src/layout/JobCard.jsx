import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Strip HTML tags from description
const stripHtmlTags = (html) => html.replace(/<[^>]*>?/gm, "");

// Format date to relative time (e.g. "32 min ago")
const formatRelativeTime = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diff = Math.floor((now - past) / 1000); // in seconds

    if (diff < 60) return `${diff} sec ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    return past.toLocaleDateString(); // fallback to full date
};

function JobCard({ job }) {
    const navigate = useNavigate();

    const {
        title,
        createdBy = {},
        applicants = [],
        jobType = [],
        createdAt,
        _id,
        description,
    } = job;

    const { name = "Unknown", profilePicture } = createdBy;

    const jobTypeBg = (type) => {
        switch (type) {
            case "Full Time":
                return "bg-green-500/20 text-green-600";
            case "Part Time":
                return "bg-purple-500/20 text-purple-600";
            case "Contract":
                return "bg-red-500/20 text-red-600";
            case "Internship":
                return "bg-indigo-500/20 text-indigo-600";
            default:
                return "bg-gray-500/20 text-gray-600";
        }
    };

    return (
        <div className="p-8 rounded-xl flex flex-col gap-5 bg-white text-black shadow">
            <div className="flex justify-between">
                <div
                    className="group flex gap-1 items-center cursor-pointer"
                    onClick={() => navigate(`/job/${_id}`)}
                >
                    <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
                        {profilePicture ? (
                            <img
                                src={profilePicture}
                                alt={name}
                                width={40}
                                height={40}
                                className="rounded-md object-cover"
                            />
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-gray-500"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
                                />
                            </svg>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <h4 className="group-hover:underline font-bold text-purple-700">
                            {title}
                        </h4>
                        <p className="text-xs text-gray-600">
                            {name}: {applicants.length}{" "}
                            {applicants.length > 1 ? "Applicants" : "Applicant"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
                {jobType.map((type, index) => (
                    <span
                        key={index}
                        className={`py-1 px-3 text-xs font-medium rounded-md border ${jobTypeBg(
                            type
                        )}`}
                    >
                        {type}
                    </span>
                ))}
            </div>

            {/* Cleaned Job Description */}
            <p className="text-sm line-clamp-3">{stripHtmlTags(description)}</p>

            <div className="my-4 border-b border-gray-300"></div>

            <div className="flex justify-between items-center gap-6">
                <p className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={16} />
                    Posted: {formatRelativeTime(createdAt)}
                </p>
            </div>
        </div>
    );
}

export default JobCard;
