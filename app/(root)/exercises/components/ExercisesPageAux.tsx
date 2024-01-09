'use client'

import Exercises from './Exercises'
import { musclesArray } from '@/libs/utils/constants'
import SearchIcon from '@/components/icons/SearchIcon'
import CreateExercise from '@/components/actions/CreateExercise'
import { useState } from 'react'

interface ExercisesPageAuxProps {
  userId: string
}

const ExercisesPageAux: React.FC<ExercisesPageAuxProps> = ({
  userId
}) => {
  // Handle edit
  const [isComplete, setIsComplete] = useState<boolean>(false)

  const handleComplete = () => {
    setIsComplete(true)
  }

  return (
    <>
      <div className='flex justify-center sm:justify-between items-center'>
        <h2 className='desktop-page-title'>Exercises</h2>
        <CreateExercise variant='CREATE' userId={userId} handleComplete={handleComplete}/>
      </div>
      <div className='w-11/12 sm:w-full flex gap-2 mt-5 self-center'>
        <label htmlFor='search' className='relative cursor-text flex-1 bg-dark-3 border border-dark-border rounded-xl p-3'>
          <input id='search' type='text' placeholder='Search' className='peer pl-10 w-full bg-transparent outline-none text-light-1 placeholder:text-light-3' />
          <div className='absolute top-1/2 -translate-y-1/2 left-4'>
            <SearchIcon className='fill-light-3' />
          </div>
        </label>
        <select className='bg-dark-border hover:bg-light-3 text-light-1 pl-5 sm:pl-8 pr-5 sm:pr-8 text-sm sm:text-base rounded-xl appearance-none max-h-40 overflow-y-auto'>
          <option className='font-sans'>All muscles</option>
          {musclesArray.map((muscle, i) => (
            <option key={i} className='capitalize font-sans' value={muscle}>{muscle}</option>
          ))}
        </select>
      </div>

      <Exercises isComplete={isComplete} setIsComplete={setIsComplete} />
    </>
  )
}

export default ExercisesPageAux