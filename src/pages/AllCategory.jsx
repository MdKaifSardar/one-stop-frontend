import React, { useEffect } from 'react'
import { useContext } from 'react'
import CategoryContext from '../context/categoryContext'
import { Link } from 'react-router-dom'

const AllCategory = () => {
    const context = useContext(CategoryContext)
    const { showAllCategory, categories} = context;

    useEffect(() => {showAllCategory()}, []);
  return (
    <div className='mt-[75px] grid gap-4 grid-row-auto grid-cols-2'>
      {
        categories && categories.length? categories.map((cat, index) => (
            <div key={index} className='p-2 bg-blue-500 text-white'> <Link></Link> {cat.name}</div>
        )): <div>no categories found</div>
      }
    </div>
  )
}

export default AllCategory
