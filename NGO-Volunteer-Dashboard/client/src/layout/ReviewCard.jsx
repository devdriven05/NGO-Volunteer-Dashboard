const ReviewCard = (props) => {
    return (
        <div className={`relative w-full md:w-1/3 bg-white 
            border border-purple-200 md:border-none 
            p-5 rounded-xl overflow-hidden 
            transition-all duration-300 ease-in-out 
            hover:bg-gradient-to-br hover:from-purple-100 hover:to-purple-200 
            hover:shadow-[0_4px_20px_rgba(128,90,213,0.25)] 
            group
        `}>
            {/* Inner border effect */}
            <div className="absolute inset-0 rounded-xl border-2 border-purple-100 group-hover:border-purple-300 pointer-events-none z-0"></div>

            <div className="z-10 relative">
                <p className="text-purple-700 text-center mb-4">{props.title}</p>
            </div>

            <div className="flex justify-center z-10 relative">
                <img
                    className="rounded-full w-20 h-20 object-cover border-2 border-purple-200 group-hover:border-purple-400 transition-all duration-300"
                    src={props.img}
                    alt="Reviewer"
                />
            </div>
        </div>
    );
};

export default ReviewCard;
