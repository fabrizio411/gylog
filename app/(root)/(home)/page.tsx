import ProgramCard from '@/components/cards/ProgramCard'

const HomePage = () => {
  return (
    <main className='main-container flex flex-col items-center'>
      <ProgramCard />
      
      <h3 className='text-xl text-light-1 font-bold ml-4 mt-6 self-start'>For today</h3>
      
    </main>
  )
}

export default HomePage