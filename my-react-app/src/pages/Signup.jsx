// import { Link } from "react-router-dom";

// function Signup() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 relative overflow-hidden">

//       {/* Glow */}
//       <div className="absolute top-10 right-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-40 animate-pulse"></div>
//       <div className="absolute bottom-10 left-20 w-28 h-28 bg-purple-500 rounded-full blur-3xl opacity-40 animate-pulse"></div>

//       {/* Card */}
//       <div className="backdrop-blur-lg bg-white/30 rounded-3xl shadow-2xl p-10 w-[900px] flex gap-16">

//         {/* LEFT */}
//         <div className="flex-1 flex flex-col items-center text-center">
//           <h2 className="text-3xl font-bold mb-6 text-black">Sign Up</h2>

//           <div className="flex flex-col gap-4">
//             <input type="text" placeholder="Full Name" className="w-full max-w-xs p-3 rounded-full bg-white/80 outline-none focus:ring-2 focus:ring-purple-400" />
//             <input type="email" placeholder="Email Address" className="w-full max-w-xs p-3 rounded-full bg-white/80 outline-none focus:ring-2 focus:ring-purple-400" />
//             <input type="password" placeholder="Password" className="w-full max-w-xs p-3 rounded-full bg-white/80 outline-none focus:ring-2 focus:ring-purple-400" />
//             <input type="password" placeholder="Confirm Password" className="w-full max-w-xs p-3 rounded-full bg-white/80 outline-none focus:ring-2 focus:ring-purple-400" />
//           </div>
//         </div>

//         {/* RIGHT */}
//         {/* <div className="flex-1 flex flex-col justify-center items-center"> */}
//         <div className="flex-1 flex flex-col justify-center items-center text-center">
          
//           <button className="bg-black text-white px-10 py-3 rounded-full w-full mb-4 transition hover:scale-105 active:scale-95">
//             Sign Up
//           </button>

//           <p className="text-sm text-gray-700 mb-4">
//             Already have an account?{" "}
//             <Link to="/login" className="font-semibold hover:underline">
//               Log in
//             </Link>
//           </p>

//           <p className="text-gray-600 mb-3">Or</p>

//           {/* Google */}
//           <button className="w-full border rounded-full py-2 mb-3 bg-white flex items-center justify-center gap-2 transition hover:scale-105 active:scale-95">
//             {/* <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" className="w-5"  /> */}
//             <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" style={{ width: "21px", height: "21px" }} />
//             Sign up with Google
//           </button>

//           {/* GitHub */}
//           <button className="w-full border rounded-full py-2 bg-white flex items-center justify-center gap-2 transition hover:scale-105 active:scale-95">
//             <img src="https://images.icon-icons.com/3685/PNG/512/github_logo_icon_229278.png" className="w-5" style={{ width: "21px", height: "21px" }}/>
//             Sign up with GitHub
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;

// ----------------------------------------------------------------


import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 relative overflow-hidden p-4">

      {/* Glow Effects */}
      <div className="absolute top-10 right-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 left-20 w-28 h-28 bg-purple-500 rounded-full blur-3xl opacity-40 animate-pulse"></div>

      {/* Card - Reduced width to 450px and changed to vertical flex */}
      <div className="backdrop-blur-lg bg-white/30 rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-[450px] flex flex-col gap-6">

        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2 text-black">Sign Up</h2>
          <p className="text-sm text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>

        {/* Inputs Section */}
        <div className="flex flex-col gap-4">
          <input type="text" placeholder="Full Name" className="w-full p-3 rounded-full bg-white/80 outline-none focus:ring-2 focus:ring-purple-400" />
          <input type="email" placeholder="Email Address" className="w-full p-3 rounded-full bg-white/80 outline-none focus:ring-2 focus:ring-purple-400" />
          <input type="password" placeholder="Password" className="w-full p-3 rounded-full bg-white/80 outline-none focus:ring-2 focus:ring-purple-400" />
          <input type="password" placeholder="Confirm Password" className="w-full p-3 rounded-full bg-white/80 outline-none focus:ring-2 focus:ring-purple-400" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center text-center">
          <button className="bg-black text-white px-10 py-3 rounded-full w-full mb-4 font-semibold transition hover:scale-105 active:scale-95">
            Sign Up
          </button>

          <div className="flex items-center w-full gap-2 mb-4">
            <div className="h-[1px] bg-gray-400 flex-1"></div>
            <span className="text-gray-600 text-sm">Or</span>
            <div className="h-[1px] bg-gray-400 flex-1"></div>
          </div>

          {/* Social Buttons */}
          <button className="w-full border border-gray-200 rounded-full py-2.5 mb-3 bg-white flex items-center justify-center gap-3 transition hover:scale-105 active:scale-95 shadow-sm">
            <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" className="w-5 h-5" alt="Google" style={{ width: "21px", height: "21px" }} />
            <span className="text-sm font-medium">Sign up with Google</span>
          </button>

          <button className="w-full border border-gray-200 rounded-full py-2.5 bg-white flex items-center justify-center gap-3 transition hover:scale-105 active:scale-95 shadow-sm">
            <img src="https://images.icon-icons.com/3685/PNG/512/github_logo_icon_229278.png" className="w-5 h-5" alt="GitHub" style={{ width: "21px", height: "21px" }} />
            <span className="text-sm font-medium">Sign up with GitHub</span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default Signup;