import getUser from '@/libs/utils/getUser'
import CreatePageAux from '../components/CreatePageAux'

const RoutinesCreatePage = async () => {
  const user = await getUser()

  if (!user) return null

  return (
    <main className='main-container'>
      <CreatePageAux userId={user._id.toString()} />
    </main>
  )
}

export default RoutinesCreatePage