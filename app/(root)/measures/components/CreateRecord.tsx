import ModalLayout from '@/components/others/ModalLayout'
import { TypeMeasure, TypeMeasureRecord } from '@/libs/utils/types'
import { formatInputDate } from '@/libs/utils/utils'
import axios from 'axios'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

type Variant = 'EDIT' | 'CREATE'

interface CreateRecordProps {
  variant: Variant,
  userId: string,
  openHandler: () => void,
  isOpen: boolean
  handleComplete: () => void,
  measure?: TypeMeasure,
  record?: TypeMeasureRecord
}

const CreateRecord: React.FC<CreateRecordProps> = ({
  variant,
  userId,
  openHandler,
  isOpen,
  handleComplete,
  measure,
  record
}) => {
  let newDate = new Date()
  if (record) {
    newDate = new Date(record.date)
  }

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      date: formatInputDate(newDate.toString()),
      value: record?.value || undefined
    }
  })
  const [error, setError] = useState<string>('')

  const handleCancel = () => {
    openHandler()
    reset()
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (variant === 'CREATE' && measure) {
      const res: any = await axios.post('/api/measures/records', {
        ...data,
        userId,
        measureId: measure._id,
        unit: measure.useUnit
      })
      .catch((err) => {
        console.log('Create exercise error', err)
        setError('Error creating exercise')
      })

      if (res.data?.error) {
        setError(res.data.message)
      } else {
        openHandler()
        reset()
        handleComplete()
      }
    }
  }

  // Handle delete
  const handleDelete = () => {
    if (variant === 'EDIT' && record) {
      axios.delete(`/api/measures/records/${record._id}`)
      .catch((err) => console.log(err))

      openHandler()
      handleComplete()
    }
  }

  return (
    <ModalLayout isOpen={isOpen} handleOpen={openHandler}>
      <form onSubmit={handleSubmit(onSubmit)} className='modal-content flex flex-col items-center w-10/12 sm:w-96'>
        <div className='flex justify-between w-full pl-4 pr-4'>
          {measure ? (
            <h3 className='text-light-1 font-semibold text-xl capitalize'>{measure?.name}</h3> 
          ) : null}
          <input {...register('date')} type='date' className='outline-none bg-transparent text-lg font-bold text-green-900 hover:text-green-700 cursor-pointer' />
        </div>
        {error ? (
          <p className='text-sm text-red-1'>{error}</p>
        ) : null}

        <div className='w-3/4 relative'>
          {measure ? (
            <p className='text-light-2 absolute top-1/2 right-3'>{measure.useUnit}</p>
          ) : null}
          <input {...register('value')} required className='font-semibold text-light-1 mt-6 w-full p-2 placeholder:text-light-3 outline-none bg-transparent border-2 border-green-900 hover:border-green-700 focus:border-green-700 rounded-md' placeholder='-' />
        </div>
        
        <div className='flex gap-3 w-full mt-8'>
          <div onClick={handleCancel} className='flex-1 button bg-dark-border hover:bg-light-3'>Cancel</div>
          {variant === 'EDIT' ? (
            <button onClick={handleDelete} className='flex-1 button bg-red-900 hover:bg-red-700'>Delete</button>
          ) : null}
          <button className='flex-1 button'>Save</button>
        </div>
      </form>
    </ModalLayout>
  )
}

export default CreateRecord