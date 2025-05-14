import { CheckCircle } from 'lucide-react'; // Importing Lucide React icons
import React from 'react';

const AppliedTable = () => {
    return (
        <div className="overflow-x-auto py-6">
            <table className="min-w-full text-sm text-left text-gray-600 border border-gray-300 rounded-lg shadow-lg">
                <caption className="text-lg font-semibold text-gray-700 mb-4 text-center">
                    A list of your applied jobs
                </caption>

                <thead>
                    <tr className="bg-gray-50 text-gray-700 uppercase text-xs border-b border-gray-300">
                        <th className="py-3 px-6 font-medium">Date</th>
                        <th className="py-3 px-6 font-medium">Job Role</th>
                        <th className="py-3 px-6 font-medium">Company</th>
                        <th className="py-3 px-6 font-medium text-right">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {[1, 2].map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100 transition duration-300">
                            <td className="py-3 px-6">{'17-07-2024'}</td>
                            <td className="py-3 px-6">{'Frontend Developer'}</td>
                            <td className="py-3 px-6">{'Google'}</td>
                            <td className="py-3 px-6 text-right">
                                <span className="bg-green-200 text-green-800 py-1 px-3 rounded-full text-xs font-semibold inline-flex items-center">
                                    <CheckCircle className="mr-1" size={16} />
                                    Selected
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AppliedTable;
