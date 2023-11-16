import WorkoutRecordCard from '@/components/cards/WorkoutRecordCard'

const HistoryPage = () => {
  return (
    <main className='main-container'>
      <h2 className='desktop-page-title'>History</h2>
      <div className='w-full flex flex-col items-center gap-3 mt-4'>
        <WorkoutRecordCard variant='GENERAL' />
        <WorkoutRecordCard variant='GENERAL' />
        <WorkoutRecordCard variant='GENERAL' />
        <WorkoutRecordCard variant='GENERAL' />
        <WorkoutRecordCard variant='GENERAL' />
      </div>
    </main>
  )
}

export default HistoryPage