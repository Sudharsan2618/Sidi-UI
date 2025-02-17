import { useState, useRef, useEffect } from "react";
import { Paperclip, Send, X, Maximize, Minimize } from "lucide-react";
import { useCustomChat } from "../utils/Hooks/useCustomeChat";
import botImage from "../assets/images/bot.png"
export default function Chatbot() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useCustomChat();
    const messagesEndRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    useEffect(() => scrollToBottom(), [messages]);

    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className=" size-14 fixed bottom-4 right-7 bg-primary hover:bg-primary-dark text-white p-4 rounded-full shadow-yellowGlow transition-transform hover:scale-110"
                >
                    <img className=" w-full h-full" src={botImage} alt="bot image" />
                </button>
            )}
            {isOpen && (
                <div
                    className={`fixed ${isFullScreen ? "inset-0" : "bottom-4 right-4 w-96 h-[32rem]"} bg-white rounded-lg shadow-xl flex flex-col border  transition-all duration-300`}
                >
                    <div className="flex justify-between items-center p-4 border-b bg-primary text-white rounded-t-lg">
                        <h2 className="text-lg font-semibold">AI Chatbot</h2>
                        <div className="flex space-x-2">
                            <button onClick={() => setIsFullScreen(!isFullScreen)} className="text-white hover:opacity-75">
                                {isFullScreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                            </button>
                            <button onClick={() => setIsOpen(false)} className="text-white hover:opacity-75">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-neutral-light">
                        {messages.map((m, index) => (
                            <div key={index} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[75%] px-4 py-2 rounded-lg shadow-md ${m.role === "user" ? "bg-primary text-white" : "bg-secondary text-gray-800"}`}>
                                    {m.content}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="p-4 border-t bg-white">
                        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                            <input
                                className="flex-grow px-3 py-2 border rounded focus:ring-2 focus:ring-primary-light"
                                value={input}
                                placeholder="Type your message here..."
                                onChange={handleInputChange}
                            />
                            <button type="submit" disabled={isLoading} className="btn  disabled:opacity-50">
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
