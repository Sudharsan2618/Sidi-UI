import { fetchCourseDetails } from "../Store/coursesSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BookOpen, BarChart, Target, UserCheck, ClipboardList } from "lucide-react";
import placeHolder from "../assets/images/login.svg"

const Enroll = () => {
    const { courseId } = useParams();
    const dispatch = useDispatch();
    const { courseDetails, loading } = useSelector((state) => state.courses);
    const course = courseDetails?.course;

    useEffect(() => {
        if (courseId) {
            dispatch(fetchCourseDetails(courseId));
        }
    }, [dispatch, courseId]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white text-gray-900">
            {/* Breadcrumbs */}
            <nav className="p-4 pl-20 text-sm">
                <Link to="/" className="text-primary hover:underline">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/courses" className="text-primary hover:underline">Courses</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-500">{loading ? <Skeleton width={100} /> : course?.course_name || "Course Name"}</span>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-6 py-16">
                {/* Left Content */}
                <div>
                    <h1 className="text-4xl font-extrabold leading-tight mb-4">
                        {loading ? <Skeleton width={300} /> : course?.course_name || "Course Name"}
                    </h1>
                    <p className="text-lg mb-6">
                        {loading ? <Skeleton count={3} /> : course?.course_description || "Learn valuable skills in this course."}
                    </p>

                    {/* CTA Button */}
                    <div className="mt-6">
                        {loading ? (
                            <Skeleton width={140} height={45} />
                        ) : (
                            <button className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105">
                                Enroll Now
                            </button>
                        )}
                    </div>
                </div>

                {/* Right Content (Course Image) */}
                <div className="flex justify-center">
                    {loading ? (
                        <Skeleton width={400} height={300} />
                    ) : (
                        <img
                            // src={course?.image || "https://via.placeholder.com/400x300"}
                            src={placeHolder}
                            alt="Course Image"
                            className=" w-[30vw]"
                        // className=" w-[30vw] rounded-lg shadow-lg"
                        />
                    )}
                </div>



            </div>
            {/* Course Details */}

            {/* Course Details */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-md font-semibold p-10">
                {[{
                    icon: <BookOpen className="text-primary text-2xl mr-4" />,
                    label: "Level",
                    value: course?.course_level
                }, {
                    icon: <BarChart className="text-primary text-2xl mr-4" />,
                    label: "Type",
                    value: course?.course_type
                }, {
                    icon: <UserCheck className="text-primary text-2xl mr-4" />,
                    label: "Suitable Roles",
                    value: course?.roles
                }, {
                    icon: <Target className="text-primary text-2xl mr-4" />,
                    label: "Objective",
                    value: course?.course_objective
                }, {
                    icon: <ClipboardList className="text-primary text-2xl mr-4" />,
                    label: "Prerequisites",
                    value: course?.pre_requirments
                }].map((item, index) => (
                    <div key={index} className="flex items-start">
                        {item.icon}
                        <div>
                            <h3 className="font-semibold text-gray-700">{item.label}</h3>
                            <p className="text-gray-600">{loading ? <Skeleton width={200} /> : item.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Enroll;
