import React, { useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { Send, Image } from 'lucide-react'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'

function MessageInput() {
    const [text, setText] = useState("")
    const [imagePreview, setImagePreview] = useState(null)
    const { selectedUser, getMessagesByUserId } = useChatStore()

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = () => {
            setImagePreview(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const removeImage = () => {
        setImagePreview(null)
    }

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (!text.trim() && !imagePreview) return

        try {
            await axiosInstance.post(`/message/send/${selectedUser._id}`, {
                text: text.trim(),
                image: imagePreview
            })

            setText("")
            setImagePreview(null)
            getMessagesByUserId(selectedUser._id)
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to send message")
        }
    }

    return (
        <div className="p-4 border-t border-slate-700/50">
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-slate-700" />
                        <button
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-200"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2">
                    <input
                        type="text"
                        className="w-full input input-bordered rounded-lg border-slate-700 bg-slate-800/50 text-slate-200"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                        id="image-upload"
                    />

                    <button
                        type="button"
                        className="hidden sm:flex btn btn-circle bg-slate-800/50 border-slate-700 hover:bg-slate-700/50"
                        onClick={() => document.getElementById("image-upload")?.click()}
                    >
                        <Image size={20} />
                    </button>
                </div>
                <button
                    type="submit"
                    className="btn btn-sm btn-circle bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-500/50"
                    disabled={!text.trim() && !imagePreview}
                >
                    <Send size={22} />
                </button>
            </form>
        </div>
    )
}

export default MessageInput