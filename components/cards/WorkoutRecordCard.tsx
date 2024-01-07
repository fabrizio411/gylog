'use client'

import Link from 'next/link'
import OptionsDots from '../icons/OptionsDots'
import { useState } from 'react'
import BackArrow from '../icons/BackArrow'

type Variant = 'GENERAL' | 'EXERCISE'

interface WorkoutRecordCardProps {
  variant: Variant
}

const WorkoutRecordCard: React.FC<WorkoutRecordCardProps> = ({ variant }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false)

  const handleOptionsOpen = () => {
    if (isOptionsOpen) setIsOptionsOpen(false)
    else setIsOptionsOpen(true)
  }

  const workoutData = [1, 2, 3, 4]
  return (
    <Link href={`/workout/view/123`} className='w-11/12 sm:w-full p-4 hover:bg-dark-hover bg-dark-2 rounded-lg border border-dark-border'>
      <div className='flex justify-between'>
        <div>
          <h3 className='text-light-1 font-bold text-lg'>Routine name</h3>
          <p className='text-light-3 text-sm'>NOV 11, 2023</p>
        </div>
        {variant === 'GENERAL' ? (
          <div className='cursor-pointer relative'>
            <div onClick={(e) => {
              e.preventDefault()
              handleOptionsOpen()
            }} className='p-1'>
              <OptionsDots className='fill-light-2 hover:fill-light-1'/>
            </div>
            <div className={`${isOptionsOpen ? '' : 'hidden'}`}>
              <div className='bg-dark-3 rounded-md absolute -top-2 right-8 w-36'>
                <p className='text-light-2 sm:text-light-3 hover:text-light-1 hover:bg-dark-2 p-3 border-b border-b-dark-border-2'>Add routines</p>
                <p className='text-light-2 sm:text-light-3 hover:text-light-1 hover:bg-dark-2 p-3 border-b border-b-dark-border-2'>Edit name</p>
                <p className='text-light-2 sm:text-light-3 hover:text-light-1 hover:bg-dark-2 p-3'>Delete file</p>
              </div>
            </div>
          </div>
        ) : (
          <BackArrow className='fill-light-1 rotate-180' />
        )}
      </div>
          
      {variant === 'GENERAL' ? (
        <div className='mt-2'>
          <div className='flex justify-between'>
            <p className='text-light-1 text-sm'>Exercise</p>
            <p className='text-light-1 text-sm'>Best set</p>
          </div>
          {workoutData.map((item, i) => (
            <div key={i} className='flex justify-between'>
              <p className='text-xs text-light-2'>3 x Bench press</p>
              <p className='text-xs text-light-2'>50kg x 12</p>
            </div>
          ))}
        </div>
      ) : (
        <div className='mt-2 flex flex-col gap-1'>
          {workoutData.map((item, i) => (
            <div key={i} className='flex justify-between items-center'>
              <p className='text-light-1 bg-dark-border rounded-full h-6 w-6 flex items-center justify-center'>{i + 1}</p>
              <p className='text-light-2'>20 kg x 16 reps</p>
            </div>
          ))}
        </div>
      )}
      
    </Link>
  )
}

export default WorkoutRecordCard