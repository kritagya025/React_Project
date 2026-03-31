import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../Styles/Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 relative overflow-hidden p-4">
      
      {/* Glow Effects */}
      <div className="absolute top-10 right-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 left-20 w-28 h-28 bg-purple-500 rounded-full blur-3xl opacity-40 animate-pulse"></div>

      {/* Login Card */}
      <div className="relative z-10 backdrop-blur-lg bg-white/30 rounded-3xl shadow-2xl p-6 md:p-10 w-full max-w-md transition duration-500 hover:scale-[1.01]">

        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-black mb-4">
          Welcome
        </h2>

        <p className="text-center text-gray-700 mb-6">
          Login to continue your journey with{" "}
          <span className="font-semibold">IdeaForge</span>
        </p>

        {/* Form */}
        <div className="flex flex-col gap-4">

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email Address"
            onFocus={() =>
              setIsFocused({ ...isFocused, email: true })
            }
            onBlur={() =>
              setIsFocused({ ...isFocused, email: false })
            }
            className={`w-full px-4 py-3 rounded-full bg-white/80 outline-none transition duration-300
              ${
                isFocused.email
                  ? "ring-2 ring-purple-500 scale-[1.01]"
                  : ""
              }
            `}
          />

          {/* Password Input */}


<div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    onFocus={() =>
      setIsFocused({
        ...isFocused,
        password: true,
      })
    }
    onBlur={() =>
      setIsFocused({
        ...isFocused,
        password: false,
      })
    }
    className={`w-full px-4 py-3 rounded-full bg-white/80 outline-none pr-12 transition duration-300
      ${
        isFocused.password
          ? "ring-2 ring-purple-500 scale-[1.01]"
          : ""
      }
    `}
  />

  <span
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 hover:text-black transition duration-300"
  >
    {showPassword ? (
      <FaEyeSlash size={18} />
    ) : (
      <FaEye size={18} />
    )}
  </span>
</div>







{/* 
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onFocus={() =>
                setIsFocused({
                  ...isFocused,
                  password: true,
                })
              }
              onBlur={() =>
                setIsFocused({
                  ...isFocused,
                  password: false,
                })
              }
              className={`w-full px-4 py-3 rounded-full bg-white/80 outline-none pr-14 transition duration-300
                ${
                  isFocused.password
                    ? "ring-2 ring-purple-500 scale-[1.01]"
                    : ""
                }
              `}
            /> */}

            {/* Eye Button
            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black transition duration-300"
            >
              {showPassword ? (
                <FaEyeSlash size={18} />
              ) : (
                <FaEye size={18} />
              )}
            </button>
          </div> */}

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-700 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button className="bg-black text-white py-3 rounded-full w-full font-semibold transition duration-300 hover:scale-105 hover:shadow-xl active:scale-95">
            Login
          </button>

          {/* Signup Redirect */}
          <p className="text-center text-gray-700 mt-2">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-blue-700 hover:underline"
            >
              Sign up
            </Link>
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 my-3">
            <div className="flex-1 h-[1px] bg-gray-400"></div>
            <span className="text-gray-700 text-sm">OR</span>
            <div className="flex-1 h-[1px] bg-gray-400"></div>
          </div>

          {/* Google Login */}
          <button className="w-full border rounded-full py-3 bg-white flex items-center justify-center gap-2 transition duration-300 hover:scale-105 hover:shadow-lg active:scale-95">
            <img
              src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
              className="w-5 h-5 object-contain"
              alt="Google"
            />
            <span className="font-medium">
              Continue with Google
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;