import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import ChatSidebar from '../components/ChatSidebar';
import ChatContainer from '../components/ChatContainer';
import WelcomeScreen from '../components/WelcomeScreen';
import LoadingSkeleton from '../components/LoadingSkeleton';

function ChatPage() {
  const { selectedUser, isUserLoading } = useChatStore();
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <LoadingSkeleton />;
  }

  if (!authUser) {
    return <div>Please login to continue</div>;
  }

  return (
    <div className='h-screen bg-slate-900 flex'>
      {/* LEFT SIDEBAR */}
      <div className='w-80 border-r border-slate-700 bg-slate-800'>
        <ChatSidebar />
      </div>
      
      {/* RIGHT CHAT AREA */}
      <div className='flex-1 flex flex-col bg-slate-900'>
        {selectedUser ? (
          <ChatContainer />
        ) : (
          <WelcomeScreen />
        )}
      </div>
    </div>
  )
}

export default ChatPage