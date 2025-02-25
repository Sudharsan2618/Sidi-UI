// import React, { useEffect, useRef, useState } from 'react'
// import Logo from "../assets/images/Logo.png"
// import { Link, NavLink, useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { logout } from '../Store/userSlice'
// const Header = () => {

//     const user = JSON.parse(localStorage.getItem("user"))
//     const [isOpen, setIsOpen] = useState(false);
//     const dropdownRef = useRef(null);

//     // Close dropdown on outside click
//     useEffect(() => {
//         function handleClickOutside(event) {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setIsOpen(false);
//             }
//         }
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const handleLogout = () => {
//         // dispatch(logout())
//         localStorage.removeItem("user")
//         localStorage.removeItem("hasCompletedQuestions")
//         navigate("/login")


//     }


//     useEffect(() => {
//         const timeoutDuration = 900000;
//         const checkSessionTimeout = () => {
//             const lastActivity = localStorage.getItem('lastActivity');
//             if (lastActivity && Date.now() - lastActivity > timeoutDuration) {
//                 handleLogout();
//             }
//         };

//         const resetActivity = () => {
//             localStorage.setItem('lastActivity', Date.now());
//         };

//         const intervalId = setInterval(checkSessionTimeout, 5000);

//         document.addEventListener('mousemove', resetActivity);
//         document.addEventListener('keypress', resetActivity);

//         return () => {
//             clearInterval(intervalId);
//             document.removeEventListener('mousemove', resetActivity);
//             document.removeEventListener('keypress', resetActivity);
//         };
//     }, []);


//     return (
//         <header className=' px-10 flex items-center justify-between '>
//             <div className=" size-24">
//                 <Link to={"/"} className='w-full h-full'>
//                     <img src={Logo} className='w-full h-full object-contain' alt="Logo" />
//                 </Link>
//             </div>
//             <div className=" flex gap-5">
//                 {/* <ul className='flex items-center justify-between gap-4'>
//                     <li>
//                         <NavLink className={({ isActive }) =>
//                             isActive ? 'text-primary' : 'text-black'
//                         }
//                             to={"/"}>Home</NavLink>
//                     </li>
//                     <li>
//                         <NavLink className={({ isActive }) =>
//                             isActive ? 'text-primary' : 'text-black'
//                         }
//                             to={"/courses"}>Courses</NavLink>
//                     </li>
//                     <li>
//                         <NavLink className={({ isActive }) =>
//                             isActive ? 'text-primary' : 'text-black'
//                         }
//                             to={"/ebooks"}>E-books</NavLink>
//                     </li>
//                 </ul> */}

//                 <div className="relative" ref={dropdownRef}>
//                     <button
//                         onClick={() => setIsOpen(!isOpen)}
//                         className="size-10 bg-white rounded-full font-bold capitalize shadow-md flex items-center justify-center"
//                     >
//                         {user?.username?.charAt(0)}
//                     </button>

//                     {isOpen && (
//                         <ul className=" z-50 absolute right-0 mt-2 w-36 bg-white shadow-lg rounded overflow-hidden">
//                             <li>
//                                 <button
//                                     className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition"
//                                     onClick={handleLogout}
//                                 >
//                                     Logout
//                                 </button>
//                             </li>
//                         </ul>
//                     )}
//                 </div>
//             </div>
//         </header>
//     )
// }

// export default Header


import React, { useEffect, useRef, useState } from 'react';
import Logo from "../assets/images/Logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../Store/userSlice';
import { useSelector } from 'react-redux';
import { setMapColor } from '../Store/dataSlice';
import { Palette } from 'lucide-react';


const Header = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const mapColor = useSelector((state) => state.data.mapColor);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("hasCompletedQuestions");
        navigate("/login");
    };

    useEffect(() => {
        const timeoutDuration = 900000;
        const checkSessionTimeout = () => {
            const lastActivity = localStorage.getItem('lastActivity');
            if (lastActivity && Date.now() - lastActivity > timeoutDuration) {
                handleLogout();
            }
        };

        const resetActivity = () => {
            localStorage.setItem('lastActivity', Date.now());
        };

        const intervalId = setInterval(checkSessionTimeout, 5000);

        document.addEventListener('mousemove', resetActivity);
        document.addEventListener('keypress', resetActivity);

        return () => {
            clearInterval(intervalId);
            document.removeEventListener('mousemove', resetActivity);
            document.removeEventListener('keypress', resetActivity);
        };
    }, []);

    // Function to handle map color change
    const handleMapColorChange = (event) => {
        dispatch(setMapColor(event.target.value));
    };
    const [showColorInput, setShowColorInput] = useState(false);
    const toggleColorInput = () => {
        setShowColorInput(!showColorInput);
    };

    return (
        <header className='px-10 flex items-center justify-between'>
            <div className="size-24">
                <Link to={"/"} className='w-full h-full'>
                    <img src={Logo} className='w-full h-full object-contain' alt="Logo" />
                </Link>
            </div>
            <div className="flex gap-5 items-center">
                {/* Map Color Picker */}
                <div className="flex justify-center items-center relative">
                    {/* <label className="text-gray-700">
                        <Palette size={20} className='text-white cursor-pointer' />
                    </label> */}
                    {/* {!showColorInput && */}
                    <input
                        type="color"
                        value={mapColor}
                        onChange={handleMapColorChange}
                        className="border-none cursor-pointer  mt-2  w-8 h-8"
                    />
                    {/* } */}
                </div>

                {/* User Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="size-10 bg-white rounded-full font-bold capitalize shadow-md flex items-center justify-center"
                    >
                        {user?.username?.charAt(0)}
                    </button>

                    {isOpen && (
                        <ul className="z-50 absolute right-0 mt-2 w-36 bg-white shadow-lg rounded overflow-hidden">
                            <li>
                                <button
                                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
