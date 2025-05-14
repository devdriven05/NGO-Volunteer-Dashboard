
import appImg from '../assets/App-dev.svg'
import digitalImg from '../assets/digital.svg'
import graphicImg from '../assets/graphic.svg'
import webImg from '../assets/web-dev.svg'
import CoursesCard from '../layout/CoursesCard'
import Heading from '../layout/Heading'
const Courses = () => {
    return (
        <div className="min-h-screen flex flex-col items-center md:px-32 px-5 my-10">
            <Heading title1="Our" title2="courses" />
            <div className="flex flex-wrap justify-center gap-6 mt-6">
                <CoursesCard img={webImg} title="Volunteer Recruitment" title2="Find and onboard passionate volunteers" />
                <CoursesCard img={appImg} title="Volunteer Engagement" title2="Keep volunteerss motivated and involved" />

                <CoursesCard img={graphicImg} title="Volunteer Training" title2="Equip volunteers with essential skills" />
                <CoursesCard img={digitalImg} title="Impact Tracking" title2="Measure and analyze volunteer impact" />


            </div>
        </div>

    )
}

export default Courses