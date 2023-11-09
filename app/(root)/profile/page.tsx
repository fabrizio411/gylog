import ProfileInfoCard from '@/components/cards/ProfileInfoCard'

const ProfilePage = () => {
  return (
    <main className='main-container flex flex-col items-center sm:block'>
      <ProfileInfoCard />
      <div className='flex flex-col gap-2 w-11/12 sm:w-full mt-6'>
        <div className='flex gap-2'>
          <button className='profile-button'>Exercises</button>
          <button className='profile-button'>History</button>
        </div>
        <div className='flex gap-2'>
          <button className='profile-button'>Measures</button>
          <button className='profile-button'>Program</button>
        </div>
      </div>
    </main>
  )
}

export default ProfilePage