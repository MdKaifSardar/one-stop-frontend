import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };
  return (
    <section className='w-[100%] flex flex-col justify-center items-center mt-auto font-sans font-semibold sm:text-2xl text-md text-white'>
        <button onClick={scrollToTop} className='w-full h-fit py-2 bg-gradient-to-t from-slate-400 to-slate-300'>
            To The Top
        </button>
        <div className='text-center py-2 w-full bg-slate-500/50 sm:text-2xl text-lg font-semibold font-sans text-white'>
            All right reserved &copy; TeamName
        </div>
        <div className='py-4 bg-gradient-to-t from-slate-600 to-slate-400 w-full flex flex-row justify-evenly items-start'>
            <div className='flex flex-col justify-center items-center gap-2'>
                <div className='heading-footer'>Meet the team</div>
                <div className='footer-small-text'>Durgeshwar Kumar</div>
                <div className='footer-small-text'>Md Kaif Sardar</div>
                <div className='footer-small-text'>Sourashmi Das</div>
                <div className='footer-small-text'>Supratim Mondal</div>
                <div className='footer-small-text'>Rupam Sarkar</div>
            </div>
            <div className='flex flex-col justify-center items-center gap-2'>
                <div className='heading-footer'>Contact Us</div>
                <Link to="/contact" className='footer-small-text'>Contact</Link>
                <div className='footer-small-text'>Email1</div>
                <div className='footer-small-text'>Email2</div>
                <div className='footer-small-text'>Email3</div>
            </div>
            <div className='flex flex-col justify-center items-center gap-2'>
                <div className='heading-footer'>Policies</div>
                <div className='footer-small-text'>Our Policies</div>
                <div className='footer-small-text'>Know more about our company</div>
                <div className='footer-small-text'>Lorem ipsum dolor sit.</div>
            </div>
        </div>
    </section>
  )
}

export default Footer
