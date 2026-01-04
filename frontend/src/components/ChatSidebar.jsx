import React, { useState, useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore'
import { Search, MessageCircle, Users, Plus, MoreVertical } from 'lucide-react'
import NewChatsList from './NewChatsList'
import ContactList from './ContactList'

function ChatSidebar() {
  const { authUser } = useAuthStore()
  const { activeTab, setActiveTab, getAllContacts, getMyChatPartners } = useChatStore()
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    getAllContacts()
    getMyChatPartners()
  }, [getAllContacts, getMyChatPartners])

  return (
    <div className='h-full flex flex-col'>
      {/* HEADER */}
      <div className='bg-slate-800 p-4 border-b border-slate-700'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-3'>
            <img 
              src={authUser?.profilePic || '/avatar.png'} 
              alt={authUser?.fullName}
              className='w-10 h-10 rounded-full object-cover'
            />
            <div>
              <h3 className='text-slate-200 font-medium'>{authUser?.fullName}</h3>
              <p className='text-slate-400 text-sm'>Online</p>
            </div>
          </div>
          <button className='text-slate-400 hover:text-slate-200'>
            <MoreVertical size={20} />
          </button>
        </div>

        {/* SEARCH */}
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400' size={16} />
          <input
            type='text'
            placeholder='Search chats...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500'
          />
        </div>
      </div>

      {/* TABS */}
      <div className='bg-slate-800 border-b border-slate-700'>
        <div className='flex'>
          <button
            onClick={() => setActiveTab('chats')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'chats' 
                ? 'text-cyan-400 border-b-2 border-cyan-400' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageCircle size={16} />
            Chats
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'contacts' 
                ? 'text-cyan-400 border-b-2 border-cyan-400' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users size={16} />
            Contacts
          </button>
        </div>
      </div>

      {/* CHAT LIST */}
      <div className='flex-1 overflow-y-auto'>
        {activeTab === 'chats' ? (
          <NewChatsList searchQuery={searchQuery} />
        ) : (
          <ContactList searchQuery={searchQuery} />
        )}
      </div>

      {/* NEW CHAT BUTTON */}
      <div className='p-4 border-t border-slate-700'>
        <button className='w-full flex items-center justify-center gap-2 py-2 px-4 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors'>
          <Plus size={16} />
          New Chat
        </button>
      </div>
    </div>
  )
}

export default ChatSidebar