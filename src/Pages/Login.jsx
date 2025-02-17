import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import loginImage from "../assets/images/login.jpg";
import { login } from "../Store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, redirect, useNavigate } from "react-router-dom";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { loading } = useSelector(state => state.user)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      const { email, password } = values
      dispatch(login({ email, password }))


    },
  });


  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000)
    }
  }, [user, navigate]);


  return (
    <div className="flex min-h-screen h-[100vh] flex-col md:flex-row">



      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-0 bg-gradient-to-tr from-primary to-white">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg shadow-yellowGlow">
          <h2 className="text-2xl font-semibold text-center text-primary-dark mb-6 font-sans">
            Login
          </h2>

          <form onSubmit={formik.handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary-dark mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${formik.touched.email && formik.errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-neutral focus:ring-primary-light"
                  }`}
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-xs absolute mt-1">
                  {formik.errors.email}
                </p>
              ) : null}
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-primary-dark mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${formik.touched.password && formik.errors.password
                    ? "border-red-500 focus:ring-red-400"
                    : "border-neutral focus:ring-primary-light"
                    }`}
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3 text-primary-dark"
                >
                  {passwordVisible ? "Hide" : "Show"}
                </button>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500 text-xs absolute mt-1">
                  {formik.errors.password}
                </p>
              ) : null}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full py-2"
              disabled={!formik.isValid || formik.isSubmitting || loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
            {/* Don't have an account? */}
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary-dark font-semibold">
                  Sign up here
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>



      <div className="w-full  h-full md:w-1/2 DEFAULT  text-white flex items-center justify-center ">
        <img
          className="h-full w-full object-fill "
          src={loginImage}
          alt="login"
        />
      </div>
    </div>
  );
};

export default Login;
