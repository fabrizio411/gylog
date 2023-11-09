import Link from 'next/link'
import EditIcon from '../icons/EditIcon'

const ProgramCard = () => {
  const days = ['m', 't', 'w', 't', 'f', 's', 's']

  return (
    <Link href='/program' className=' group block bg-dark-2 border border-dark-border hover:border-green-700 p-3 pb-5 rounded-lg w-11/12 sm:w-full'>
      <div className='flex justify-between'>
        <h2 className='text-light-1 sm:text-lg font-bold mb-3'>My program</h2>
        <div>
          <EditIcon className='fill-light-2 group-hover:fill-light-1' />
        </div>
      </div>
      <div className='flex justify-around w-full'>
        {days.map((day, i) => (
          <div key={i} className='flex flex-col items-center gap-2'>
            <div className='uppercase text-xs sm:text-base text-light-2'>{day}</div>
            <div className='w-4 h-4 sm:w-6 sm:h-6 bg-light-3 group-hover:bg-green-700 rounded-full'>
              <svg className='fill-dark-1 w-4 h-4 sm:w-6 sm:h-6' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.999 14.413-3.713-3.705L7.7 11.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706z"></path></svg>
            </div>
          </div>
        ))}
      </div>
    </Link>
  )
}

export default ProgramCard