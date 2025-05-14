const Button = ({ title, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 
                text-white font-semibold px-6 py-3 rounded-full 
                shadow-md hover:shadow-lg hover:scale-105 
                transition-all duration-300 ease-in-out"
        >
            {title}
        </button>
    );
};

export default Button;
