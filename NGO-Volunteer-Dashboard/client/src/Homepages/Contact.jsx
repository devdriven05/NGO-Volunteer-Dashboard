import img from '../assets/contact.svg';
import Button from '../layout/Button';
import Heading from '../layout/Heading';

const Contact = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center md:mx-32 mx-5 mt-10">
            <Heading title1="Contact" title2="Us" />
            <div className="flex flex-col md:flex-row justify-between w-full">
                {/* Form Section */}
                <form className="w-full md:w-2/5 space-y-5 pt-20">
                    <div className="flex flex-col">
                        <label htmlFor="username" className="text-purple-800 font-semibold mb-1">Your Name</label>
                        <input
                            className="py-3 px-4 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 
                            hover:shadow-[0_3px_8px_rgba(128,90,213,0.2)] transition-all duration-300"
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="userEmail" className="text-purple-800 font-semibold mb-1">Your Email</label>
                        <input
                            className="py-3 px-4 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 
                            hover:shadow-[0_3px_8px_rgba(128,90,213,0.2)] transition-all duration-300"
                            type="email"
                            name="userEmail"
                            id="userEmail"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="userNumber" className="text-purple-800 font-semibold mb-1">Your Number</label>
                        <input
                            className="py-3 px-4 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 
                            hover:shadow-[0_3px_8px_rgba(128,90,213,0.2)] transition-all duration-300"
                            type="tel"
                            name="userNumber"
                            id="userNumber"
                            placeholder="Enter your number"
                        />
                    </div>
                    <div className="flex flex-row justify-center pt-4">
                        <Button title="Send Message" />
                    </div>
                </form>

                {/* Image Section */}
                <div className="w-full md:w-2/4 flex items-center justify-center mt-10 md:mt-0">
                    <img src={img} alt="Contact Illustration" className="w-full max-w-md object-contain" />
                </div>
            </div>
        </div>
    );
};

export default Contact;
