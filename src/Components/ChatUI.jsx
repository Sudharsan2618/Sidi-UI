import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageSquare, Maximize2, Minimize2, Bot, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ChatUI = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [messages, isOpen]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        // Add user message
        const userMessage = {
            role: 'user',
            content: inputMessage,
            timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');

        // Add empty assistant message for streaming
        setMessages(prev => [...prev, { role: 'assistant', content: '', timestamp: new Date().toISOString() }]);
        setIsLoading(true);

        try {
            // Replace with your actual API endpoint
            const response = await fetch('http://localhost:5000/api/ai/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: inputMessage }),
            });

            if (!response.body) throw new Error('No response body');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let done = false;
            let assistantContent = '';

            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                if (value) {
                    const chunk = decoder.decode(value, { stream: true });
                    assistantContent += chunk;
                    setMessages(prev => {
                        const updated = [...prev];
                        updated[updated.length - 1] = { 
                            role: 'assistant', 
                            content: assistantContent,
                            timestamp: new Date().toISOString()
                        };
                        return updated;
                    });
                }
            }
        } catch (error) {
            console.error('Error fetching AI response:', error);
            setMessages(prev => [
                ...prev.slice(0, -1),
                { 
                    role: 'assistant', 
                    content: 'Sorry, something went wrong. Please try again.',
                    timestamp: new Date().toISOString()
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            {!isOpen && (
                <button
                    onClick={toggleChat}
                    className="fixed bottom-6 right-6 p-4 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 
                    transition-all duration-200 z-50 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
                    aria-label="Open chat"
                >
                    <Bot size={24} />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div
                    className={`fixed transition-all duration-300 z-50 bg-white dark:bg-dark-card 
                    shadow-xl border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col
                    ${isFullscreen
                            ? 'inset-0 rounded-none'
                            : 'bottom-6 right-6 w-96 h-[80vh]'
                        }`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-primary-500 text-white rounded-t-lg">
                        <div className="flex items-center gap-2">
                            <Bot size={20} />
                            <div>
                                <h3 className="text-base font-semibold">AI Assistant</h3>
                                <p className="text-xs text-white/80">How can I help you today?</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setIsFullscreen(!isFullscreen)}
                                className="p-1 text-white/80 hover:bg-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30"
                                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                            >
                                {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                            </button>
                            <button
                                onClick={toggleChat}
                                className="p-1 text-white/80 hover:bg-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30"
                                aria-label="Close chat"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-dark-card">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 space-y-3 p-6">
                                <Bot size={48} className="text-primary-500/60" />
                                <div>
                                    <p className="font-medium text-gray-700 dark:text-gray-300">Welcome to AI Assistant!</p>
                                    <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                                        Ask me anything and I'll help you find the information you need.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm ${
                                            message.role === 'user'
                                                ? 'bg-primary-500 text-white rounded-tr-none'
                                                : 'bg-white dark:bg-dark-hover text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200 dark:border-gray-700'
                                            }`}
                                    >
                                        {message.content === '' && message.role === 'assistant' ? (
                                            <div className="flex items-center gap-2">
                                                <div className="animate-pulse">Thinking</div>
                                                <div className="flex space-x-1">
                                                    <div
                                                        className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"
                                                        style={{ animationDelay: '0ms' }}
                                                    ></div>
                                                    <div
                                                        className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"
                                                        style={{ animationDelay: '150ms' }}
                                                    ></div>
                                                    <div
                                                        className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"
                                                        style={{ animationDelay: '300ms' }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ) : message.role === 'assistant' ? (
                                            <div className="prose prose-sm max-w-none dark:prose-invert">
                                                <ReactMarkdown>{message.content}</ReactMarkdown>
                                            </div>
                                        ) : (
                                            <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                                        )}
                                        <span className="text-xs opacity-75 mt-1 block text-right">
                                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-background">
                        <div className="flex items-center space-x-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                                bg-gray-50 dark:bg-dark-hover text-gray-800 dark:text-gray-200 
                                focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                className="p-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 
                                transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
                                disabled={!inputMessage.trim() || isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 size={20} className="animate-spin" />
                                ) : (
                                    <Send size={20} />
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default ChatUI; 