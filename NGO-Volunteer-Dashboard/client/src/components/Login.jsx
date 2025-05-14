import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";

const Login = () => {
  const { setIsAuthenticated, setUser } = useContext(Context);
  const navigateTo = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    await axios
      .post("http://localhost:4000/api/v1/user/login", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(true);
        setUser(res.data.user);
        navigateTo("/home");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <form
        className="backdrop-blur-md bg-gradient-to-br from-purple-700/30 to-purple-900/30 
                   border border-white/30 text-white p-8 rounded-xl shadow-xl 
                   w-full max-w-md mx-auto mt-10 space-y-4"
        onSubmit={handleSubmit((data) => handleLogin(data))}
      >
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          required
          {...register("email")}
          className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-white 
                     focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <input
          type="password"
          placeholder="Password"
          required
          {...register("password")}
          className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-white 
                     focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <p className="text-sm text-right">
          <Link to={"/password/forgot"} className="text-purple-300 hover:underline">
            Forgot your password?
          </Link>
        </p>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 transition duration-300 
                     text-white py-2 rounded-md"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
