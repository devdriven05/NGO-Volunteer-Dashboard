import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaBars, FaXmark } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    const logout = async () => {
        try {
            const res = await axios.get("/api/v1/user/logout", {
                withCredentials: true,
            });
            toast.success(res.data.message);
            setUser(null);
            setIsAuthenticated(false);
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || "Logout failed");
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7263F3]"></div>
            </div>
        );
    }

    const navItems = [
        { path: "/home", label: "Home" },
        { path: "/findWork", label: "Find Work" },
        { path: "/post", label: "Post a Job" },
        { path: "/myjobs", label: "My Jobs" },
        { path: "/NGO", label: " Projects" },

    ];

    return (
        <>
            <div className="pt-20">
                <nav className="bg-white md:px-10 px-4 py-4 max-w-screen-2xl mx-auto text-primary fixed top-0 right-0 left-0 z-50 shadow">
                    <div className="container mx-auto flex justify-between items-center font-medium text-sm">
                        {/* Logo - larger text, reduced spacing */}
                        <Link to="/" className="flex items-center space-x-2">
                            <img
                                src="https://www.cellcom.com/sites/default/files/2024-07/heart-hands.png"
                                alt="logo"
                                className="w-8 h-8"
                            />
                            <span className="text-black text-2xl font-bold">VolunteerHUB</span>
                        </Link>

                        {/* Desktop Nav */}
                        <ul className="md:flex space-x-8 hidden">
                            {navItems.map(({ label, path }) => (
                                <li key={path}>
                                    <Link
                                        to={path}
                                        className={`py-2 px-3 relative ${location.pathname === path ? "text-[#7263F3]" : "text-gray-700"
                                            } group text-sm`}
                                    >
                                        {label}
                                        <span className="absolute left-0 bottom-0 w-full h-1 rounded bg-gradient-to-r from-pink-400 to-pink-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Desktop Icons */}
                        <div className="space-x-3 hidden md:flex items-center text-sm">
                            <Link to="/profile" className="text-black">
                                <FaUser className="text-lg" />
                            </Link>
                            <button
                                onClick={logout}
                                className="text-black border border-black py-1 px-2 rounded flex items-center"
                            >
                                <FiLogOut className="text-lg" />
                            </button>
                        </div>

                        {/* Mobile Toggle */}
                        <div className="md:hidden">
                            <button onClick={toggleMenu} className="focus:outline-none">
                                {isMenuOpen ? (
                                    <FaXmark className="w-6 h-6 text-black" />
                                ) : (
                                    <FaBars className="w-6 h-6 text-black" />
                                )}
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div
                    className={`space-y-4 px-4 pt-24 pb-5 bg-white shadow-md md:hidden ${isMenuOpen ? "block fixed top-0 right-0 left-0 z-40" : "hidden"
                        }`}
                >
                    {navItems.map(({ label, path }) => (
                        <Link
                            key={path}
                            to={path}
                            onClick={() => setIsMenuOpen(false)}
                            className={`block py-2 px-4 text-sm ${location.pathname === path ? "text-[#7263F3]" : "text-gray-700"
                                }`}
                        >
                            {label}
                        </Link>
                    ))}
                    <Link
                        to="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 px-4 text-black text-sm"
                    >
                        <FaUser />
                    </Link>
                    <button
                        onClick={() => {
                            setIsMenuOpen(false);
                            logout();
                        }}
                        className="w-full text-left py-2 px-4 text-black text-sm"
                    >
                        <FiLogOut />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Header;
