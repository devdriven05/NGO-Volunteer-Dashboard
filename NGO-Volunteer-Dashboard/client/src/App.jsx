import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AllData from "./components/AllData";
import FindWork from "./components/FindWork";
import JobDetailView from "./components/JobDetailView";
import MyJob from "./components/MyJob";
import NGOProjectsPage from "./components/NGOProjectsPage";
import Posts from "./components/post"; // Ensure component name starts with uppercase
import Profile from "./components/profile";

import Mainpage from "./Homepages/Mainpage";
import { Context } from "./main";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import OtpVerification from "./pages/OtpVerification";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  const { setIsAuthenticated, setUser } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/user/me", {
          withCredentials: true,
        });
        setUser(data.user);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [setUser, setIsAuthenticated]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Mainpage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/otp-verification/:email/:phone" element={<OtpVerification />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        {/* Unprotected Routes */}
        <Route path="/AllData" element={<AllData />} />
        <Route path="/findWork" element={<FindWork />} />
        <Route path="/post" element={<Posts />} /> {/* Corrected component name */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/myjobs" element={<MyJob />} />

        <Route path="/job/:jobId" element={<JobDetailView />} />
        <Route path="NGO" element={<NGOProjectsPage />} />

      </Routes>

      <ToastContainer theme="colored" />
    </Router>
  );
};

export default App;
