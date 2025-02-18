import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../Store/coursesSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CourseCard from "../Components/CourseCard";

const Courses = () => {
    const { courses: coursesData, loading } = useSelector((state) => state.courses);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCourses());
    }, []);

    useEffect(() => {
        setFilteredCourses(coursesData)
    }, [coursesData])

    const [filteredCourses, setFilteredCourses] = useState(coursesData);
    const totalCourses = coursesData.length;
    const activeCourses = coursesData.filter((course) => course.course_status === "active").length;
    const [statusFilter, setStatusFilter] = useState("All Courses");
    const [typeFilter, setTypeFilter] = useState("All Types");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        let filtered = coursesData;

        if (statusFilter !== "All Courses") {
            filtered = filtered.filter(
                (course) => course.course_status.toLowerCase() === statusFilter.toLowerCase()
            );
        }

        if (typeFilter !== "All Types") {
            filtered = filtered.filter((course) => course.course_type.toLowerCase() === typeFilter.toLowerCase());
        }

        if (searchTerm) {
            filtered = filtered.filter((course) =>
                course.course_name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
            );
        }

        setFilteredCourses(filtered);
    }, [statusFilter, typeFilter, searchTerm]);

    const SkeletonLoader = () => (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <Skeleton height={120} className="mb-4" />
            <Skeleton height={20} width="80%" />
            <Skeleton height={20} width="60%" className="mt-2" />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-white shadow">
                <div className="max-w-8xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">Courses</h1>

                    <div className="flex">
                        <span className="text-gray-700">
                            Total Courses: {loading ? <Skeleton width={30} /> : totalCourses}
                        </span>
                        <span className="ml-4 text-gray-700">
                            Active Courses: {loading ? <Skeleton width={30} /> : activeCourses}
                        </span>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4 sm:gap-6">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search courses here"
                            className="rounded p-2 w-full sm:w-auto sm:flex-grow"
                        />

                        <div className="flex flex-col sm:flex-row sm:space-x-4 gap-4 sm:gap-0 w-full sm:w-auto">
                            <select
                                className="form-select rounded shadow-sm p-2 w-full sm:w-auto"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option>All Courses</option>
                                <option value={"active"}>Active</option>
                                <option value={"inactive"}>Inactive</option>
                            </select>
                            <select
                                className="form-select rounded shadow-sm p-2 w-full sm:w-auto"
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                            >
                                <option>All Types</option>
                                <option value={"free"}>Free</option>
                                <option value={"subscribe"}>Subscription</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loading
                            ? Array(6)
                                .fill(0)
                                .map((_, index) => <SkeletonLoader key={index} />)
                            : filteredCourses.map((course) => (
                                <CourseCard key={course.course_id} course={course} />
                            ))}
                        {!loading && filteredCourses.length === 0 && <p>No course found</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Courses;
