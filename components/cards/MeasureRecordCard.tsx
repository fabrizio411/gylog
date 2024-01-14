import { formatDate } from '@/libs/utils/utils'
import EditIcon from '../icons/EditIcon'

interface MeasureRecordCardProps {
  date: string,
  value: number,
  unit: string
}

const MeasureRecordCard: React.FC<MeasureRecordCardProps> = ({
  date,
  value,
  unit
}) => {
  return (
    <article className='group cursor-pointer flex justify-between w-full p-3 pl-0 pr-0 border-b border-b-dark-border last:border-none'>
      <p className='text-light-2'>{formatDate(date)}</p>
      <div className='flex gap-2'>
        <p className='text-light-1 font-semibold'>{value} {unit}</p>
        <EditIcon className='fill-light-3 group-hover:fill-light-1' />
      </div>
    </article>
  )
}

export default MeasureRecordCard