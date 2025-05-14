import { Link } from 'react-scroll';
import img from '../assets/AboutUS.jpg';
import Heading from '../layout/Heading';

const About = () => {
    return (
        <div className="min-h-screen flex flex-col-reverse md:flex-row items-center gap-12 md:mx-32 mx-5 mt-14">
            {/* Image Section */}
            <div className="w-full md:w-2/4 flex justify-center">
                <img
                    src={img}
                    alt="Service professionals at work"
                    className="w-full max-w-lg rounded-xl object-cover border-4 border-white"
                />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-2/4 text-center space-y-8">
                <Heading title1="About" title2="Us?" />

                <p className="text-gray-700 text-start text-lg leading-relaxed">
                    ServiceHub connects skilled service providers with customers seeking reliable professionals. Our platform makes it easier for painters, carpenters, electricians, and other experts to showcase their work and connect with clients in need of their services. Whether you are a service provider looking to expand your reach or a customer searching for trusted professionals, ServiceHub ensures a seamless experience.
                </p>

                <Link
                    to="contact"
                    spy={true}
                    smooth={true}
                    duration={500}
                    className="inline-block px-10 py-4 text-lg font-bold rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
                >
                    Contact Us
                </Link>
            </div>
        </div>
    );
};

export default About;