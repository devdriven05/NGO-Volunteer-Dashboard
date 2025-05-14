import { Link } from 'react-router-dom';
import img from "../assets/home-image.webp";

const Home = () => {
    return (
        <div className="min-h-[70vh] flex flex-col md:flex-row md:justify-between items-center md:mx-32 mx-5 mt-10 gap-12">
            {/* Text Content */}
            <div className="md:w-2/4 text-center space-y-8">
                <h1 className="text-5xl font-bold leading-tight bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">
                    Empower Change with <span className="block">VolunteerHub</span>
                </h1>

                <p className="text-gray-700 mt-5 text-start text-lg leading-relaxed">
                    Unlock endless opportunities to make a difference with our innovative volunteer management platform.
                    Connect with like-minded changemakers and discover meaningful ways to contribute to your community.
                </p>

                <Link
                    to="/auth"
                    className="inline-block px-10 py-4 text-lg font-bold rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
                >
                    Get Started - Join Free
                </Link>
            </div>

            {/* Image - Increased size */}
            <div className="w-full md:w-2/4 flex justify-center">
                <img
                    src={img}
                    alt="Volunteers working together"
                    className="w-full max-w-lg rounded-xl object-cover border-4 border-white"
                />
            </div>
        </div>
    );
};

export default Home;