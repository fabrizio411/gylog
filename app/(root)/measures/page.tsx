import MeasureRecordCard from '@/components/cards/MeasureRecordCard'
import MeasuresPageAux from './components/MeasuresPageAux'
import getUser from '@/libs/utils/getUser'

const MeasuresPage = async () => {
  const user = await getUser()

  return (
    <main className='main-container'>
      <MeasuresPageAux userId={user._id.toString()} />
    </main>
  )
}

export default MeasuresPage