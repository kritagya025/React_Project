import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to from-indigo-400 via-purple-400 to-blue-400 relative overflow-hidden px-4">

      {/* Glow Effects */}
      <div className="absolute top-10 right-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 left-20 w-28 h-28 bg-purple-500 rounded-full blur-3xl opacity-40 animate-pulse"></div>

      {/* Signup Card */}
      <div className="relative z-10 backdrop-blur-lg bg-white/30 rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-md flex flex-col gap-6">

        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2 text-black">
            Sign Up
          </h2>

          <p className="text-sm text-gray-700">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-black hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-full bg-white/80 outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-full bg-white/80 outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-full bg-white/80 outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 rounded-full bg-white/80 outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center">
          <button className="w-full bg-black text-white py-3 rounded-full font-semibold transition duration-300 hover:scale-105 active:scale-95">
            Sign Up
          </button>

          {/* Divider */}
          <div className="flex items-center w-full gap-3 my-4">
            <div className="h-[1px]bg-gray-400 flex-1"></div>
            <span className="text-gray-600 text-sm">Or</span>
            <div className="h-[1px]bg-gray-400 flex-1"></div>
          </div>

          {/* Google Button */}
          <button className="w-full border border-gray-200 rounded-full py-3 mb-3 bg-white flex items-center justify-center gap-3 transition duration-300 hover:scale-105 active:scale-95 shadow-sm">
            <img
              src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
              className="w-5 h-5"
              alt="Google"
            />
            <span className="text-sm font-medium">
              Sign up with Google
            </span>
          </button>

          {/* GitHub Button */}
          <button className="w-full border border-gray-200 rounded-full py-3 bg-white flex items-center justify-center gap-3 transition duration-300 hover:scale-105 active:scale-95 shadow-sm">
            <img
              src="https://images.icon-icons.com/3685/PNG/512/github_logo_icon_229278.png"
              className="w-5 h-5"
              alt="GitHub"
            />
            <span className="text-sm font-medium">
              Sign up with GitHub
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;