import ProgramCard from '@/components/cards/ProgramCard'
import RoutineCard from '@/components/cards/RoutineCard'

const HomePage = () => {
  return (
    <main className='main-container flex flex-col items-center'>
      <ProgramCard />
      
      <h3 className='text-xl text-light-1 font-bold ml-7 sm:ml-4 mt-6 self-start'>For today</h3>
      <div className='routines-container mt-3 w-full'>
        <RoutineCard />
        <RoutineCard />
      </div>
    </main>
  )
}

export default HomePage