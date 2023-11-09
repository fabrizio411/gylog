import Link from 'next/link'
import StartIcon from '../icons/StartIcon'

interface RoutineCardProps {
  className?: string
}

const RoutineCard: React.FC<RoutineCardProps> = ({ className }) => {
  return (
    <Link href='/routines' className={`group/card flex rounded-md overflow-hidden w-11/12 sm:w-full ${className}`}>
      <div className='bg-green-900 group-hover/card:bg-green-700 w-2'></div>
      <div className='flex-1 bg-dark-2 group-hover/card:bg-dark-hover p-3 flex justify-between items-center'>
        <div>
          <h3 className='text-light-1'>Rotuine name</h3>
          <p className='text-light-3 text-xs'>Target: <span className='capitalize'>Push</span></p>
          <div className='text-light-2 text-sm mt-3'>
            <p>3 x Pullup</p>
            <p>3 x Row (dumbbell)</p>
            <p>3 x Biceps Curl</p>
          </div>
        </div>
        <button className='group/btn bg-green-900 hover:bg-green-600 p-3 rounded-full mr-5'>
          <StartIcon className='scale-125 fill-dark-2 group-hover/btn:fill-dark-hover' />
        </button>
      </div>
    </Link>
  )
}

export default RoutineCard