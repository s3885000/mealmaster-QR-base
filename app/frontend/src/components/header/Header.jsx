import React from 'react'
import './header.css'
import {Buttons} from '../../components'
import { ProfilePic} from '../../asset/images/index.js';

const Header = () => {
  return (
    <div className='flex flex-row'>
      <div className='flex basis-1/2 justify-start flex-row'>
        <div className='w-14 h-14 bg-primary rounded-lg'>
          <ProfilePic className='w-14 h-14'/>
        </div>
        <div className='flex flex-col'>
          <p>text</p>
          <p>text</p>
        </div>
      </div>
      <div className='flex basis-1/2 justify-end'>
        <Buttons context="cart"></Buttons>
      </div>
    </div>
  )
}

export default Header