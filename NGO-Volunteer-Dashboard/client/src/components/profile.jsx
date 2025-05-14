import { Edit, Mail, Phone } from "lucide-react";
import { useContext, useState } from "react";
import { Context } from "../main";
import Header from "../pages/Header";
import UpdateProfileDialog from "./UpdateProfileDialog";

const Profile = () => {
    const [open, setOpen] = useState(false);
    const { user } = useContext(Context);

    const fullName = user?.name || "User";
    const bio = user?.profile?.bio || "No bio available.";
    const email = user?.email || "No email";
    const phone = user?.phone || "No phone number";
    const skills = user?.profile?.skills || [];
    const resumeLink = user?.profile?.resume;
    const resumeName = user?.profile?.resumeOriginalName || "Resume";

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300">
            <Header />

            <div className="flex justify-center items-start px-4 py-10">
                <div className="w-full max-w-6xl bg-white border border-purple-200 rounded-2xl shadow-xl p-8 relative">

                    {/* Edit Button */}
                    <button
                        onClick={() => setOpen(true)}
                        className="absolute top-4 right-4 text-purple-500 hover:text-purple-700 transition-colors"
                    >
                        <Edit size={22} />
                    </button>

                    {/* Profile Info */}
                    <div className="flex flex-col md:flex-row md:items-start md:space-x-10 space-y-6 md:space-y-0">
                        <div className="h-28 w-28 rounded-full bg-gradient-to-br from-purple-200 to-purple-400 flex items-center justify-center text-3xl font-bold text-white shadow-inner">
                            {fullName.split(" ").map(word => word[0]).join("").substring(0, 2).toUpperCase()}
                        </div>

                        <div className="flex-1 space-y-6">
                            {/* Name and Bio */}
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">{fullName}</h1>
                                <p className="text-gray-600 mt-2">{bio}</p>
                            </div>

                            {/* Email */}
                            <div className="flex items-center space-x-3 text-gray-700">
                                <Mail size={18} className="text-purple-600" />
                                <span>{email}</span>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center space-x-3 text-gray-700">
                                <Phone size={18} className="text-purple-600" />
                                <span>{phone}</span>
                            </div>

                            {/* Skills */}
                            <div>
                                <h2 className="font-semibold text-gray-700 mb-2">Skills</h2>
                                <div className="flex flex-wrap gap-2">
                                    {skills.length > 0 ? (
                                        skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="inline-block bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full"
                                            >
                                                {skill}
                                            </span>
                                        ))
                                    ) : (
                                        <span>NA</span>
                                    )}
                                </div>
                            </div>

                            {/* Resume */}
                            <div>
                                <label className="block text-md font-bold text-gray-700 mb-1">Resume</label>
                                {resumeLink ? (
                                    <a
                                        href={resumeLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-purple-600 hover:underline"
                                    >
                                        {resumeName}
                                    </a>
                                ) : (
                                    <span>NA</span>
                                )}
                            </div>

                            <UpdateProfileDialog open={open} setOpen={setOpen} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
