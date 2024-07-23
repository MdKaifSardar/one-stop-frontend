import React from 'react'
import { useNavigate } from 'react-router-dom';

const Pagenotfound = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate('/');
  };

  return (
    <section className='h-screen mt-[75px] mx-auto flex flex-col justify-center items-center'>
        <div className='flex flex-col justify-center items-center px-2 rounded-lg gap-2'> 
            <div className='text-6xl font-bold'>
                404
            </div>
            <div className='text-center sm:text-xl text-lg font-semibold'>
                Oops! page not found
            </div>
            <button className='text-center sm:text-2xl text-lg p-2 border-gray-700 border-2 hover:bg-slate-500/10' onClick={goToHomePage}>Go Back</button>
        </div>
    </section>

  )
}

export default Pagenotfound
