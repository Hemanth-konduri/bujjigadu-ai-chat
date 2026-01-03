import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { MessageCircleIcon, LockIcon, MailIcon, LoaderIcon } from "lucide-react";
import { Link } from 'react-router-dom';
import BorderAnimatedContainer from '../components/BorderAnimatedContainer';
import GoogleOAuthButton from '../components/GoogleOAuthButton';

function LoginPage() {
    const [formData, setFormData] = useState({email:"", password:""});
    const {login, isLoggedIn} = useAuthStore();

    const handleSubmit = (e)=>{
      e.preventDefault();
      login(formData);
    }
    
  return (
    <div className='w-full flex items-center justify-center p-4 bg-slate-900 min-h-screen'>
        <div className='relative w-full max-w-4xl' >
          <BorderAnimatedContainer>
            <div className='w-full flex flex-col md:flex-row' >
              {/* LEFT SIDE OF FORM COLUMN */}
              <div className='md:w-1/2 w-full flex flex-col items-center justify-center p-6 bg-slate-800/60 backdrop-blur-sm' >
              <div className='w-full max-w-md' >
                {/* HEADING MESSAGE */}
                <div className='text-center mb-4'>
                  <MessageCircleIcon className="w-10 h-10 mx-auto text-slate-400 mb-3" />
                  <h2 className='text-2xl font-bold text-slate-200 mb-2' >Welcome back to Bujjigadu</h2>
                  <p className='text-slate-400' > Login to your account</p>
                </div>
                
                {/* FORM INPUTS */}
                <form action="" onSubmit={handleSubmit} className='space-y-4'>
                   <div className='flex flex-col gap-1' >
                    <label htmlFor="" className='block text-sm font-medium text-slate-300 mb-1'>Email</label>
                    <div className='relative'>
                      <MailIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                      <input type="email" value={formData.email} onChange={(e)=> setFormData({...formData, email:e.target.value}) } className='input' placeholder='johndoe@gmail.com' />
                    </div>
                  </div>
                   <div className='flex flex-col gap-1' >
                    <label htmlFor="" className='block text-sm font-medium text-slate-300 mb-1'>Password</label>
                    <div className='relative'>
                      <LockIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                      <input type="password" value={formData.password} onChange={(e)=> setFormData({...formData, password:e.target.value}) } className='input' placeholder='Enter your password' />
                    </div>
                  </div>

                  <div className='mt-8'>
                    <button className='auth-btn' type='submit' disabled={isLoggedIn}>
                      {isLoggedIn ? <LoaderIcon className='w-full h-5 mx-auto animate-spin text-center justify-center' /> : "Login"}
                    </button>
                  </div>

                  <div className='flex items-center my-4'>
                    <div className='flex-1 h-px bg-slate-600'></div>
                    <span className='px-3 text-slate-400 text-sm'>or</span>
                    <div className='flex-1 h-px bg-slate-600'></div>
                  </div>

                  <GoogleOAuthButton text="Continue with Google" />


                </form>
                <div className='mt-3 text-center'>
                  <Link to='/signup' className='auth-link'>
                  Don't have an account? <span className='text-slate-400' >Sign up</span>
                  </Link>
                </div>
              </div>
              </div>
              
              {/* RIGHT SIDE - IMAGE ILLUSTRATION */}
              <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
                <div>
                  <img
                    src="/login.png"
                    alt="Login illustration"
                    className="w-full h-auto object-contain"
                  />
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-medium text-cyan-400">Welcome Back!</h3>
                    <div className="mt-4 flex justify-center gap-4">
                      <span className="auth-badge">Secure</span>
                      <span className="auth-badge">Fast</span>
                      <span className="auth-badge">Reliable</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BorderAnimatedContainer>
        </div>
    </div>
  )
}

export default LoginPage