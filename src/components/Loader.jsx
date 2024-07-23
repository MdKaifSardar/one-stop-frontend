import React from 'react'
import { spinner } from '../assets/icons'

const Loader = () => {
  return (
    <div className='rounded-full shadow bg-slate-500/10 p-2 fixed top-12 z-10 right-auto left-auto flex flex-row justify-center items-center h-10 w-10'>
      <img src={spinner} alt="spinner" />
    </div>
  )
}

export default Loader
