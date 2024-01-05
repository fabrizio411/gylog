'use client'

import { getParam } from '@/libs/utils/utils'
import ExerciseDisplay from '../components/ExerciseDisplay';
import { useEffect, useState } from 'react';
import { TypeExercise } from '@/libs/utils/types';
import axios from 'axios';

const ExerciseOnePage = async ({
  params
}: {
  params: { id: string }
}) => {
  const { id } = params
  const exerciseId = getParam(id)

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
    <main className='main-container'>
      <div>
        {exercise ? (
          <p className='text-light-1'>{exercise.name}</p>
        ) : null}
      </div>
    </main>
  )
}

export default ExerciseOnePage