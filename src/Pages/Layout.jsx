import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import ChatInput from '../Components/ChatInput';

const Layout = () => {
    const location = useLocation();

    useEffect(() => {
        const parent = document.querySelector("#parent");
        if (parent) {
            parent.scrollTo(0, 0);
        }
    }, [location]);

    return (
        <div className="flex h-screen bg-neutral-50 dark:bg-dark-bg overflow-hidden transition-colors duration-200">
            {/* Sidebar */}
            <div className="hidden md:block">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />

                <main className="flex-1 overflow-auto bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-dark-bg dark:to-dark-card">
                    <div className="container mx-auto px-4 py-8 animate-fade-in" id="parent">
                        <div className="bg-white dark:bg-dark-card rounded-xl shadow-soft dark:shadow-dark p-6 transition-colors duration-200">
                            <Outlet />
                        </div>
                    </div>
                </main>

                {/* Chat Input at the bottom */}
                <div className="bg-white dark:bg-dark-card border-t border-neutral-200 dark:border-dark-border shadow-soft dark:shadow-dark transition-colors duration-200">
                    <ChatInput />
                </div>
            </div>
        </div>
    );
};

export default Layout;
