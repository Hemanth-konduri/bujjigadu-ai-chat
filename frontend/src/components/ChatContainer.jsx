import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { Phone, Video, MoreVertical, ArrowLeft } from "lucide-react";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import EnhancedMessageInput from "./EnhancedMessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSleleton";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessagesByUserId(selectedUser._id);
    }
  }, [selectedUser?._id, getMessagesByUserId]);

  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="h-full flex flex-col">
      {/* CHAT HEADER */}
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-slate-400 hover:text-slate-200">
              <ArrowLeft size={20} />
            </button>
            <img 
              src={selectedUser.profilePic || '/avatar.png'} 
              alt={selectedUser.fullName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="text-slate-200 font-medium">{selectedUser.fullName}</h3>
              <p className="text-slate-400 text-sm">Online</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-full">
              <Phone size={18} />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-full">
              <Video size={18} />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-full">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 bg-slate-900" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23334155" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}>
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              >
                <div
                  className={`chat-bubble relative ${
                    msg.senderId === authUser._id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {msg.image && (
                    <img src={msg.image} alt="Shared" className="rounded-lg h-48 object-cover" />
                  )}
                  {msg.text && <p className="mt-2">{msg.text}</p>}
                  <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {/* 👇 scroll target */}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>

      <EnhancedMessageInput />
    </div>
  );
}

export default ChatContainer;