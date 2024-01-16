'use client'

import { useEffect, useState } from 'react'
import Measures from './Measures'
import { TypeMeasure } from '@/libs/utils/types'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import CreateMeasure from './CreateMeasure'

interface MeasuresPageAuxProps {
  userId: string
}

const MeasuresPageAux: React.FC<MeasuresPageAuxProps> = ({
  userId
}) => {
  const { register, watch, setValue } = useForm()
  const measureValue = watch('measure')

  // Handle redirect on create
  const redirectMeasure = (newMeasureId: string) => {
    setValue('measure', newMeasureId)
  }

  // Get measures
  const [measures, setMeasures] = useState<TypeMeasure[]>([])

  useEffect(() => {
    async function getMeasures() {
      const res: any = await axios.get('/api/measures')
      .catch((err) => console.log(err))

      setMeasures(res.data)
    }

    getMeasures()
  }, [])

  // Handle create measure
  const [isCreateActive, setIsCreateActive] = useState<boolean>(true)
  const newMeasureTxt = '+ New Measure'

  useEffect(() => {
    if (measureValue === newMeasureTxt) {
      setIsCreateActive(true)
    } else {
      if (isCreateActive) {
        setIsCreateActive(false)
      }
    }
  }, [measureValue])

  return (
    <div className='flex flex-col items-center'>
      <div className='mt-3 sm:mt-0 flex text-lg sm:justify-between justify-center gap-2'>
        <label className='text-light-1 font-semibold text-lg'>Select Measure:</label>
        <select {...register('measure')} className='outline-none bg-dark-1 text-light-2 hover:text-light-1 cursor-pointer text-center'>
          {measures.map((item, i) => (
            <option key={i} value={item._id} className='font-sans text-light-3 hover:text-light-2'>{item.name}</option>
          ))}
          <option className='font-sans text-light-3 hover:text-light-2'>{newMeasureTxt}</option>
        </select>
      </div>

      {!isCreateActive ? (
        <Measures userId={userId} measureId={measureValue} newMeasureTxt={newMeasureTxt} />
      ) : (
        <CreateMeasure userId={userId} redirectMeasure={redirectMeasure} />
      )}
    </div>
  )
}

export default MeasuresPageAux