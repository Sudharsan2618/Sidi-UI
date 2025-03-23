import { Briefcase, GraduationCap, MapPin, Mail, Phone, Globe, Github, Linkedin } from "lucide-react";

const UserContent = ({ user }) => {
    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 border">
            {/* Profile Header */}
            <div className="flex items-center gap-6">
                <img
                    src={user.profile_picture_url}
                    alt={user.user_name}
                    className="w-24 h-24 rounded-full border-4 border-gray-300"
                />
                <div>
                    <h2 className="text-2xl font-bold">{user.user_name}</h2>
                    <p className="text-gray-600">{user.designation} at {user.current_organization}</p>
                    <p className="text-sm text-blue-500">{user.ambition} 🚀</p>
                </div>
            </div>

            {/* Details Section */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                    <p className="flex items-center gap-2 text-gray-700">
                        <MapPin className="w-5 h-5 text-gray-500" /> {user.city}
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                        <Briefcase className="w-5 h-5 text-gray-500" /> {user.work_experience} years experience
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                        <GraduationCap className="w-5 h-5 text-gray-500" /> {user.highest_qualification} (Graduated {user.year_of_passedout})
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                        <Globe className="w-5 h-5 text-gray-500" /> Interested in {user.area_of_interest}
                    </p>
                </div>
                <div className="space-y-3">
                    <p className="flex items-center gap-2 text-gray-700">
                        <Mail className="w-5 h-5 text-gray-500" /> {user.mail_id}
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                        <Phone className="w-5 h-5 text-gray-500" /> {user.mobile_number}
                    </p>
                    <div className="flex gap-4 mt-2">
                        <a href={user.github_profile} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
                            <Github className="w-6 h-6" />
                        </a>
                        <a href={user.linkedin_profile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                            <Linkedin className="w-6 h-6" />
                        </a>
                        <a href={user.portfolio_website} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
                            <Globe className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserContent;
