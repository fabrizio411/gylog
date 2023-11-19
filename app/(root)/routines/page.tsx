import FileCard from '@/components/cards/FileCard'
import RoutineCard from '@/components/cards/RoutineCard'
import Link from 'next/link'
import Routines from './components/Routines'

const RoutinesPage = () => {
  return (
    <main className='main-container'>
      <div className='flex justify-center sm:justify-between items-center'>
        <h2 className='desktop-page-title'>Routines</h2>
        <Link href='/routines/create' className='button w-11/12 sm:w-auto mt-2 sm:mt-0'>Create routine</Link>
      </div>

      <Routines />
      
      <button className='group flex gap-2 items-center mt-5 w-full justify-center'>
        <svg className='fill-light-2 group-hover:fill-light-1' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z'></path></svg>
        <p className='text-light-2 group-hover:text-light-1 text-sm'>Create routine</p>
      </button>
    </main>
  )
}

export default RoutinesPage