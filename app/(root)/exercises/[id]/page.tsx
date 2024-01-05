import { getParam } from '@/libs/utils/utils'
import ExerciseDisplay from '../components/ExerciseDisplay';

const ExerciseOnePage = async ({
  params
}: {
  params: { id: string }
}) => {
  const { id } = params

  const exerciseId = getParam(id)

  return (
    <main className='main-container'>
      <ExerciseDisplay exerciseId={exerciseId} />
    </main>
  )
}

export default ExerciseOnePage