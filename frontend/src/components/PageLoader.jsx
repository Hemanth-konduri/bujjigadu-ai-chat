import React from 'react'
import {LoaderIcon} from "lucide-react";

function PageLoader() {
  return (
    <div className='flex item-center justify-center h-screen'>
        <LoaderIcon className='w-10 h-10 text-white animate-spin' />
    </div>
  )
}

export default PageLoader