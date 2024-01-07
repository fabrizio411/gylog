import WorkoutRecordCard from '@/components/cards/WorkoutRecordCard'
import DumbbellIcon from '@/components/icons/DumbbellIcon'
import GraphIcon from '@/components/icons/GraphIcon'
import RepsIcon from '@/components/icons/RepsIcon'
import ThrophyIcon from '@/components/icons/ThrophyIcon'

const ExrGeneral = () => {
  return (
    <div className='lateral-nav-page'>
      <div className='w-full'>
        <h2 className='text-light-1'>Personal Records</h2>
        <div className='rounded-lg overflow-hidden flex flex-col gap-1 mt-3'>
          <div className='bg-dark-2 flex justify-between items-center p-3'>
            <div className='flex gap-2'>
              <ThrophyIcon className='fill-green-700' />
              <p className='text-green-700 font-semibold'>1 RM</p>
            </div>
            <div className='flex flex-col items-end'>
              <p className='text-light-1 font-semibold'>85 kg</p>
              <p className='text-light-3 text-xs'>OCT 26, 2023</p>
            </div>
          </div>

          <div className='bg-dark-2 flex justify-between items-center p-3'>
            <div className='flex gap-2'>
              <DumbbellIcon className='fill-light-1' />
              <p className='text-light-1 font-semibold'>Weight</p>
            </div>
            <div className='flex flex-col items-end'>
              <p className='text-light-1 font-semibold'>80 kg (2 reps)</p>
              <p className='text-light-3 text-xs'>OCT 26, 2023</p>
            </div>
          </div>

          <div className='bg-dark-2 flex justify-between items-center p-3'>
            <div className='flex gap-2'>
              <RepsIcon className='fill-light-1' />
              <p className='text-light-1 font-semibold'>Reps</p>
            </div>
            <div className='flex flex-col items-end'>
              <p className='text-light-1 font-semibold'>8 reps (20 kg)</p>
              <p className='text-light-3 text-xs'>OCT 26, 2023</p>
            </div>
          </div>

          <div className='bg-dark-2 flex justify-between items-center p-3'>
            <div className='flex gap-2'>
              <GraphIcon className='fill-light-1' />
              <p className='text-light-1 font-semibold'>Volume</p>
            </div>
            <div className='flex flex-col items-end'>
              <p className='text-light-1 font-semibold'>356 kg</p>
              <p className='text-light-3 text-xs'>OCT 26, 2023</p>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full flex flex-col items-center'>
        <h2 className='self-start text-light-1 mt-8 mb-3'>Latest Workout</h2>
        <WorkoutRecordCard variant='EXERCISE' />
      </div>

      <div className='mt-8 w-full'>
        <h2 className='text-light-1'>Lifetime Stats</h2>
        <div className='mt-3 flex justify-between'>
          <p className='text-light-2'>Total Reps</p>
          <p className='text-light-3'>506 reps</p>
        </div>

        <div className='mt-3 flex justify-between'>
          <p className='text-light-2'>Total Volume</p>
          <p className='text-light-3'>55630 kg</p>
        </div>
      </div>
    </div>
  )
}

export default ExrGeneral