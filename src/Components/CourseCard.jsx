import React from 'react';
import PropTypes from 'prop-types';
import { formatDuration } from '../utils/courseUtils';
import RatingStars from './RatingStars';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {

    const navigate = useNavigate();

    const handleCourseRedirect = (courseId) => {
        navigate(`/courses/${courseId}/enroll`);
    };

    return (
        <div onClick={() => handleCourseRedirect(course.course_id)} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer">
            <div className="p-6">
                <h3
                    title={course.course_name}
                    className="text-lg font-semibold mb-2 w-64 max-h-12 overflow-hidden line-clamp-1"
                >
                    {course.course_name}
                </h3>

                <p className=" min-h-10 text-gray-600 text-sm mb-4 w-64 max-h-12 overflow-hidden line-clamp-2">
                    {course.course_short_description}
                </p>

                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>{formatDuration(course.course_duration_hours, course.course_duration_minutes)}</span>
                    <span className={course.course_type === "free" ? "text-green-500" : "text-blue-500"}>
                        {course.course_type === "free" ? "Free" : "Subscription"}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-primary h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${course.course_progress}%` }}
                        ></div>
                    </div>
                    <span className="text-sm text-gray-600">{course.course_progress}%</span>
                </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex">
                <RatingStars rating={course.rating} />
                <span className="ml-2 text-sm text-gray-600">{course.rating.toFixed(1)}</span>
            </div>
        </div>
    );
};

CourseCard.propTypes = {
    course: PropTypes.shape({
        course_name: PropTypes.string.isRequired,
        course_short_description: PropTypes.string.isRequired,
        course_duration_hours: PropTypes.number.isRequired,
        course_duration_minutes: PropTypes.number.isRequired,
        course_type: PropTypes.string.isRequired,
        course_progress: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired
    }).isRequired
};

export default CourseCard
