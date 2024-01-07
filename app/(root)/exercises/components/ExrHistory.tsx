import WorkoutRecordCard from '@/components/cards/WorkoutRecordCard'

const ExrHistory = () => {
  return (
    <div className='lateral-nav-page flex flex-col items-center gap-5'>
      <WorkoutRecordCard variant='EXERCISE' />
      <WorkoutRecordCard variant='EXERCISE' />
      <WorkoutRecordCard variant='EXERCISE' />
      <WorkoutRecordCard variant='EXERCISE' />
      <WorkoutRecordCard variant='EXERCISE' />
      <WorkoutRecordCard variant='EXERCISE' />
      <WorkoutRecordCard variant='EXERCISE' />
    </div>
  )
}

export default ExrHistory