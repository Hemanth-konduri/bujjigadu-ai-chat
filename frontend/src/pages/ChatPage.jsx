import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { LogOut } from 'lucide-react'

function ChatPage() {
  console.log('ChatPage component rendered');
  
  const { logout, authUser } = useAuthStore();
  console.log('Auth user:', authUser);
  console.log('Logout function:', logout);

  const handleLogout = () => {
    console.log('Logout button clicked');
    alert('Button clicked!');
    logout();
  }

  return (
    <div className='min-h-screen bg-slate-900 p-4'>
      {/* Simple test button at the very top */}
      <button 
        onClick={() => {
          console.log('TOP BUTTON CLICKED!');
          alert('TOP BUTTON WORKS!');
        }}
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          backgroundColor: 'green',
          color: 'white',
          padding: '20px',
          border: 'none',
          cursor: 'pointer',
          zIndex: 9999,
          fontSize: '16px'
        }}
      >
        CLICK ME
      </button>
      <div className='max-w-4xl mx-auto'>
        <div className='bg-slate-800 rounded-lg p-6'>
          <h1 className='text-2xl font-bold text-slate-200 mb-2'>Welcome to Bujjigadu Chat</h1>
          <p className='text-slate-400 mb-4'>Hello, {authUser?.fullName}!</p>
          
          <div className='mb-6'>
            <button 
              onClick={() => alert('Simple button clicked!')}
              style={{backgroundColor: 'red', color: 'white', padding: '15px 20px', border: 'none', cursor: 'pointer', marginRight: '10px', fontSize: '16px', position: 'relative', zIndex: 9999}}
            >
              Test Button
            </button>
            <button 
              onClick={handleLogout}
              style={{backgroundColor: 'blue', color: 'white', padding: '15px 20px', border: 'none', cursor: 'pointer', fontSize: '16px', position: 'relative', zIndex: 9999}}
            >
              Logout
            </button>
          </div>
          
          <div className='text-slate-300'>
            <p>Chat functionality coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage