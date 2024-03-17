import getUser from '@/libs/utils/getUser'
import CreatePageAux from '../components/CreatePageAux'

const RoutinesCreatePage = async () => {
  const user = await getUser()

  return (
    <main className='main-container'>
      <CreatePageAux userId={user._id.toString()} />
    </main>
  )
}

export default RoutinesCreatePage