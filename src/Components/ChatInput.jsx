import React, { useState } from 'react';
import { Send, Mic, PaperclipIcon } from 'lucide-react';

const ChatInput = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            // Handle message submission
            console.log('Message sent:', message);
            setMessage('');
        }
    };

    return (
        <div className="px-4 py-3">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <button
                    type="button"
                    className="p-2 text-neutral-600 hover:text-primary-600 transition-colors duration-200"
                >
                    <PaperclipIcon size={20} />
                </button>

                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="w-full px-4 py-2 rounded-full bg-neutral-100 focus:bg-white border border-neutral-200 
                        focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200
                        placeholder-neutral-500 text-neutral-900"
                    />
                </div>

                <button
                    type="button"
                    className="p-2 text-neutral-600 hover:text-primary-600 transition-colors duration-200"
                >
                    <Mic size={20} />
                </button>

                <button
                    type="submit"
                    disabled={!message.trim()}
                    className={`p-2 rounded-full transition-all duration-200
                        ${message.trim()
                            ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-soft'
                            : 'bg-neutral-200 text-neutral-400'}`}
                >
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
};

export default ChatInput;
