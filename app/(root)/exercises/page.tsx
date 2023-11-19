import ExerciseCard from '@/components/cards/ExerciseCard'
import SearchIcon from '@/components/icons/SearchIcon'
import { musclesArray } from '@/libs/utils/constants'
import Exercises from './components/Exercises'
import CreateExercise from '@/components/actions/CreateExercise'
import getUser from '@/libs/utils/getUser'

const ExercisesPage = async () => {
  const user = await getUser()

  return (
    <main className='main-container flex flex-col'>
      <div className='flex justify-center sm:justify-between items-center'>
        <h2 className='desktop-page-title'>Exercises</h2>
        <CreateExercise userId={user._id.toString()} />
      </div>
      <div className='w-11/12 sm:w-full flex gap-2 mt-5 self-center'>
        <label htmlFor='search' className='relative cursor-text flex-1 bg-dark-3 border border-dark-border rounded-xl p-3'>
          <input id='search' type='text' placeholder='Search' className='peer pl-10 w-full bg-transparent outline-none text-light-1 placeholder:text-light-3' />
          <div className='absolute top-1/2 -translate-y-1/2 left-4'>
            <SearchIcon className='fill-light-3' />
          </div>
        </label>
        <select className='bg-dark-border hover:bg-light-3 text-light-1 pl-5 sm:pl-8 pr-5 sm:pr-8 text-sm sm:text-base rounded-xl appearance-none max-h-40 overflow-y-auto'>
          <option className='font-sans'>All muscles</option>
          {musclesArray.map((muscle, i) => (
            <option key={i} className='capitalize font-sans' value={muscle}>{muscle}</option>
          ))}
        </select>
        
      </div>

      <Exercises />
    </main>
  )
}

export default ExercisesPage