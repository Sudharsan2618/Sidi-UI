// import { useState } from "react";
// import { Send } from "lucide-react";
// export default function ChatInput({ onSend }) {
//     const [message, setMessage] = useState("");

//     const handleSend = () => {
//         if (message.trim()) {
//             onSend(message);
//             setMessage("");
//         }
//     };

//     return (
//         <div className="flex justify-center ">

//             <div className="flex items-center gap-2 p-2 min-w-[40em] max-w-4xl ">
//                 <input
//                     type="text"
//                     placeholder="Type a message..."
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     onKeyDown={(e) => e.key === "Enter" && handleSend()}
//                     className="flex-1 p-2 border border-gray-300 rounded-[5px] focus:outline-none "
//                 />
//                 <button
//                     onClick={handleSend}
//                     disabled={!message.trim()}
//                     className={`px-4 py-2 text-white rounded-[5px] transition-all duration-200 flex items-center gap-1 ${message.trim() ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"}`}
//                 >
//                     <Send size={16} />
//                 </button>
//             </div>
//         </div>

//     );
// }


import { useState } from "react";
import { Send } from "lucide-react";

export default function ChatInput({ onSend }) {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (message.trim()) {
            onSend(message);
            setMessage("");
        }
    };

    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
            <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-md p-2 gap-2">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1 px-4 py-2 text-sm rounded-full border-none outline-none"
                />
                <button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className={`flex items-center justify-center p-2 rounded-full transition-all duration-200 ${message.trim()
                        ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    <Send size={18} />
                </button>
            </div>
        </div>
    );
}
