import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // 1. Import Axios
import img from "../assets/photo.png";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // 2. Access the Environment Variable
  const API_URL = import.meta.env.VITE_API_URL;

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(8, "8 characters minimum")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        // 3. Use Axios instead of Fetch
        // Axios handles JSON conversion and headers automatically
        const response = await axios.post(`${API_URL}/owner/login`, values);

        // Axios stores the response body in '.data'
        const data = response.data;

        if (data.success) {
          localStorage.setItem("ownerName", data.user.fullName);
          localStorage.setItem("ownerRole", data.user.role);
          navigate("/customer");
        } else {
          alert(data.message);
        }
      } catch (err) {
        // 4. Improved Error Handling
        if (err.response) {
          // Server responded with an error (e.g., 401 Unauthorized)
          alert(err.response.data.message || "Invalid Login");
        } else {
          // Network error or server is down
          alert("Backend server is not responding. Check your network.");
        }
      }
    },
  });

  return (
    <>
      <div className="w-full h-[5vh] bg-[#051320] border-b-[#2C3E4A] border-b-[0.1vw]"></div>
      <div className="relative min-h-screen max-h-screen w-full flex flex-col md:flex-row bg-[#051320] overflow-hidden selection:bg-[#8EDCE6]/30">
        
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 25% 50%, rgba(142, 220, 230, 0.06) 0%, transparent 40%)`,
          }}
        />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-[3vh] left-[2vw] z-50 flex items-center text-[#8EDCE6] hover:opacity-70 transition-all"
        >
          <span className="text-[1.5vw] mr-[0.5vw] font-light">←</span>
          <span className="text-[0.9vw]">Back</span>
        </button>

        <div className="flex-1 flex items-center justify-center z-10 p-[2vw]">
          <div
            className="w-full max-w-[30vw] px-[3vw] py-[5vh] rounded-[0.4vw] border border-white/[0.06]"
            style={{
              background: "rgba(10, 31, 50, 0.94)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            }}
          >
            <h1 className="text-[2vw] font-semibold text-white text-center mb-[1vh]">
              Login
            </h1>
            <p className="text-[#94A3B8] text-center text-[0.85vw] mb-[4vh]">
              Enter your login credentials to login with us
            </p>

            <form onSubmit={formik.handleSubmit} className="space-y-[2.5vh]">
              <div>
                <label className="block text-[0.85vw] text-gray-200 mb-[1vh] ml-[0.2vw]">
                  Email ID
                </label>
                <input
                  type="email"
                  placeholder="Enter Email ID"
                  {...formik.getFieldProps("email")}
                  className="w-full px-[1.2vw] py-[1.5vh] bg-[#071b28] border border-white/[0.08] rounded-[0.3vw] text-white placeholder:text-gray-500 focus:outline-none focus:border-[#8EDCE6]/50 transition-all text-[0.9vw]"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-400 text-[0.7vw] mt-[0.5vh] ml-[0.2vw]">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div className="relative">
                <label className="block text-[0.85vw] text-gray-200 mb-[1vh] ml-[0.2vw]">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter 8 Digit Password"
                    {...formik.getFieldProps("password")}
                    className="w-full px-[1.2vw] py-[1.5vh] bg-[#071b28] border border-white/[0.08] rounded-[0.3vw] text-white placeholder:text-gray-500 focus:outline-none focus:border-[#8EDCE6]/50 transition-all text-[0.9vw]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-[1vw] top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#8EDCE6] transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-[1.2vw] h-[1.2vw]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg className="w-[1.2vw] h-[1.2vw]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-400 text-[0.7vw] mt-[0.5vh] ml-[0.2vw]">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <div className="text-right">
                <button type="button" className="text-[0.8vw] text-[#8EDCE6] hover:underline">
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-[1.8vh] bg-[#8EDCE6] text-[#051320] font-bold rounded-[0.3vw] text-[0.9vw] hover:bg-[#a6f1fa] active:scale-[0.99] transition-all mt-[2vh]"
              >
                Login
              </button>
            </form>

            <div className="text-center text-[0.85vw] mt-[4vh] text-gray-400">
              Don’t have an Account?{" "}
              <button className="text-[#8EDCE6] hover:underline ml-[0.2vw]">
                Register
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:flex w-1/2 h-screen items-center justify-end pr-[2vw] ">
          <div className="w-[45vw] overflow-hidden shadow-2xl">
            <img src={img} alt="Service" className="w-full h-screen object-cover" />
          </div>
        </div>
      </div>
    </>
  );
}