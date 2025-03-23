
// import React, { useEffect, useState } from "react";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import CourseCard from "../Components/CourseCard";

// import {
//     Linkedin, Github, User, Briefcase, MapPin, GraduationCap,
//     Mail, Smartphone, Globe, Target, Award, Star, Book, DollarSign, Clock
// } from "lucide-react";
// import UserProfileModal from "../Components/UserProfileModal";

// export default function UserProfile() {
//     const [activeTab, setActiveTab] = useState("Profile Details");
//     const [userDetails, setUserDetails] = useState({});
//     // const [userCourses, setUserCourses] = useState({});
//     // const [userBadges, setUserBadges] = useState({});
//     // const [userCertificates, setUserCertificates] = useState({});
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [editData, setEditData] = useState({});
//     const [loading, setLoading] = useState(true);

//     const storedUser = localStorage.getItem("user");
//     const userId = JSON.parse(storedUser).user_id;

//     async function fetchUserDetails() {
//         try {
//             setLoading(true);
//             const response = await fetch("https://sidi-be.onrender.com/api/userdetails", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ user_id: userId })
//             });
//             if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//             const data = await response.json();
//             setUserDetails(data?.user_details?.user_details || {});
//             // setUserCourses(data?.user_details?.enrolled_courses || {});
//             // setUserBadges(data?.user_details?.user_badges || {});
//             // setUserCertificates(data?.user_details?.user_certifications || {});
//         } catch (error) {
//             console.error("Error fetching user details:", error);
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         fetchUserDetails();
//     }, []);

//     useEffect(() => {
//         setEditData(userDetails);
//     }, [userDetails]);

//     const handleInputChange = (e) => {
//         setEditData({ ...editData, [e.target.name]: e.target.value });
//     };

//     const handleSave = async () => {
//         try {
//             const response = await fetch("https://sidi-be.onrender.com/api/userdetails/update", {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(editData)
//             });
//             if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//             fetchUserDetails();
//             setIsModalOpen(false);
//         } catch (error) {
//             console.error("Error updating user details:", error);
//         }
//     };

//     const SkeletonLoader = () => (
//         <div className="bg-white p-4 rounded-lg shadow-md">
//             <Skeleton height={120} className="mb-4" />
//             <Skeleton height={20} width="80%" />
//             <Skeleton height={20} width="60%" className="mt-2" />
//         </div>
//     );
//     return (
//         <div className="flex flex-col min-h-screen bg-gray-100 p-4 md:p-6">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                 {/* Profile Card */}
//                 <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center">
//                     <div className="w-24 h-24 bg-gray-300 flex justify-center items-center rounded-full mb-4">
//                         {loading ? <Skeleton circle height={96} width={96} /> : <p className="text-5xl capitalize">{userDetails?.full_name?.charAt(0)}</p>}
//                     </div>
//                     <h2 className="text-xl mb-2 font-bold text-center">
//                         {loading ? <Skeleton width={120} /> : userDetails?.full_name}
//                     </h2>

//                     <button onClick={() => setIsModalOpen(true)} className="text-md p-2 w-full md:w-[10vw] font-medium text-white bg-primary rounded-[5px] hover:bg-primary-dark transition-colors">
//                         Edit Profile
//                     </button>
//                 </div>

//                 {/* Profile Tabs */}
//                 <div className="col-span-3">
//                     <div className="flex flex-wrap border-b">
//                         {["Profile Details"].map((tab) => (
//                             <button key={tab} className={`px-6 py-2 ${activeTab === tab ? "border-b-2 border-primary" : "text-gray-500"}`} onClick={() => setActiveTab(tab)}>
//                                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                             </button>
//                         ))}
//                     </div>

//                     {isModalOpen && (
//                         <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 p-4">
//                             <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
//                                 <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
//                                 {[
//                                     "full_name", "age", "gender", "country", "phone_number", "annual_income_range", "investment_experience_level", "preferred_investment_duration", "risk_tolerance", "preferred_language"
//                                 ].map((field) => (
//                                     <input
//                                         key={field}
//                                         type="text"
//                                         name={field}
//                                         value={editData[field] || ""}
//                                         onChange={handleInputChange}
//                                         placeholder={field.replace(/_/g, " ").toUpperCase()}
//                                         className="w-full border p-2 mb-4 rounded"
//                                     />
//                                 ))}
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium mb-2">Areas of Interest</label>
//                                     <div className="flex flex-wrap gap-2">
//                                         {["Stocks", "Crypto", "Real Estate"].map((interest) => (
//                                             <div key={interest} className="flex items-center">
//                                                 <input
//                                                     type="checkbox"
//                                                     id={interest}
//                                                     name="areas_of_interest"
//                                                     value={interest}
//                                                     checked={editData.areas_of_interest?.includes(interest)}
//                                                     onChange={handleCheckboxChange}
//                                                     className="mr-2"
//                                                 />
//                                                 <label htmlFor={interest} className="text-sm">{interest}</label>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                                 <div className="flex justify-end space-x-2">
//                                     <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
//                                     <button onClick={handleSave} className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition">Save</button>
//                                 </div>
//                             </div>
//                         </div>
//                     )}




//                     {/* Tab Content */}
//                     <div className="p-4 md:p-6 bg-white rounded-lg shadow-sm mt-4">
//                         {/* {activeTab === "Enrolled Courses" && (
//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                                 {loading
//                                     ? Array(6)
//                                         .fill(0)
//                                         .map((_, index) => <SkeletonLoader key={index} />)
//                                     : userCourses?.map((course) => (
//                                         <CourseCard rate={false} key={course.course_id} course={course} />
//                                     ))}
//                                 {!loading && userCourses.length === 0 && <p>No course found</p>}
//                             </div>
//                         )} */}

//                         {activeTab === "Profile Details" && (
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
//                                 {[
//                                     { icon: User, label: "Full Name", value: userDetails?.full_name },
//                                     { icon: User, label: "Age", value: userDetails?.age },
//                                     { icon: Globe, label: "Country", value: userDetails?.country },
//                                     { icon: Smartphone, label: "Phone", value: userDetails?.phone_number },
//                                     { icon: DollarSign, label: "Annual Income Range", value: userDetails?.annual_income_range },
//                                     { icon: Briefcase, label: "Investment Experience", value: userDetails?.investment_experience_level },
//                                     { icon: Target, label: "Risk Tolerance", value: userDetails?.risk_tolerance },
//                                     { icon: Clock, label: "Preferred Investment Duration", value: userDetails?.preferred_investment_duration },
//                                     { icon: Globe, label: "Preferred Language", value: userDetails?.preferred_language },
//                                     { icon: Star, label: "Areas of Interest", value: userDetails?.areas_of_interest?.join(", ") || "None" }
//                                 ].map((item, index) => (
//                                     <div key={index} className="bg-gray-100 p-4 rounded-[5px] shadow-md flex items-center">
//                                         <item.icon size={24} className="mr-3 text-primary" />
//                                         <div>
//                                             <p className="text-sm text-gray-500">{item.label}</p>
//                                             <p className="font-medium">{loading ? <Skeleton width={100} /> : item.value}</p>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}


//                         {/* {activeTab === "Certificates" && <Certificates certificates={userCertificates} />}
//                         {activeTab === "Badges" && <Badges badges={userBadges} />} */}
//                     </div>
//                 </div>


//             </div>
//         </div>
//     );
// }


import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
    User, Globe, Smartphone, DollarSign, Briefcase, Target, Clock, Star, ArrowLeft
} from "lucide-react";
import UserProfileModal from "../Components/UserProfileModal";
import { Link } from "react-router-dom";

export default function UserProfile() {
    const [activeTab, setActiveTab] = useState("Profile Details");
    const [userDetails, setUserDetails] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState({});
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

    // Initialize editData with userDetails when the component mounts
    useEffect(() => {
        fetchUserDetails();
    }, []);

    useEffect(() => {
        setEditData(userDetails);
    }, [userDetails]);

    // Handle input change for text fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle checkbox change for areas of interest
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setEditData((prevData) => {
            let updatedInterests = [...prevData.areas_of_interest || []];
            if (checked) {
                updatedInterests.push(value);
            } else {
                updatedInterests = updatedInterests.filter((interest) => interest !== value);
            }
            return {
                ...prevData,
                areas_of_interest: updatedInterests,
            };
        });
    };

    // Handle save button click
    const handleSave = async () => {
        try {
            const response = await fetch("https://sidi-be.onrender.com/api/userdetails/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editData)
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            fetchUserDetails(); // Refresh user details after saving
            setIsModalOpen(false); // Close the modal
        } catch (error) {
            console.error("Error updating user details:", error);
            setError("Failed to update user details. Please try again later.");
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
        <div className="flex flex-col min-h-screen  p-4 md:p-6">
            <Link to={"/"}>
                <button className="fixed top-10 left-10 text-blue-700 flex items-center space-x-2">
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back</span>
                </button>
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Profile Card */}
                <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center">
                    <div className="w-24 h-24 bg-gray-300 flex justify-center items-center rounded-full mb-4">
                        {loading ? (
                            <Skeleton circle height={96} width={96} />
                        ) : (
                            <p className="text-5xl capitalize">{userDetails?.full_name?.charAt(0)}</p>
                        )}
                    </div>
                    <h2 className="text-xl mb-2 font-bold text-center">
                        {loading ? <Skeleton width={120} /> : userDetails?.full_name}
                    </h2>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-md p-2 w-full md:w-[10vw] font-medium text-white bg-primary rounded-[5px] hover:bg-primary-dark transition-colors"
                    >
                        Edit Profile
                    </button>
                </div>

                {/* Profile Tabs */}
                <div className="col-span-3">
                    <div className="flex flex-wrap border-b">
                        {["Profile Details"].map((tab) => (
                            <button
                                key={tab}
                                className={`px-6 py-2 ${activeTab === tab ? "border-b-2 border-primary" : "text-gray-500"}`}
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
                        editData={editData}
                        handleInputChange={handleInputChange}
                        handleCheckboxChange={handleCheckboxChange}
                        handleSave={handleSave}
                    />

                    {/* Tab Content */}
                    <div className="p-4 md:p-6 bg-white rounded-lg shadow-sm mt-4">
                        {activeTab === "Profile Details" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
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
                                    <div key={index} className="bg-gray-100 p-4 rounded-[5px] shadow-md flex items-center">
                                        <item.icon size={24} className="mr-3 text-primary" />
                                        <div>
                                            <p className="text-sm text-gray-500">{item.label}</p>
                                            <p className="font-medium">{loading ? <Skeleton width={100} /> : item.value}</p>
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