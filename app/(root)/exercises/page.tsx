import SearchIcon from '@/components/icons/SearchIcon'
import { musclesArray } from '@/libs/utils/constants'
import Exercises from './components/Exercises'
import CreateExercise from '@/components/actions/CreateExercise'
import getUser from '@/libs/utils/getUser'
import ExercisesPageAux from './components/ExercisesPageAux'

const ExercisesPage = async () => {
  const user = await getUser()

  if (!user) return null

  return (
    <main className='main-container flex flex-col'>
      <ExercisesPageAux userId={user._id.toString()} />
    </main>
  )
}

export default ExercisesPage