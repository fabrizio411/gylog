'use client'

import ExerciseCard from '@/components/cards/ExerciseCard'
import { TypeExercise } from '@/libs/utils/types'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Exercises = () => {
  const [exercises, setExercises] = useState<TypeExercise[]>([])

  useEffect(() => {
    async function getRoutines() {
      const response : any = await axios.get('/api/exercises')
      .then(() => setExercises(response.data))
      .catch((error) => console.log(error))
    }

    getRoutines()
  }, [])

  return (
    <div className='routines-container gap-0 mt-5 sm:mt-3'>
      <ExerciseCard />
      <ExerciseCard />
      <ExerciseCard />
      <ExerciseCard />
      <ExerciseCard />
      <ExerciseCard />
      <ExerciseCard />
      <ExerciseCard />
      <ExerciseCard />
      <ExerciseCard />
      <ExerciseCard />
      <ExerciseCard />
      <ExerciseCard />
      <ExerciseCard />
      <ExerciseCard />
    </div>
  )
}

export default Exercises