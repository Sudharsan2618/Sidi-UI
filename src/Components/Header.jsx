import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Store/userSlice';
import { Bell, Settings, LogOut, User, Sun, Moon } from 'lucide-react';
import { toggleTheme } from '../Store/themeSlice';
import ChatUI from './ChatUI';

const Header = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { mode: themeMode } = useSelector(state => state.theme);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        // Update the document class when theme changes
        if (themeMode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [themeMode]);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    };

    return (
        <>
            <header className="bg-white dark:bg-dark-card border-b border-neutral-200 dark:border-dark-border px-6 py-4 transition-colors duration-200 relative z-50">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                            {/* SIDI */}
                        </span>
                    </Link>

                    {/* Right Side */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={handleThemeToggle}
                            className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                            aria-label="Toggle theme"
                        >
                            {themeMode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {/* Notifications */}
                        <button className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                            <Bell size={20} />
                        </button>

                        {/* User Menu */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex items-center space-x-2 focus:outline-none"
                            >
                                <div className="h-9 w-9 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-medium shadow-soft dark:shadow-dark">
                                    {user?.username?.charAt(0)}
                                </div>
                            </button>

                            {/* Dropdown Menu */}
                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-card rounded-lg shadow-soft dark:shadow-dark border border-neutral-200 dark:border-dark-border py-1 z-50">
                                    <Link
                                        to="/profile"
                                        className="flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-dark-text hover:bg-neutral-50 dark:hover:bg-dark-border transition-colors duration-200"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <User size={16} className="mr-2" />
                                        Profile
                                    </Link>
                                    {/* <Link
                                        to="/settings"
                                        className="flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-dark-text hover:bg-neutral-50 dark:hover:bg-dark-border transition-colors duration-200"
                                    >
                                        <Settings size={16} className="mr-2" />
                                        Settings
                                    </Link> */}
                                    <hr className="my-1 border-neutral-200 dark:border-dark-border" />
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                                    >
                                        <LogOut size={16} className="mr-2" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Chat UI */}
            <ChatUI />
        </>
    );
};

export default Header;
