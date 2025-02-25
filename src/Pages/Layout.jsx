import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar'; // Import the Sidebar component
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
        <div className="flex flex-col h-screen bg-gradient-to-tl from-primary to-white">
            <Header />

            <div className="flex flex-grow overflow-hidden">
                <Sidebar />
                <div className="flex-grow overflow-auto p-4" id='parent'>
                    <Outlet />
                </div>
            </div>
            <ChatInput />

        </div>
    );
};

export default Layout;
