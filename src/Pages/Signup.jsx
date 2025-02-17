import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import signUpImage from "../assets/images/login.jpg";
import { signup } from "../Store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


const SignUp = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const { isSigned, loading } = useSelector(state => state.user)
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (isSigned) {
            navigate("/login")
        }
    }, [isSigned])

    // Yup validation schema
    const validationSchema = Yup.object({
        fullName: Yup.string()
            .required("Full name is required")
            .min(3, "Full name must be at least 3 characters"),
        email: Yup.string()
            .required("Email is required")
            .email("Invalid email address"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
        confirmPassword: Yup.string()
            .required("Please confirm your password")
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
    });

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: (values) => {
            const { fullName, email, password } = values
            dispatch(signup({ email, password, username: fullName }))
        },
    });

    return (
        <div className="flex min-h-screen h-[100vh] flex-col md:flex-row">

            <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-0 bg-gradient-to-tr from-primary to-white">
                <div className="w-full max-w-sm p-6 bg-white rounded-lg  shadow-yellowGlow">
                    <h2 className="text-2xl font-semibold text-center text-primary-dark mb-6 font-sans">
                        Sign Up
                    </h2>

                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-4 relative">
                            <label
                                htmlFor="fullName"
                                className="block text-sm font-medium text-primary-dark mb-2"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                className="w-full px-4 py-2 border border-neutral DEFAULT rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
                                placeholder="Enter your full name"
                                {...formik.getFieldProps("fullName")}
                            />
                            {formik.touched.fullName && formik.errors.fullName ? (
                                <div className="text-red-500 text-xs mt-1 absolute bottom-[-25%]">{formik.errors.fullName}</div>
                            ) : null}
                        </div>

                        <div className="mb-4 relative">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-primary-dark mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-2 border border-neutral DEFAULT rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
                                placeholder="Enter your email"
                                {...formik.getFieldProps("email")}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-500 text-xs mt-1 absolute bottom-[-25%]">{formik.errors.email}</div>
                            ) : null}
                        </div>

                        <div className="mb-6 relative">
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
                                    className="w-full px-4 py-2 border border-neutral DEFAULT rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
                                    placeholder="Enter your password"
                                    {...formik.getFieldProps("password")}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-3 text-primary-dark"
                                >
                                </button>
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="text-red-500 text-xs mt-1 absolute bottom-[-40%]">{formik.errors.password}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-primary-dark mb-2"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={confirmPasswordVisible ? "text" : "password"}
                                    id="confirmPassword"
                                    className="w-full px-4 py-2 border border-neutral DEFAULT rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
                                    placeholder="Confirm your password"
                                    {...formik.getFieldProps("confirmPassword")}
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute right-3 top-3 text-primary-dark"
                                >
                                </button>
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                    <div className="text-red-500 text-xs mt-1 absolute bottom-[-40%]">{formik.errors.confirmPassword}</div>
                                ) : null}
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="btn btn-primary w-full py-2">
                            {loading ? "Loading..." : "Sign Up"}
                        </button>
                        {/* Already have an account? */}
                        <div className="mt-4 text-center">
                            <span className="text-sm text-gray-600">
                                Already have an account?{" "}
                                <Link to="/login" className="text-primary-dark font-semibold">
                                    Log in here
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>

            <div className="w-full h-full md:w-1/2 DEFAULT text-white flex items-center justify-center">
                <img
                    className="h-full w-full object-fill"
                    src={signUpImage}
                    alt="sign up"
                />
            </div>
        </div>
    );
};

export default SignUp;
