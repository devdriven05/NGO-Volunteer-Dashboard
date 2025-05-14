import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import MyJobs from "../layout/MyJobs";
import { Context } from "../main";
import Header from "../pages/Header";

const JobsByUser = () => {
  const { user } = useContext(Context);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!user) {
        toast.error("User not found. Please log in.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/user/Jobs/user/${user._id}`,
          { withCredentials: true }
        );

        setJobs(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user]);

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      {/* Banner Section */}
      <section className="bg-gradient-to-r from-[#3b0764] via-[#9333ea] to-[#c084fc] py-16 mt-4">
        <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-4 md:gap-10">
          <div className="text-white md:w-1/2 text-center md:text-left">
            <h2 className="font-bold text-3xl lg:text-4xl leading-tight">
              NGO Volunteer Requirement
            </h2>
            <p className="mt-4 text-lg md:text-xl leading-7 text-slate-100">
              Join hands with us to bring positive change to communities.
              Explore volunteering opportunities and be the force for good.
            </p>
            <a
              className="mt-6 inline-block rounded-md bg-white px-5 py-2.5 text-base font-semibold text-black hover:bg-gray-200 transition focus:outline-none focus:ring focus:border-blue-300"
              href="#"
            >
              Apply to Volunteer Now
            </a>
          </div>

          <div className="mb-8 md:mb-0 md:w-1/2 flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/9235/9235319.png"
              alt="Volunteer Icon"
              className="w-64 h-auto md:w-72 lg:w-80"
            />
          </div>
        </div>
      </section>

      {/* Job Listings - Adjusted for proper card width */}
      <div className="flex-grow px-4 py-10">
        <div className="max-w-7xl mx-auto">
          <MyJobs jobs={jobs} setJobs={setJobs} />
        </div>
      </div>
    </div>
  );
};

export default JobsByUser;