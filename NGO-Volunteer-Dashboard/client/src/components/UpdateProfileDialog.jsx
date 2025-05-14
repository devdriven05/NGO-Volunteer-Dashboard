import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Context } from '../main';

const UpdateProfileDialog = ({ open, setOpen }) => {
    if (!open) return null;
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(false);

    const [input, setInput] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        bio: user?.bio || '',
        skills: user?.profile?.skills?.join(', ') || '',
        file: user?.profile?.resume || ''
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("email", input.email);
        formData.append("phone", input.phone);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            const res = await axios.post(`http://localhost:4000/api/v1/user/update/profile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
        setOpen(false);
        console.log(input);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-3xl shadow-xl space-y-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Update Profile</h2>
                    <button
                        onClick={() => setOpen(false)}
                        className="text-gray-600 hover:text-gray-800 transition duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={submitHandler}>
                    <div className="space-y-6">
                        <div className="grid grid-cols-4 items-center gap-6">
                            <label htmlFor="name" className="text-right text-gray-700 font-medium">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="col-span-3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-6">
                            <label htmlFor="email" className="text-right text-gray-700 font-medium">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="col-span-3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                value={input.email}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-6">
                            <label htmlFor="phone" className="text-right text-gray-700 font-medium">Phone</label>
                            <input
                                id="phone"
                                name="phone"
                                type="text"
                                className="col-span-3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                value={input.phone}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-6">
                            <label htmlFor="bio" className="text-right text-gray-700 font-medium">Bio</label>
                            <textarea
                                id="bio"
                                name="bio"
                                rows="3"
                                className="col-span-3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                value={input.bio}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-6">
                            <label htmlFor="skills" className="text-right text-gray-700 font-medium">Skills</label>
                            <input
                                id="skills"
                                name="skills"
                                type="text"
                                className="col-span-3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                value={input.skills}
                                onChange={changeEventHandler}
                                placeholder="Enter skills separated by commas"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-6">
                            <label htmlFor="file" className="text-right text-gray-700 font-medium">Resume</label>
                            <input
                                id="file"
                                name="file"
                                type="file"
                                accept="application/pdf"
                                className="col-span-3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                onChange={fileChangeHandler}
                            />
                        </div>

                        <div className="flex justify-end gap-4 pt-6">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="px-6 py-3 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfileDialog;
