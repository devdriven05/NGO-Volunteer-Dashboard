const CoursesCard = (props) => {
    return (
        <div className={`relative flex flex-col items-center justify-between 
            bg-white border border-purple-200 md:border-none 
            p-5 cursor-pointer rounded-xl overflow-hidden 
            transition-all duration-300 ease-in-out
            hover:bg-gradient-to-br hover:from-purple-100 hover:to-purple-200
            hover:shadow-[0_4px_20px_rgba(128,90,213,0.25)]
            ${props.className || 'md:w-2/5'} group
        `}>
            {/* Inner border for purple theme */}
            <div className="absolute inset-0 rounded-xl border-2 border-purple-100 group-hover:border-purple-300 pointer-events-none z-0"></div>

            <div className="w-3/5 z-10">
                <img
                    src={props.img}
                    alt={props.title || "Course icon"}
                    className={`${props.imgClass || ''} hover:scale-105 transition-transform duration-300`}
                />
            </div>

            <div className="w-full z-10 mt-4 text-center md:text-left">
                <h3 className="font-semibold text-lg my-3 text-purple-800">{props.title}</h3>
                <p className="text-purple-600">{props.title2}</p>
            </div>
        </div>
    );
};

export default CoursesCard;
