import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore';
import ChatHeader from './ChatHeader';

import NoChatHistoryPlaceholder from './NoChatHistoryPlaceholder';
import MessageInput from './MessageInput';
import MessagesLoadingSkeleton from './MessagesLoadingSleleton';

function ChatContainer() {
    const {selectedUser, getMessagesByUserId, messages, isMessagesLoading} = useChatStore();
    const{authUser} = useAuthStore();
useEffect(()=>{
    if(selectedUser?._id){
        getMessagesByUserId(selectedUser._id);
    }
}, [selectedUser?._id, getMessagesByUserId])

  return (
    <>
      <ChatHeader/>
      {/* CHAT COVERSATION SECTION */}
      <div className='flex-1 px-6 overflow-y-auto py-8'>
        {messages.length > 0 && !isMessagesLoading ? (
            <div className='mx-w-3xl mx-auto space-y-6'>
                {
                    messages.map((msg)=> (
                        <div key={msg._id} className={`flex ${msg.senderId === authUser._id ? 'justify-end' : 'justify-start'}`}>
                            <div className={`px-4 py-2 rounded-lg max-w-[60%] ${msg.senderId === authUser._id ? 'bg-cyan-500/10 text-slate-200' : 'bg-slate-800/50 text-slate-300'}`}>
                                {
                                    msg.image && (
                                        <img src={msg.image} alt="" className='rounded-lg h-48 object-cover' />
                                    )
                                }

                                {msg.text && (
                                    <p className='mt-2'>{msg.text}</p>
                                )}
                                
                                <p className='text-xs text-slate-400 mt-1 text-right gap-1 flex items-center opacity-80'>
                                    {
                                        new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
                                    }

                                </p>
                            </div>
                        </div>
                    ))
                }

            </div>

        ) : isMessagesLoading ? <MessagesLoadingSkeleton/> : (
            <NoChatHistoryPlaceholder name={selectedUser.fullName}/>
        )}

      </div>
      <MessageInput/>
    </>
  )
}

export default ChatContainer