import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
    User, Globe, Smartphone, DollarSign, Briefcase, Target, Clock, Star
} from "lucide-react";
import UserProfileModal from "../Components/UserProfileModal";

export default function UserProfile() {
    const [activeTab, setActiveTab] = useState("Profile Details");
    const [userDetails, setUserDetails] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const storedUser = localStorage.getItem("user");
    const userId = JSON.parse(storedUser).user_id;

    // Fetch user details from the API
    async function fetchUserDetails() {
        try {
            setLoading(true);
            const response = await fetch("https://sidi-be.onrender.com/api/userdetails", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: userId })
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            setUserDetails(data?.user_details?.user_details || {});
        } catch (error) {
            console.error("Error fetching user details:", error);
            setError("Failed to fetch user details. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserDetails();
    }, []);

    // Handle save from modal
    const handleModalSave = async (formData) => {
        try {
            setLoading(true);
            const response = await fetch("https://sidi-be.onrender.com/api/userdetails/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            await fetchUserDetails(); // Refresh user details after saving
            setIsModalOpen(false); // Close the modal
        } catch (error) {
            console.error("Error updating user details:", error);
            setError("Failed to update user details. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Skeleton loader for profile details
    const SkeletonLoader = () => (
        <div className="bg-gray-100 p-4 rounded-[5px] shadow-md flex items-center">
            <Skeleton circle width={24} height={24} className="mr-3" />
            <div>
                <Skeleton width={100} height={14} className="mb-1" />
                <Skeleton width={150} height={16} />
            </div>
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen p-4 md:p-6 bg-gray-100 dark:bg-dark-bg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Profile Card */}
                <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6 flex flex-col items-center">
                    <div className="w-24 h-24 bg-gray-300 dark:bg-dark-border flex justify-center items-center rounded-full mb-4">
                        {loading ? (
                            <Skeleton circle height={96} width={96} />
                        ) : (
                            <p className="text-5xl capitalize text-black dark:text-white">{userDetails?.full_name?.charAt(0)}</p>
                        )}
                    </div>
                    <h2 className="text-xl mb-2 font-bold text-center text-black dark:text-white">
                        {loading ? <Skeleton width={120} /> : userDetails?.full_name}
                    </h2>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-md p-2 w-full md:w-[10vw] font-medium text-black dark:text-white bg-primary rounded-[5px] hover:bg-primary-dark transition-colors"
                    >
                        Edit Profile
                    </button>
                </div>

                {/* Profile Tabs */}
                <div className="col-span-3">
                    <div className="flex flex-wrap border-b border-gray-200 dark:border-dark-border">
                        {["Profile Details"].map((tab) => (
                            <button
                                key={tab}
                                className={`px-6 py-2 ${activeTab === tab ? "border-b-2 border-primary text-black dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Modal for Editing Profile */}
                    <UserProfileModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        initialData={userDetails}
                        onSave={handleModalSave}
                    />

                    {/* Tab Content */}
                    <div className="p-4 md:p-6 bg-white dark:bg-dark-card rounded-lg shadow-sm mt-4">
                        {activeTab === "Profile Details" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-200">
                                {[
                                    { icon: User, label: "Full Name", value: userDetails?.full_name },
                                    { icon: User, label: "Age", value: userDetails?.age },
                                    { icon: Globe, label: "Country", value: userDetails?.country },
                                    { icon: Smartphone, label: "Phone", value: userDetails?.phone_number },
                                    { icon: DollarSign, label: "Annual Income Range", value: userDetails?.annual_income_range },
                                    { icon: Briefcase, label: "Investment Experience", value: userDetails?.investment_experience_level },
                                    { icon: Target, label: "Risk Tolerance", value: userDetails?.risk_tolerance },
                                    { icon: Clock, label: "Preferred Investment Duration", value: userDetails?.preferred_investment_duration },
                                    { icon: Globe, label: "Preferred Language", value: userDetails?.preferred_language },
                                    { icon: Star, label: "Areas of Interest", value: userDetails?.areas_of_interest?.join(", ") || "None" }
                                ].map((item, index) => (
                                    <div key={index} className="bg-gray-100 dark:bg-dark-card p-4 rounded-[5px] shadow-md flex items-center">
                                        <item.icon size={24} className="mr-3 text-primary" />
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-300">{item.label}</p>
                                            <p className="font-medium text-black dark:text-white">{loading ? <Skeleton width={100} /> : item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg">
                    {error}
                </div>
            )}
        </div>
    );
}