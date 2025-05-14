import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-scroll';

const Navbar = () => {
    const [menu, setMenu] = useState(false);

    const handleChange = () => {
        setMenu(!menu);
    };

    const navLinks = ["home", "about", "courses", "reviews", "contact"];

    return (
        <div>
            {/* Navbar Container */}
            <div className="flex flex-row justify-between p-5 md:px-32 bg-white shadow-[0_10px_15px_rgba(0,0,0,0.1)] z-50">
                <div>
                    <Link
                        to="home"
                        spy={true}
                        smooth={true}
                        duration={500}
                        className="font-semibold text-2xl p-1 cursor-pointer text-purple-700"
                    >
                        VolunteerHub
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-6 font-medium p-1 cursor-pointer">
                    {navLinks.map((section) => (
                        <Link
                            key={section}
                            to={section}
                            spy={true}
                            smooth={true}
                            duration={500}
                            className="hover:text-purple-600 hover:underline underline-offset-4 decoration-purple-500 transition-all cursor-pointer"
                        >
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                        </Link>
                    ))}
                </nav>

                {/* Hamburger Icon (Mobile) */}
                <div className="flex md:hidden" onClick={handleChange}>
                    <div className="p-2">
                        <AiOutlineMenu size={24} />
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <div
                className={`${menu ? "translate-x-0" : "-translate-x-full"}
                md:hidden flex flex-col absolute bg-gradient-to-br from-purple-50 to-indigo-100 
                left-0 top-20 font-semibold text-xl text-center pt-8 pb-4 gap-8 
                w-full rounded-b-xl shadow-lg transition-transform duration-300 z-40`}
            >
                {navLinks.map((section) => (
                    <Link
                        key={section}
                        to={section}
                        spy={true}
                        smooth={true}
                        duration={500}
                        onClick={() => setMenu(false)}
                        className="hover:text-purple-700 hover:underline underline-offset-4 decoration-purple-500 transition-all cursor-pointer"
                    >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Navbar;
