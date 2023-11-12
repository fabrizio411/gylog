import RoutineCard from '@/components/cards/RoutineCard'
import BackArrow from '@/components/icons/BackArrow'
import TrashIcon from '@/components/icons/TrashIcon'

const ProgramPage = () => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  return (
    <main className='main-container flex flex-col items-center gap-10'>
      {days.map(day => (
        <div className='w-11/12 sm:w-full'>
          <div className='flex justify-between items-center pl-2 mb-2'>
            <h3 className='text-light-1 text-lg font-semibold capitalize'>{day}</h3>
            <p className='text-3xl text-light-2 hover:text-light-1 cursor-pointer'>+</p>
          </div>
          <div className='flex flex-col gap-3'>
            
            <div className='flex gap-4'>
              <div className='flex flex-col justify-between pt-2 pb-2 fill-light-3'>
                <BackArrow className='rotate-90 hover:fill-light-2 cursor-pointer' />
                <TrashIcon className='hover:fill-light-2 cursor-pointer' />
                <BackArrow className='-rotate-90 hover:fill-light-2 cursor-pointer' />
              </div>
              <RoutineCard />
            </div>

            <div className='flex gap-4'>
              <div className='flex flex-col justify-between pt-2 pb-2 fill-light-3'>
                <BackArrow className='rotate-90 hover:fill-light-2 cursor-pointer' />
                <TrashIcon className='hover:fill-light-2 cursor-pointer' />
                <BackArrow className='-rotate-90 hover:fill-light-2 cursor-pointer' />
              </div>
              <RoutineCard />
            </div>

          </div>
        </div>
      ))}
    </main>
  )
}

export default ProgramPage