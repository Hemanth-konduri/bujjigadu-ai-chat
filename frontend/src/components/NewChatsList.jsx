import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { formatDistanceToNow } from 'date-fns';
import UsersLoadingSkeleton from './UsersLoadingSkeleton';
import NoChatsFound from './NoChatsFound';

function ChatsList({ searchQuery = '' }) {
  const { getMyChatPartners, chats, isUserLoading, setSelectedUser, selectedUser } = useChatStore();
  const { authUser, onlineUsers } = useAuthStore();
  
  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  const filteredChats = chats.filter(chat => 
    chat.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
        
  if(isUserLoading) return <UsersLoadingSkeleton/>
  if(filteredChats.length === 0) return <NoChatsFound/>
        
  return (
    <div className='divide-y divide-slate-700'>
      {filteredChats.map((chat) => (
        <div
          key={chat._id}
          className={`p-4 cursor-pointer hover:bg-slate-700/50 transition-colors ${
            selectedUser?._id === chat._id ? 'bg-slate-700/70' : ''
          }`}
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={chat.profilePic || "/avatar.png"} 
                alt={chat.fullName}
                className="w-12 h-12 rounded-full object-cover"
              />
              {onlineUsers.includes(chat._id) && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-800 rounded-full"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-slate-200 font-medium truncate">{chat.fullName}</h4>
                <span className="text-slate-400 text-xs">
                  {formatDistanceToNow(new Date(chat.updatedAt), { addSuffix: false })}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-slate-400 text-sm truncate">
                  Last message preview...
                </p>
                <div className="flex items-center gap-1">
                  <span className="text-xs bg-cyan-500 text-white rounded-full px-2 py-1 min-w-[20px] text-center">
                    2
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChatsList