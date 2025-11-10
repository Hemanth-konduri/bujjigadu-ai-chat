import React from 'react'
import { X } from 'lucide-react'

function ImageModal({ src, alt, isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={onClose}>
      <div className="relative max-w-4xl max-h-[90vh] p-4">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full p-2 z-10"
        >
          <X size={20} />
        </button>
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-full object-contain rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  )
}

export default ImageModal