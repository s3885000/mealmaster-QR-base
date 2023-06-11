import React from 'react'
import './boxes.css'
import { Collapse } from '../../asset/icons/index.js';

const Boxes = () => {
  return (
    <div>
      <div className='relative w-[400px] overflow-hidden'>
        <input type="checkbox" className='absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer peer'/>
        <div className='bg-blue-500 h-12 w-full pl-5 flex items-center'>
          <h1 className='font-semibold text-white'>
            Header is here
          </h1>
        </div>

        {/* arrow icon */}
        <div className='absolute top-5 right-3 text-white transition-transform duration-500 rotate-0 peer-checked:rotate-180'>
          <Collapse/>
        </div>

        {/* content */}
        <div className='bg-white overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-40'>
          <div className='p-4'>
            content
          </div>
        </div>
      </div>
    </div>
  )
}

export default Boxes