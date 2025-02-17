
import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, ArrowLeft, ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion, fetchQuestions, finishAssessment } from "../Store/questionsSlice";
import infoImage from "../assets/images/login.svg";
import loader from "../assets/images/loader.gif";
import Loader from "../Components/Loader";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

const Questions = () => {
    const [expandedQuestion, setExpandedQuestion] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [activeTab, setActiveTab] = useState(1);
    const [errors, setErrors] = useState({});  // State to store error messages

    const { questions, tabName, loading, allSuccess } = useSelector((state) => state.questions);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            fetchQuestions({
                tabId: activeTab,
                userId: JSON.parse(localStorage.getItem("user"))?.user_id,
            })
        );
    }, [activeTab]);

    useEffect(() => {
        window.scroll(0, 0);
    }, [loading]);

    // Handle option selection
    const handleOptionChange = (questionId, option) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [questionId]: option,
        }));

        // Clear the error message when the option is selected
        setErrors((prev) => ({
            ...prev,
            [questionId]: null,
            tab: selectedOptions.length == 5 && null
        }));
    };

    const navigate = useNavigate()

    // Handle next tab navigation
    const handleNext = () => {
        if (validateTab()) {
            setActiveTab((prev) => (prev < 5 ? prev + 1 : 5));
            setErrors((prev) => ({
                ...prev,
                tab: null
            }));
            if (activeTab === 5) {
                localStorage.setItem("hasCompletedQuestions", true);

                dispatch(finishAssessment({
                    userId: JSON.parse(localStorage.getItem("user"))?.user_id,
                }))

            }
        } else {
            setErrors((prev) => ({
                ...prev,
                tab: "Please answer all questions in this tab before proceeding."
            }));
        }
    };

    useEffect(() => {
        if (allSuccess) {
            setTimeout(() => {
                navigate("/")
            }, 2000)
        }
    }, [allSuccess])

    // Handle previous tab navigation
    const handlePrevious = () => {
        setActiveTab((prev) => (prev > 1 ? prev - 1 : 1));

        if (!validateTab()) {
            setErrors((prev) => ({
                ...prev,
                tab: null
            }));
        }
    };

    // Validate all questions answered in the tab
    const validateTab = () => {
        return questions.every(
            (question) =>
                question.selected_option?.selected_option_id
            // selectedOptions[question.question_id] || question.selected_option?.selected_option_id
        );
    };

    // Handle answer submission
    const submitAnswer = async (questionId, selected) => {
        const selectedOption = selectedOptions[questionId];

        if (!selectedOption && !selected) {
            setErrors((prev) => ({
                ...prev,
                [questionId]: "Please select an option before submitting."
            }));
            return;
        }

        const userId = JSON.parse(localStorage.getItem("user"))?.user_id;
        const selectedOptionId = selectedOption.option_id;

        dispatch(
            answerQuestion({
                user_id: userId,
                question_id: questionId,
                selected_option_id: selectedOptionId,
                tab_id: activeTab,
            })
        );
    };


    const hasCompletedQuestions = JSON.parse(localStorage.getItem("hasCompletedQuestions") || "false");

    // If questions are completed, prevent access and redirect to dashboard or home
    if (hasCompletedQuestions) {
        return <Navigate to="/" replace />;
    }


    return (
        <div className="min-h-screen bg-neutral-light p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div className="relative flex opacity-0">
                        <div className="w-12 h-12 bg-primary-light rounded-full" />
                        <div className="w-12 h-12 bg-primary-dark rounded-full -ml-6" />
                        <span className="ml-2 text-xl font-semibold">Companion</span>
                    </div>
                    <h1 className="text-3xl font-bold border-b-2 border-primary-dark">
                        {tabName}
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        {questions.map((question, i) => (
                            <div key={`question-${i}`} className="w-full">
                                <button
                                    onClick={() => setExpandedQuestion(i + 1)}
                                    className={`w-full p-4 text-left rounded flex justify-between items-center ${expandedQuestion === question.question_id
                                        ? "bg-primary-light"
                                        : "bg-secondary-light"
                                        }`}
                                >
                                    <span className="text-lg font-medium">{question.question}</span>
                                    {expandedQuestion === i + 1 ? <ChevronUp /> : <ChevronDown />}
                                </button>

                                {expandedQuestion === i + 1 && question.options && (
                                    <div className="mt-2 p-3 bg-neutral-light rounded">
                                        <div className="space-y-2">
                                            {question.options.map((option) => (
                                                <div key={option.option_id} className="flex items-center space-x-2">
                                                    <label className="flex items-center justify-center gap-2 cursor-pointer">
                                                        <input className="accent-transparent"
                                                            type="radio"
                                                            name={`question-${question.question_id}`}
                                                            checked={
                                                                selectedOptions[question.question_id]?.option_id === option.option_id ||
                                                                (!selectedOptions[question.question_id] && question.selected_option?.selected_option_id === option.option_id)
                                                            }
                                                            onChange={() => handleOptionChange(question.question_id, option)}
                                                        />
                                                        <span>{option.option_text}</span>
                                                    </label>
                                                </div>
                                            ))}

                                        </div>
                                        {errors[question.question_id] && (
                                            <div className="mt-2 text-red-500 text-sm">{errors[question.question_id]}</div>
                                        )}
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => submitAnswer(question.question_id, question.selected_option?.selected_option_id)}
                                                className="mt-4 px-4 py-2 bg-primary-dark text-white rounded"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col items-center justify-center text-center">
                        <img
                            src={infoImage}
                            alt="info image"
                            className="w-64 h-64 object-contain"
                        />
                        <h2 className="text-4xl font-bold text-primary-dark">
                            Help us to understand more about you!
                        </h2>
                    </div>
                </div>

                {errors.tab && (
                    <div className="mt-4 text-red-500 text-sm">{errors.tab}</div>
                )}

                <div className="flex justify-between mt-8">
                    <button
                        disabled={activeTab === 1}
                        onClick={handlePrevious}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded disabled:opacity-5"
                    >
                        <ArrowLeft /> Previous
                    </button>
                    <button
                        disabled={!validateTab()}
                        onClick={handleNext}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded disabled:opacity-5"
                    >
                        Next <ArrowRight />
                    </button>
                </div>
            </div>

            {loading && (
                <div className="fixed inset-0 bg-white flex items-center justify-center">
                    <Loader />
                </div>
            )}
        </div>
    );
};

export default Questions;

