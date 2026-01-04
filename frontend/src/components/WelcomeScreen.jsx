import React from 'react'
import { MessageCircle, Shield, Zap } from 'lucide-react'

function WelcomeScreen() {
  return (
    <div className='h-full flex flex-col items-center justify-center bg-slate-900 p-8'>
      <div className='text-center max-w-md'>
        <div className='mb-8'>
          <div className='w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center'>
            <MessageCircle size={64} className='text-white' />
          </div>
          <h1 className='text-3xl font-bold text-slate-200 mb-4'>
            Welcome to Bujjigadu Chat
          </h1>
          <p className='text-slate-400 text-lg mb-8'>
            Select a chat to start messaging or create a new conversation
          </p>
        </div>

        <div className='space-y-4'>
          <div className='flex items-center gap-3 text-slate-300'>
            <div className='w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center'>
              <Zap size={16} className='text-cyan-400' />
            </div>
            <span>Real-time messaging</span>
          </div>
          <div className='flex items-center gap-3 text-slate-300'>
            <div className='w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center'>
              <Shield size={16} className='text-cyan-400' />
            </div>
            <span>End-to-end security</span>
          </div>
          <div className='flex items-center gap-3 text-slate-300'>
            <div className='w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center'>
              <MessageCircle size={16} className='text-cyan-400' />
            </div>
            <span>Group conversations</span>
          </div>
        </div>

        <div className='mt-12 text-slate-500 text-sm'>
          <p>Your personal messages are end-to-end encrypted</p>
        </div>
      </div>
    </div>
  )
}

export default WelcomeScreen