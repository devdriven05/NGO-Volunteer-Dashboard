import About from "./About";
import Contact from "./Contact";
import Courses from "./Courses";
import Footer from "./Footer";
import Home from "./Home";
import Navbar from './Navbar';
import Reviews from "./Reviews"; // Ensure this is imported

const Mainpage = () => {
    return (
        <>
            <Navbar />
            <main>
                <div id="home">
                    <Home />
                </div>
                <div id="about">
                    <About />
                </div>
                <div id="courses">
                    <Courses />
                </div>
                <div id="reviews">
                    <Reviews />
                </div>
                <div id="contact">
                    <Contact />
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Mainpage;
