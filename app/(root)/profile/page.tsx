import ProfileInfoCard from '@/components/cards/ProfileInfoCard'
import Link from 'next/link'

const ProfilePage = () => {
  return (
    <main className='main-container flex flex-col items-center sm:block'>
      <ProfileInfoCard />
      <div className='flex flex-col gap-2 w-11/12 sm:w-full mt-6'>
        <div className='flex gap-2'>
          <Link href='/exercises' className='profile-button'>Exercises</Link>
          <Link href='/history' className='profile-button'>History</Link>
        </div>
        <div className='flex gap-2'>
          <Link href='/measures' className='profile-button'>Measures</Link>
          <Link href='/program' className='profile-button'>Program</Link>
        </div>
      </div>
    </main>
  )
}

export default ProfilePage