'use client'

import { useState } from 'react'
import BackArrow from '../icons/BackArrow'
import RoutineCard from './RoutineCard'
import OptionsDots from '../icons/OptionsDots'

const FileCard = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false)

  const handleCollapse = () => {
    if (isCollapsed) setIsCollapsed(false)
    else setIsCollapsed(true)
  }

  const handleOptionsOpen = () => {
    if (isOptionsOpen) setIsOptionsOpen(false)
    else setIsOptionsOpen(true)
  }

  return (
    <article id='filecard' className='w-11/12 sm:w-full pt-4 pb-4 pr-4 pl-2 bg-dark-border-2 rounded-md'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <div className='cursor-pointer relative'>
            <div onClick={handleOptionsOpen} className='p-1'>
              <OptionsDots className='fill-light-2 hover:fill-light-1'/>
            </div>
            <div className={`${isOptionsOpen ? '' : 'hidden'}`}>
              <div className='bg-dark-3 rounded-md absolute -top-2 left-8 w-36'>
                <p className='text-light-2 sm:text-light-3 hover:text-light-1 hover:bg-dark-2 p-3 border-b border-b-dark-border-2'>Add routines</p>
                <p className='text-light-2 sm:text-light-3 hover:text-light-1 hover:bg-dark-2 p-3 border-b border-b-dark-border-2'>Edit name</p>
                <p className='text-light-2 sm:text-light-3 hover:text-light-1 hover:bg-dark-2 p-3'>Delete file</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className='text-light-1'>File name</h3>
            <p className='text-xs text-light-2'>3 routines</p>
          </div>
        </div>
        <div onClick={handleCollapse} className='fill-light-1 relative'>
          <BackArrow className={`transition-transform ease-in-out ${isCollapsed ? '-rotate-90' : 'rotate-90'}`}/>
        </div>
      </div>
      <div className={`routines-container gap-2 mt-4 overflow-hidden transition-all ${isCollapsed && 'hidden'}`}>
        <RoutineCard className='w-full' />
        <RoutineCard className='w-full' />
        <RoutineCard className='w-full' />
      </div>
    </article>
  )
}

export default FileCard