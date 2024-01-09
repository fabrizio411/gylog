'use client'

import MeasureRecordCard from '@/components/cards/MeasureRecordCard'
import { TypeMeasure } from '@/libs/utils/types'
import axios from 'axios'
import { useEffect, useState } from 'react'

interface MeasuresProps {
  measureId: string,
  newMeasureTxt: string
}

const Measures: React.FC<MeasuresProps> = ({
  measureId,
  newMeasureTxt
}) => {
  const [measure, setMeasure] = useState<TypeMeasure>()

  if (measureId === newMeasureTxt) {
    return null
  }

  useEffect(() => {
    async function getMeasure() {
      const res: any = await axios.get(`/api/measures/${measureId}`)
      .catch((err) => console.log(err))

      setMeasure(res.data)
    }

    getMeasure()
  }, [measureId])

  return (
    <div className='mt-10 flex flex-col items-center gap-3 w-11/12 sm:w-2/4'>
      <div className='flex justify-between w-full'>
        <h2 className='text-light-1 text-2xl font-bold ml-3'>{measure?.name}</h2>
        <button className='button'>Add record</button>
      </div>
      <div className='w-full bg-dark-2 pl-3 pr-3 rounded-lg border border-dark-border'>
        <MeasureRecordCard />
        <MeasureRecordCard />
        <MeasureRecordCard />
        <MeasureRecordCard />
        <MeasureRecordCard />
      </div>
    </div>
  )
}

export default Measures