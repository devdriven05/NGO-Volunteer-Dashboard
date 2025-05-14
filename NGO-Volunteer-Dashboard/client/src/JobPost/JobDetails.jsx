import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function MyEditor({ setJobDescription, jobDescription }) {
    return (
        <ReactQuill
            value={jobDescription}
            onChange={setJobDescription}
            style={{
                minHeight: "400px",
                maxHeight: "900px",
            }}
            modules={{
                toolbar: true,
            }}
            className="custom-quill-editor"
        />
    );
}

function JobDetails({ jobDescription, setJobDescription }) {
    return (
        <div className="p-6 flex flex-col gap-4 bg-white-100 border border-gray-300 rounded-lg">
            <div className="grid grid-cols-2 gap-6">
                <div className="flex-1">
                    <h3 className="text-black font-bold">Volunteer Role Description</h3>
                    <label htmlFor="jobDescription" className="text-white-500 mt-2 block">
                        Provide a detailed description of the volunteer role and responsibilities.
                    </label>
                </div>
                <div className="flex-1">
                    <MyEditor setJobDescription={setJobDescription} jobDescription={jobDescription} />
                </div>
            </div>
        </div>
    );
}

export default JobDetails;
