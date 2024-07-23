import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({path}) => {
  let location = useLocation();
  let navigate = useNavigate();
  const [count, setCount] = useState(3);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => --prevCount);
    }, 1000)
    if(count === 0){
      navigate(path, {
        state: location.pathname
      });
    }
    return () => {
      clearInterval(interval);
    }
  }, [count, navigate]);
  return (
    <div className='gap-2 flex flex-row justify-center items-center w-[100vw] h-[100vh] mt-32 left-auto right-auto'>
      <div className='sm:text-3xl text-xl font-semibold font-sans text-slate-800'>Redirecting in {count}</div>
        <div className="spinner-border" role="status">
            <span className="sr-only">
                Loading...
            </span>
        </div>
    </div>
  )
}

export default Spinner
