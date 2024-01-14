'use client'

import { formatDate } from '@/libs/utils/utils'
import EditIcon from '../icons/EditIcon'
import { useState } from 'react'
import { TypeMeasure, TypeMeasureRecord } from '@/libs/utils/types'
import CreateRecord from '@/app/(root)/measures/components/CreateRecord'

interface MeasureRecordCardProps {
  record: TypeMeasureRecord,
  handleComplete: () => void
  userId: string,
  measure: TypeMeasure
}

const MeasureRecordCard: React.FC<MeasureRecordCardProps> = ({
  record,
  handleComplete,
  userId,
  measure
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const openHandler = () => {
    if (isOpen) setIsOpen(false)
    else setIsOpen(true)
  }

  return (
    <article className='group cursor-pointer flex justify-between w-full p-3 pl-0 pr-0 border-b border-b-dark-border last:border-none'>
      <p className='text-light-2'>{formatDate(record.date)}</p>
      <div className='flex gap-2'>
        <p className='text-light-1 font-semibold'>{record.value} {record.unit}</p>
        <div onClick={openHandler}>
          <EditIcon className='fill-light-3 group-hover:fill-light-1' />
        </div>
      </div>

      <CreateRecord
        variant='EDIT'
        userId={userId} 
        openHandler={openHandler}
        isOpen={isOpen}
        handleComplete={handleComplete}
        measure={measure}
        record={record}
      />
    </article>
  )
}

export default MeasureRecordCard