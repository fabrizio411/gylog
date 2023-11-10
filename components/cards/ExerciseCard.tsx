import Image from 'next/image'
import Link from 'next/link'
import BackArrow from '../icons/BackArrow'

const ExerciseCard = () => {
  return (
    <Link href={`/exercises/123`} className='group p-3 pb-2 pt-2 last:border-none border-b border-b-dark-border w-full flex justify-between items-center'>
      <div className='flex gap-4 items-center'>
        <Image className='rounded-full' alt='exercise photo' src={'/images/placeholder.jpg'} height={60} width={60} />
        <div>
          <h3 className='text-light-1 font-semibold mb-1 group-hover:underline'>Exercise name</h3>
          <p className='text-sm text-light-3'>Muscle</p>
        </div>
      </div>
      <div>
        <BackArrow className='rotate-180 fill-light-2 group-hover:fill-light-1' />
      </div>
    </Link>
  )
}

export default ExerciseCard