'use client'

import { toMeasureArray } from '@/libs/utils/constants'
import { TypeUnits } from '@/libs/utils/types'
import { getPossibleUnits } from '@/libs/utils/utils'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

interface CreateMeasureProps {
  userId: string,
  redirectMeasure: (id: string) => void
}

const CreateMeasure: React.FC<CreateMeasureProps> = ({
  userId,
  redirectMeasure
}) => {
  const [error, setError ] = useState<string>('')
  const [units, setUnits] = useState<TypeUnits[]>([])

  const { register, watch, setValue, handleSubmit } = useForm()
  const toMeasureValue = watch('toMeasure')

  useEffect(() => {
    setUnits(getPossibleUnits(toMeasureValue))
  }, [toMeasureValue])

  if (units.length === 1) {
    setValue('useUnit', units[0])
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res: any = await axios.post('/api/measures', {
      ...data,
      userId
    })
    .catch((err) => {
      console.log('Create measure error', err)
      setError('Error creating measure')
    })

    if (res.data?.error) {
      setError(res.data.message)
    } else {
      redirectMeasure(res.data.id)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center mt-10 w-11/12 sm:w-2/4 bg-dark-2 p-3 rounded-lg border border-dark-border'>
      <h1 className='desktop-page-title block text-green-700 m-0'>Create Measure</h1>
      {error ? (
        <p className='text-sm text-red-1'>{error}</p>
      ) : null}
      <input {...register('name')} required className='font-semibold text-light-1 mt-6 w-full p-2 placeholder:text-light-3 outline-none bg-transparent border-2 border-green-900 hover:border-green-700 focus:border-green-700 rounded-md' placeholder='Measure Name' />
      <div className='mt-6 flex items-center justify-between w-full'>
        <p className='text-light-2 '>To measure: </p>
        <select {...register('toMeasure')} required className='exercise-form-select' defaultValue=''>
          <option className='exercise-form-option' value='' disabled>Select...</option>
          {toMeasureArray.map((item, i) => (
            <option key={i} className='exercise-form-option capitalize' value={item}>{item}</option>
          ))}
        </select>
      </div>
      
      {units.length === 0 || units.length > 1 ? (
        <div className='mt-6 flex items-center justify-between w-full'>
          <p className='text-light-2 '>Unit: </p>
          <select {...register('useUnit')} required className='exercise-form-select lowercase' defaultValue=''>
            <option className='exercise-form-option' value='' disabled>Select...</option>
            {units.map((item, i) => (
              <option key={i} className='exercise-form-option' value={item}>{item}</option>
            ))}
          </select>
        </div>
      ) : (
        <div className='mt-6 flex items-center justify-between w-full'>
          <p className='text-light-2 '>Unit: </p>
          <input {...register('useUnit')} disabled required className='exercise-form-select lowercase'/>
        </div>
      )}
      <div className='flex gap-3 w-full mt-8'>
        <button className='flex-1 button'>Save Measure</button>
      </div>
    </form>
  )
}

export default CreateMeasure