import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageSquare, Maximize2, Minimize2 } from 'lucide-react';

const ChatUI = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        // Add user message
        const userMessage = {
            text: inputMessage,
            sender: 'user',
            timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');

        // Simulate AI response after a delay
        setTimeout(() => {
            const aiMessage = {
                text: "I'm processing your request. This is a placeholder response.",
                sender: 'ai',
                timestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev, aiMessage]);
        }, 1000);
    };

    return (
        <>
            {/* Floating Chat Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 p-4 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 
                    transition-all duration-200 z-50 hover:scale-110"
                    aria-label="Open chat"
                >
                    <MessageSquare size={24} />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div
                    className={`fixed transition-all duration-300 z-50 bg-white dark:bg-dark-card 
                    shadow-lg border border-neutral-200 dark:border-dark-border flex flex-col
                    ${isFullscreen
                            ? 'inset-0 rounded-none'
                            : 'bottom-6 right-6 w-96 h-[80vh] rounded-lg'
                        }`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-dark-border">
                        <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">AI Assistant</h3>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setIsFullscreen(!isFullscreen)}
                                className="p-1 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400"
                                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                            >
                                {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                            </button>
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    setIsFullscreen(false);
                                }}
                                className="p-1 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400"
                                aria-label="Close chat"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-lg ${message.sender === 'user'
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-neutral-100 dark:bg-dark-hover text-neutral-800 dark:text-neutral-200'
                                        }`}
                                >
                                    <p className="text-sm">{message.text}</p>
                                    <span className="text-xs opacity-75 mt-1 block">
                                        {new Date(message.timestamp).toLocaleTimeString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="p-4 border-t border-neutral-200 dark:border-dark-border">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 p-2 rounded-lg border border-neutral-200 dark:border-dark-border 
                                bg-white dark:bg-dark-card text-neutral-800 dark:text-neutral-200 
                                focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            <button
                                type="submit"
                                className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 
                                transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!inputMessage.trim()}
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default ChatUI; 