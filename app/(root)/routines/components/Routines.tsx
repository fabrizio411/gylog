'use client'

import FileCard from '@/components/cards/FileCard'
import RoutineCard from '@/components/cards/RoutineCard'
import { TypeRoutine } from '@/libs/utils/types'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Routines = () => {
  const [routines, setRoutines] = useState<TypeRoutine[]>([])

  useEffect(() => {
    async function getRoutines() {
      const response : any = await axios.get('/api/routines')
      .then(() => setRoutines(response.data))
      .catch((error) => console.log(error))
    }

    getRoutines()
  }, [])

  return (
    <div className='routines-container mt-5 sm:mt-3'>
      <>
        <FileCard />
        <FileCard />
      </>
      <>
        <RoutineCard />
        <RoutineCard />
        <RoutineCard />
        <RoutineCard />
        <RoutineCard />
        <RoutineCard />
        <RoutineCard />
      </>
    </div>
  )
}

export default Routines