'use client'

import { TypeExercise } from '@/libs/utils/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface ExerciseDisplayProps {
  exerciseId: string
}

const ExerciseDisplay: React.FC<ExerciseDisplayProps> = ({ exerciseId }) => {
  const [exercise, setExercise] = useState<TypeExercise | undefined>()

  useEffect(() => {
    async function getExercises() {
      const res: any = await axios.get(`/api/exercises/${exerciseId}`)
      .catch((error) => console.log(error))
      
      setExercise(res.data)
    }

    getExercises()
  }, [exerciseId])

  return (
    <div>
      {exercise ? (
        <p className='text-light-1'>{exercise.name}</p>
      ) : null}
    </div>
  )
}

export default ExerciseDisplay