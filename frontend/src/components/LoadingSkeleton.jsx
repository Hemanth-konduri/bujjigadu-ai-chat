import React from 'react'

function LoadingSkeleton() {
  return (
    <div className='h-screen bg-slate-900 flex'>
      {/* LEFT SIDEBAR SKELETON */}
      <div className='w-80 border-r border-slate-700 bg-slate-800 p-4'>
        {/* HEADER SKELETON */}
        <div className='flex items-center gap-3 mb-4'>
          <div className='w-10 h-10 bg-slate-700 rounded-full animate-pulse'></div>
          <div className='flex-1'>
            <div className='h-4 bg-slate-700 rounded animate-pulse mb-2'></div>
            <div className='h-3 bg-slate-700 rounded animate-pulse w-16'></div>
          </div>
        </div>

        {/* SEARCH SKELETON */}
        <div className='h-10 bg-slate-700 rounded-lg animate-pulse mb-4'></div>

        {/* TABS SKELETON */}
        <div className='flex gap-4 mb-4'>
          <div className='h-8 bg-slate-700 rounded animate-pulse flex-1'></div>
          <div className='h-8 bg-slate-700 rounded animate-pulse flex-1'></div>
        </div>

        {/* CHAT LIST SKELETON */}
        <div className='space-y-3'>
          {[...Array(8)].map((_, i) => (
            <div key={i} className='flex items-center gap-3 p-3'>
              <div className='w-12 h-12 bg-slate-700 rounded-full animate-pulse'></div>
              <div className='flex-1'>
                <div className='h-4 bg-slate-700 rounded animate-pulse mb-2'></div>
                <div className='h-3 bg-slate-700 rounded animate-pulse w-3/4'></div>
              </div>
              <div className='h-3 bg-slate-700 rounded animate-pulse w-12'></div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT CHAT AREA SKELETON */}
      <div className='flex-1 bg-slate-900 flex flex-col'>
        {/* CHAT HEADER SKELETON */}
        <div className='bg-slate-800 border-b border-slate-700 p-4'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-slate-700 rounded-full animate-pulse'></div>
            <div className='flex-1'>
              <div className='h-4 bg-slate-700 rounded animate-pulse mb-2'></div>
              <div className='h-3 bg-slate-700 rounded animate-pulse w-20'></div>
            </div>
          </div>
        </div>

        {/* MESSAGES SKELETON */}
        <div className='flex-1 p-4 space-y-4'>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs p-3 rounded-lg ${i % 2 === 0 ? 'bg-cyan-600' : 'bg-slate-700'}`}>
                <div className='h-4 bg-slate-600 rounded animate-pulse mb-2'></div>
                <div className='h-4 bg-slate-600 rounded animate-pulse w-3/4'></div>
              </div>
            </div>
          ))}
        </div>

        {/* INPUT SKELETON */}
        <div className='bg-slate-800 border-t border-slate-700 p-4'>
          <div className='h-12 bg-slate-700 rounded-lg animate-pulse'></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSkeleton