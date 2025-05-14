
import img1 from '../assets/images/pic1.png'
import img2 from '../assets/images/pic2.png'
import img3 from '../assets/images/pic3.png'
import Heading from "../layout/Heading"
import ReviewCard from '../layout/ReviewCard'


const Reviews = () => {
    return (
        <div className='min-h-[80vh] flex flex-col items-center justify-center md:px-32 px-5'>
            <Heading title1="Our" title2="Reviews" />
            <div className="flex flex-col md:flex-row gap-5 mt-5">
                <ReviewCard img={img1} title="hello" />
                <ReviewCard img={img2} title="hello there" />
                <ReviewCard img={img3} title="hello how are you doing " />

            </div>

        </div>
    )
}

export default Reviews
