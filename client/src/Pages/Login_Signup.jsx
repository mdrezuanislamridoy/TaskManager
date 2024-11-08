import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/ContextProvider";

export default function LoginSignup() {
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState("");
  const { name, setName, email, setEmail, password, setPassword } =
    useContext(Context);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleLogSign();
  };

  const handleLogSign = async () => {
    if (isSignup) {
      try {
        const response = await axios.post(
          "http://localhost:3003/api/user/signup",
          { name, email, password }
        );
        setMessage(response.data.message);
        setIsSignup(false);
        navigate("/login");
      } catch (error) {
        setMessage(
          error.response?.data?.message || "Signup failed. Please try again."
        );
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3003/api/user/login",
          { email, password }
        );
        setMessage(response.data.message);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } catch (error) {
        setMessage(error.response?.data || "Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="relative py-16 bg-gradient-to-br from-sky-50 to-gray-200">
      <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
        <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
          <div className="rounded-xl bg-white shadow-xl">
            <div className="p-6 sm:p-16">
              <div className="space-y-4">
                <h2 className="font-bold text-2xl">RR-CODER</h2>
                <h2 className="mb-8 text-2xl text-customGray font-bold">
                  {isSignup ? "Create your account" : "Log in to your account"}
                </h2>
              </div>

              <p>{message}</p>

              <div className="mt-8">
                <button className="group h-12 w-full px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                  <div className="relative flex items-center space-x-4 justify-center">
                    <img
                      src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                      className="absolute left-0 w-5"
                      alt="Google logo"
                    />
                    <span className="block font-semibold text-gray-700">
                      Continue with Google
                    </span>
                  </div>
                </button>
              </div>

              <p className="text-center my-4">OR</p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                {isSignup && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full h-12 px-4 border border-gray-300 rounded-full focus:outline-none"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-12 px-4 border border-gray-300 rounded-full focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-12 px-4 border border-gray-300 rounded-full focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-12 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600"
                >
                  {isSignup ? "Sign Up" : "Log In"}
                </button>
              </form>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  {isSignup
                    ? "Already have an account?"
                    : "Don't have an account?"}{" "}
                  <button
                    onClick={toggleForm}
                    className="text-blue-600 underline"
                  >
                    {isSignup ? "Log In" : "Sign Up"}
                  </button>
                </p>
              </div>

              <div className="mt-10 space-y-4 text-gray-600 text-center sm:-mb-8">
                <p className="text-xs">
                  By proceeding, you agree to our{" "}
                  <a href="#" className="underline">
                    Terms of Use
                  </a>{" "}
                  and confirm you have read our{" "}
                  <a href="#" className="underline">
                    Privacy and Cookie Statement
                  </a>
                  .
                </p>
                <p className="text-xs">
                  This site is protected by reCAPTCHA and the{" "}
                  <a href="#" className="underline">
                    Google Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="underline">
                    Terms of Service
                  </a>{" "}
                  apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
