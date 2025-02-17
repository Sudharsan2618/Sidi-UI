import React from 'react';

const Loader = () => {
    return (
        <div className="flex items-center justify-center space-x-4">
            <div className="w-4 h-4 bg-primary animate-ping-cube"></div>
            <div className="w-4 h-4 bg-primary animate-ping-cube delay-150"></div>
            <div className="w-4 h-4 bg-primary animate-ping-cube delay-300"></div>
        </div>
    );
};

export default Loader;
