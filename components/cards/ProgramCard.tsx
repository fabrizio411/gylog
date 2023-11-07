import Link from 'next/link'

const ProgramCard = () => {
  const days = ['m', 't', 'w', 't', 'f', 's', 's']
  return (
    <Link href='/program' className='block bg-dark-2 border border-dark-border hover:border-green-700 p-3 pb-5 rounded-lg w-11/12 sm:w-full'>
      <h2 className='text-light-1 sm:text-lg font-bold mb-3'>My program</h2>
      <div className='flex justify-around w-full'>
        {days.map(day => (
          <div className='flex flex-col items-center gap-2'>
            <div className='uppercase text-xs sm:text-base text-light-2'>{day}</div>
            <div className='w-4 h-4 sm:w-6 sm:h-6 bg-light-3 rounded-full'></div>
          </div>
        ))}
      </div>
    </Link>
  )
}

export default ProgramCard