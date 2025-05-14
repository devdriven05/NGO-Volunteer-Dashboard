import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";

const Register = () => {
  const { isAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    data.phone = `+91${data.phone}`;
    await axios
      .post("http://localhost:4000/api/v1/user/register", data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        toast.success(res.data.message);
        navigateTo(`/otp-verification/${data.email}/${data.phone}`);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div>
      <form
        className="auth-form space-y-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto"
        onSubmit={handleSubmit((data) => handleRegister(data))}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Register</h2>

        <input
          type="text"
          placeholder="Name"
          required
          {...register("name")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          placeholder="Email"
          required
          {...register("email")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex items-center gap-2">
          <span className="text-gray-700">+91</span>
          <input
            type="number"
            placeholder="Phone"
            required
            {...register("phone")}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <input
          type="password"
          placeholder="Password"
          required
          {...register("password")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="verification-method">
          <p className="text-gray-700 font-medium mb-2">Select Verification Method</p>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                name="verificationMethod"
                value="email"
                {...register("verificationMethod")}
                required
              />
              Email
            </label>
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                name="verificationMethod"
                value="phone"
                {...register("verificationMethod")}
                required
              />
              Phone
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
