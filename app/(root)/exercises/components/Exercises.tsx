'use client'

import ExerciseCard from '@/components/cards/ExerciseCard'
import { TypeExercise } from '@/libs/utils/types'
import axios from 'axios'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface ExerciseProps {
  isComplete: boolean,
  setIsComplete: Dispatch<SetStateAction<boolean>>
}

const Exercises: React.FC<ExerciseProps> = ({
  isComplete,
  setIsComplete
}) => {
  const [exercises, setExercises] = useState<TypeExercise[]>([])

  useEffect(() => {
    async function getExercises() {
      const res: any = await axios.get('/api/exercises')
      .catch((error) => console.log(error))
      
      setExercises(res.data)
    }

    getExercises()

    setIsComplete(false)
  }, [isComplete, setIsComplete])

  return (
    <div className='routines-container gap-0 mt-5 sm:mt-3'>
      {exercises.map(exercise => (
        <ExerciseCard 
          key={exercise._id.toString()}
          _id={exercise._id.toString()}
          name={exercise.name}
          muscle={exercise.muscle}
          userId={exercise?.user?.toString()}
        />
      ))}
    </div>
  )
}

export default Exercises