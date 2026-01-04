import React, { useState, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import { Send, Smile, Paperclip, Mic, Image as ImageIcon } from 'lucide-react'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import useKeyboardSound from '../hooks/useKeyboardSound'

function EnhancedMessageInput() {
  const [text, setText] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const fileInputRef = useRef(null)
  const imageInputRef = useRef(null)
  
  const { sendMessage, selectedUser, isSoundEnabled } = useChatStore()
  const { playRandomKeyStrokeSound } = useKeyboardSound()

  const emojis = ['😀', '😂', '😍', '🥰', '😊', '😎', '🤔', '😢', '😡', '👍', '👎', '❤️', '🔥', '💯', '🎉', '👏']

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!text.trim() && !imagePreview) return

    try {
      await sendMessage(selectedUser._id, {
        text: text.trim(),
        image: imagePreview
      })
      setText('')
      setImagePreview(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
      if (imageInputRef.current) imageInputRef.current.value = ''
    } catch (error) {
      // Error handled in store
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const img = document.createElement('img')
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = 400
        canvas.height = 400
        ctx.drawImage(img, 0, 0, 400, 400)
        const compressedImage = canvas.toDataURL('image/jpeg', 0.7)
        setImagePreview(compressedImage)
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  }

  const handleEmojiClick = (emoji) => {
    setText(prev => prev + emoji)
    setShowEmojiPicker(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
    if (isSoundEnabled) playRandomKeyStrokeSound()
  }

  return (
    <div className="bg-slate-800 border-t border-slate-700 p-4">
      {/* IMAGE PREVIEW */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-slate-600"
            />
            <button
              onClick={() => setImagePreview(null)}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white text-sm"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* EMOJI PICKER */}
      {showEmojiPicker && (
        <div className="mb-3 p-3 bg-slate-700 rounded-lg border border-slate-600">
          <div className="grid grid-cols-8 gap-2">
            {emojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmojiClick(emoji)}
                className="text-xl hover:bg-slate-600 rounded p-1 transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* INPUT AREA */}
      <form onSubmit={handleSendMessage} className="flex items-end gap-2">
        {/* ATTACHMENT BUTTONS */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-full transition-colors"
          >
            <Smile size={20} />
          </button>
          
          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-full transition-colors"
          >
            <ImageIcon size={20} />
          </button>
          
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-full transition-colors"
          >
            <Paperclip size={20} />
          </button>
        </div>

        {/* TEXT INPUT */}
        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="w-full max-h-32 min-h-[44px] px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            rows={1}
          />
        </div>

        {/* SEND/MIC BUTTON */}
        {text.trim() || imagePreview ? (
          <button
            type="submit"
            className="p-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full transition-colors"
          >
            <Send size={18} />
          </button>
        ) : (
          <button
            type="button"
            className="p-3 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-full transition-colors"
          >
            <Mic size={18} />
          </button>
        )}

        {/* HIDDEN FILE INPUTS */}
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          className="hidden"
        />
      </form>
    </div>
  )
}

export default EnhancedMessageInput