'use client'

import WorkoutRecordCard from '@/components/cards/WorkoutRecordCard'
import DumbbellIcon from '@/components/icons/DumbbellIcon'
import GraphIcon from '@/components/icons/GraphIcon'
import RepsIcon from '@/components/icons/RepsIcon'
import ThrophyIcon from '@/components/icons/ThrophyIcon'
import useUnits from '@/hooks/useUnits'
import { TypeExerciseCategory } from '@/libs/utils/types'
import { getExerciseUnits, isWeightedExercise } from '@/libs/utils/utils'

interface ExrGeneralProps {
  category: TypeExerciseCategory
}

const ExrGeneral: React.FC<ExrGeneralProps> = ({
  category
}) => {

  const { unitsInfo } = useUnits(category)

  const IconOne = unitsInfo.icons[0]
  let IconTwo
  if (unitsInfo.icons[1]) IconTwo = unitsInfo.icons[1]

  return (
    <div className='lateral-nav-page'>

      {category !== 'checkbox' ? (
        <div className='w-full'>
          <h2 className='text-light-1'>Personal Records</h2>
          <div className='rounded-lg overflow-hidden flex flex-col gap-1 mt-3'>

            <div className='bg-dark-2 flex justify-between items-center p-3'>
              <div className='flex gap-2'>
                <ThrophyIcon className='fill-green-700' />
                <p className='text-green-700 font-semibold'>1 RM</p>
              </div>
              <div className='flex flex-col items-end'>
                {isWeightedExercise(category) ? (
                  <p className='text-light-1 font-semibold'>25 {unitsInfo.units[1]}</p>
                ) : (
                  <p className='text-light-1 font-semibold'>25 {unitsInfo.units[0]}</p>
                )}
                <p className='text-light-3 text-xs'>OCT 26, 2023</p>
              </div>
            </div>

            <div className='bg-dark-2 flex justify-between items-center p-3'>
              <div className='flex gap-2'>
                <IconOne className='fill-light-1' />
                <p className='text-light-1 font-semibold'>{unitsInfo.denom[0]}</p>
              </div>
              <div className='flex flex-col items-end'>
                <p className='text-light-1 font-semibold'>8 {unitsInfo.units[0]}
                  {unitsInfo.units[1] ? (
                    <span> (20 {unitsInfo.units[1]})</span>
                  ) : null}
                </p>
                <p className='text-light-3 text-xs'>OCT 26, 2023</p>
              </div>
            </div>

            {unitsInfo.units[1] ? (
              <div className='bg-dark-2 flex justify-between items-center p-3'>
                <div className='flex gap-2'>
                  <IconTwo className='fill-light-1' />
                  <p className='text-light-1 font-semibold'>{unitsInfo.denom[1]}</p>
                </div>
                <div className='flex flex-col items-end'>
                  <p className='text-light-1 font-semibold'>80 {unitsInfo.units[1]} (8 {unitsInfo.units[0]})</p>
                  <p className='text-light-3 text-xs'>OCT 26, 2023</p>
                </div>
              </div>
            ) : null}

            {isWeightedExercise(category) ? (
              <div className='bg-dark-2 flex justify-between items-center p-3'>
                <div className='flex gap-2'>
                  <GraphIcon className='fill-light-1' />
                  <p className='text-light-1 font-semibold'>Volume</p>
                </div>
                <div className='flex flex-col items-end'>
                  <p className='text-light-1 font-semibold'>356 {unitsInfo.units[1]}</p>
                  <p className='text-light-3 text-xs'>OCT 26, 2023</p>
                </div>
              </div>
            ) : null}

          </div>
        </div>
      ) : null}

      <div className='w-full flex flex-col items-center'>
        <h2 className='self-start text-light-1 mt-8 mb-3'>Latest Workout</h2>
        <WorkoutRecordCard variant='EXERCISE' />
      </div>

      <div className='mt-8 w-full'>
        <h2 className='text-light-1'>Lifetime Stats</h2>
        <div className='mt-3 flex justify-between'>
          <p className='text-light-2'>Total {unitsInfo.denom[0]}</p>
          <p className='text-light-3'>506 {unitsInfo.units[0]}</p>
        </div>
        
        {unitsInfo.units[1] ? (
          <div className='mt-3 flex justify-between'>
            <p className='text-light-2'>Total {isWeightedExercise(category) ? ('Volume') : (unitsInfo.denom[1])}</p>
            <p className='text-light-3'>55630 {unitsInfo.units[1]}</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ExrGeneral