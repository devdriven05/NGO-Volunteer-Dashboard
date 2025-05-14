import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import { Context } from "../main";

const Auth = () => {
  const { isAuthenticated } = useContext(Context);
  const [isLogin, setIsLogin] = useState(true);

  if (isAuthenticated) return <Navigate to={"/home"} />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-800 via-purple-700 to-purple-900 transition-all duration-1000">
      <div className="relative bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-10 w-full max-w-md">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex rounded-full overflow-hidden border border-purple-400">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-6 py-2 text-sm font-semibold transition-colors duration-300 focus:outline-none ${isLogin ? "bg-purple-600 text-white" : "bg-white/20 text-purple-200 hover:bg-purple-500"
              }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-6 py-2 text-sm font-semibold transition-colors duration-300 focus:outline-none ${!isLogin ? "bg-purple-600 text-white" : "bg-white/20 text-purple-200 hover:bg-purple-500"
              }`}
          >
            Register
          </button>
        </div>

        <div className="pt-10">
          {isLogin ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
