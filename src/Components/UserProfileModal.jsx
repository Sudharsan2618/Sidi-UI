import React, { useState, useEffect } from "react";

const UserProfileModal = ({ isOpen, onClose, initialData, onSave }) => {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (isOpen) {
            setFormData(initialData || {});
        }
    }, [isOpen, initialData]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.full_name) newErrors.full_name = "Full Name is required";
        if (!formData.age) newErrors.age = "Age is required";
        if (!formData.gender) newErrors.gender = "Gender is required";
        if (!formData.country) newErrors.country = "Country is required";
        if (!formData.phone_number) newErrors.phone_number = "Phone number is required";
        if (!formData.annual_income_range) newErrors.annual_income_range = "Annual income range is required";
        if (!formData.investment_experience_level) newErrors.investment_experience_level = "Investment experience level is required";
        if (!formData.preferred_investment_duration) newErrors.preferred_investment_duration = "Preferred investment duration is required";
        if (!formData.risk_tolerance) newErrors.risk_tolerance = "Risk tolerance is required";
        if (!formData.preferred_language) newErrors.preferred_language = "Preferred language is required";
        if (!formData.areas_of_interest || formData.areas_of_interest.length === 0) {
            newErrors.areas_of_interest = "Please select at least one area of interest";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prev) => {
            let updated = prev.areas_of_interest ? [...prev.areas_of_interest] : [];
            if (checked) {
                if (!updated.includes(value)) updated.push(value);
            } else {
                updated = updated.filter((i) => i !== value);
            }
            return { ...prev, areas_of_interest: updated };
        });
    };

    const handleSaveClick = () => {
        if (validateForm()) {
            onSave(formData);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-lg w-full max-w-3xl">
                <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Edit Profile</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {[
                        "full_name", "age", "gender", "country", "phone_number",
                        "annual_income_range", "investment_experience_level", "preferred_investment_duration",
                        "risk_tolerance", "preferred_language"
                    ].map((field) => (
                        <div key={field} className="flex flex-col">
                            <label htmlFor={field} className="text-sm font-medium mb-2 text-black dark:text-gray-200">
                                {field.replace(/_/g, " ").toUpperCase()}
                            </label>
                            <input
                                id={field}
                                type="text"
                                name={field}
                                value={formData[field] || ""}
                                onChange={handleInputChange}
                                placeholder={field.replace(/_/g, " ").toUpperCase()}
                                className={`w-full border p-2 rounded bg-white dark:bg-dark-bg text-black dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors[field] ? "border-red-500" : ""}`}
                            />
                            {errors[field] && <p className="text-xs text-red-500">{errors[field]}</p>}
                        </div>
                    ))}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black dark:text-gray-200">Areas of Interest</label>
                    <div className="flex flex-wrap gap-4">
                        {["Stocks", "Crypto", "Real Estate"].map((interest) => (
                            <div key={interest} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id={interest}
                                    name="areas_of_interest"
                                    value={interest}
                                    checked={formData.areas_of_interest?.includes(interest)}
                                    onChange={handleCheckboxChange}
                                    className="mr-2 accent-primary dark:accent-primary"
                                />
                                <label htmlFor={interest} className="text-sm text-black dark:text-gray-200">{interest}</label>
                            </div>
                        ))}
                    </div>
                    {errors.areas_of_interest && <p className="text-xs text-red-500">{errors.areas_of_interest}</p>}
                </div>
                <div className="flex justify-end space-x-2 mt-2">
                    <button onClick={onClose} className="px-4 py-2 rounded border border-gray-400 dark:border-gray-600 bg-white dark:bg-dark-bg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-hover transition font-medium">Cancel</button>
                    <button onClick={handleSaveClick} className="px-4 py-2 rounded bg-primary-600 hover:bg-primary-700 text-white font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary-500">Save</button>
                </div>
            </div>
        </div>
    );
};

export default UserProfileModal;
