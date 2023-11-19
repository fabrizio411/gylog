import Image from 'next/image'
import Link from 'next/link'
import BackArrow from '../icons/BackArrow'

interface ExerciseCardProps {
  _id: string
  name: string,
  muscle: string,
  userId?: string
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  _id,
  name,
  muscle,
  userId
}) => {
  return (
    <Link href={`/exercises/${_id}`} className='group p-3 pb-2 pt-2 last:border-none border-b border-b-dark-border w-full flex justify-between items-center'>
      <div className='flex gap-4 items-center'>
        <Image className='rounded-full' alt='exercise photo' src={'/images/placeholder.jpg'} height={60} width={60} />
        <div>
          <h3 className='text-light-1 font-semibold mb-1 group-hover:underline'>{name}</h3>
          <p className='text-sm text-light-3 capitalize'>{muscle}</p>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        {userId ? (
          <p className='bg-dark-border text-light-2 rounded-full p-2 pt-1 pb-1 text-xs'>Custom</p>
        ) : null}
        <BackArrow className='rotate-180 fill-light-2 group-hover:fill-light-1' />
      </div>
    </Link>
  )
}

export default ExerciseCard