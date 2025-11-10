import React, { useState, useRef } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore';
import { LogOutIcon, Volume2Icon, VolumeOffIcon } from 'lucide-react';

const mouseClickSound = new Audio('/sounds/mouse-click.mp3');

function ProfileHeader() {
    const {logout, authUser, updateProfile} = useAuthStore();
    const {isSoundEnabled, toggleSound} = useChatStore();
    const [selectedImg, setSelectedImg] = useState(null);

    const fileInputRef = useRef(null);

    const handleImageUpload = (e)=>{
        const file = e.target.files[0];
        if(!file) return;

        // Compress image before upload
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = async () => {
            // Set max dimensions to 400x400
            const maxSize = 400;
            let { width, height } = img;
            
            if (width > height) {
                if (width > maxSize) {
                    height = (height * maxSize) / width;
                    width = maxSize;
                }
            } else {
                if (height > maxSize) {
                    width = (width * maxSize) / height;
                    height = maxSize;
                }
            }
            
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
            setSelectedImg(compressedBase64);
            await updateProfile({profilePic: compressedBase64});
        };
        
        const reader = new FileReader();
        reader.onload = (e) => img.src = e.target.result;
        reader.readAsDataURL(file);
    };

  return (
    <div className='p-6 borber-b border-slate-700/50'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                {/* AVATAR IMAGE */}
                <div className='avatar-online'>
                    <button className='size-14 rounded-full overflow-hidden relative group' onClick={()=> fileInputRef.current.click()} >
                        <img src={selectedImg || authUser.profilePic || '/avatar.png'} alt='User Avatar' className='w-full h-full object-cover rounded-full group-hover:opacity-70 transition-opacity duration-200' />
                        <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity'>
                    
                    </div>
                    </button>
                    <input type="file" ref={fileInputRef} className='hidden' accept='image/*' onChange={handleImageUpload} />
                    
                   
                </div>

                {/* USER INFO  AND ONLINE TEXT*/}
                <div>
                    <p className='font-medium text-slate-200'>{authUser.fullName || "Unnamed User"}</p>
                    <div className='flex items-center gap-2'>
                        <div className='w-2 h-2 rounded-full bg-green-500'></div>
                        <p className='text-sm text-slate-400'>Online</p>
                    </div>
                </div>

            </div>

            {/* BUTTONS */}
            <div className='flex gap-4 items-center'>
                {/* LOGOUT BTN */}
                <button className='text-slate-400 hover:text-slate-200 transition-colors' onClick={logout} >
                    <LogOutIcon className='size-5'/>

                </button>

                {/* SOUND TOGGLE BTN */}
                <button className='text-slate-400 hover:text-slate-200 transition-colors' onClick={()=> {
                    mouseClickSound.currentTime =0;
                    mouseClickSound.play().catch((error)=> console.log("Audio play failed ", error));
                    toggleSound();
                }}>
                    {
                        isSoundEnabled ? (
                            <Volume2Icon className='size-5'/>
                        ) : (
                            <VolumeOffIcon className='size-5'/>
                        )
                    }

                </button>

            </div>

            {/* <div className='flex items-center gap-3'>
                <div className='cursor-pointer' onClick={logout}>
                    <img src='/logout.png' alt='Logout' className='w-6 h-6 object-contain' />

                </div>
               
            </div> */}

            {/* <div className='flex items-center gap-3'>
                <div className='cursor-pointer' onClick={toggleSound}>
                    <img src={isSoundEnabled ? '/sound-on.png' : '/sound-off.png'} alt='Sound' className='w-6 h-6 object-contain' />

                </div>

            </div> */}

        </div>

    </div>
  )
}

export default ProfileHeader