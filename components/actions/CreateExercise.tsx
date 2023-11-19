'use client'

import { musclesArray } from '@/libs/utils/constants'
import axios from 'axios'
import { useState } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import ModalLayout from '../others/ModalLayout'

const CreateExercise = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOpen = () => {
    if (isOpen) setIsOpen(false)
    else setIsOpen(true)
  }

  if (isOpen) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }
  
  const { register, handleSubmit, reset } = useForm()

  const handleCancel = () => {
    handleOpen()
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data)
  }

  return (
    <>
      <button onClick={handleOpen} className='button w-11/12 sm:w-auto mt-2 sm:mt-0'>Create Exercise</button>
      <ModalLayout isOpen={isOpen} handleOpen={handleOpen}>
        <form onSubmit={handleSubmit(onSubmit)} className='modal-content flex flex-col items-center'>
          <h3 className='desktop-page-title block text-green-700'>Create Exercise</h3>
          <input {...register('name')} className='font-semibold text-light-1 mt-6 w-full p-2 placeholder:text-light-3 outline-none bg-transparent border-2 border-green-900 hover:border-green-700 focus:border-green-700 rounded-md' placeholder='Exercise name' />
          <div className='mt-6 flex items-center justify-between w-full'>
            <p className='text-light-2 '>Exercise type</p>
            <select {...register('category')} className='exercise-form-select' defaultValue=''>
              <option className='exercise-form-option' value='' disabled>Select...</option>
              <option className='exercise-form-option' value='reps/weight'>Weight Reps</option>
              <option className='exercise-form-option' value='reps'>Reps Only</option>
              <option className='exercise-form-option' value='dur'>Duration</option>
              <option className='exercise-form-option' value='dur/weight'>Weight Duration</option>
              <option className='exercise-form-option' value='dist'>Distance</option>
              <option className='exercise-form-option' value='dist/dur'>Distance Duration</option>
            </select>
          </div>
          <div className='mt-6 flex items-center justify-between w-full'>
            <p className='text-light-2 '>Main muscle</p>
            <select {...register('muscle')} className='exercise-form-select' defaultValue=''>
              <option className='exercise-form-option' value='' disabled>Select...</option>
              {musclesArray.map(muscle => (
                <option key={muscle} className='exercise-form-option capitalize' value={muscle}>{muscle}</option>
              ))}
            </select>
          </div>
          <div className='flex gap-3 w-full mt-8'>
            <div onClick={handleCancel} className='flex-1 button bg-dark-border hover:bg-light-3'>Cancel</div>
            <button className='flex-1 button'>Save Exercise</button>
          </div>
        </form>
      </ModalLayout>
    </>
  )
}

export default CreateExercise