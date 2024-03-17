'use client'

import MeasureRecordCard from '@/components/cards/MeasureRecordCard'
import { TypeMeasure, TypeMeasureRecord } from '@/libs/utils/types'
import axios from 'axios'
import { useEffect, useState } from 'react'
import CreateRecord from './CreateRecord'

interface MeasuresProps {
  userId: string,
  measureId: string,
  newMeasureTxt: string
}

const Measures: React.FC<MeasuresProps> = ({
  userId,
  measureId,
  newMeasureTxt
}) => {
  const [measure, setMeasure] = useState<TypeMeasure>()
  const [isCreated, setIsCreated] = useState<boolean>(false)

  useEffect(() => {
    async function getMeasure() {
      if (measureId !== newMeasureTxt) {
        return
      }
      const res: any = await axios.get(`/api/measures/${measureId}`)
      .catch((err) => console.log(err))

      setMeasure(res.data)
    }

    getMeasure()

  }, [measureId, newMeasureTxt, isCreated])

  // Handle create record
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const openHandler = () => {
    if (isOpen) setIsOpen(false)
    else setIsOpen(true)
  }

  const handleComplete = () => {
    if (isCreated) setIsCreated(false)
    else setIsCreated(true)
  }

  return (
    <div className='mt-10 flex flex-col items-center gap-3 w-11/12 sm:w-2/4'>
      <div className='flex justify-between w-full'>
        {measure ? (
          <h2 className='text-light-1 text-2xl font-bold ml-3 capitalize'>{measure?.name}</h2>
        ) : null}
        <button onClick={openHandler} className='button'>Add record</button>
      </div>
      <div className='w-full bg-dark-2 pl-3 pr-3 rounded-lg border border-dark-border'>
        {measure && measure.records.length && measure.records.length > 0 ? (
          measure.records.map((item: any, i) => (
            <MeasureRecordCard key={i} record={item} userId={userId} measure={measure} handleComplete={handleComplete} />
          ))
        ) : (
          <div className='p-4 flex flex-col items-center'>
            <p className='text-xl text-light-2 font-semibold'>No records yet</p>
            <button onClick={openHandler} className='group flex gap-2 items-center mt-5 w-full justify-center'>
              <svg className='fill-light-2 group-hover:fill-light-1' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z'></path></svg>
              <p className='text-light-2 group-hover:text-light-1 text-sm'>Add record</p>
            </button>
          </div>
        )}
      </div>

      <CreateRecord
        variant='CREATE'
        userId={userId}
        openHandler={openHandler}
        isOpen={isOpen}
        handleComplete={handleComplete}
        measure={measure}
      />
    </div>
  )
}

export default Measures