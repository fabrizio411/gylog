import ProfileInfoCard from '@/components/cards/ProfileInfoCard'
import DumbbellIcon from '@/components/icons/DumbbellIcon'
import HistoryIcon from '@/components/icons/HistoryIcon'
import ProgramIcon from '@/components/icons/ProgramIcon'
import RulerIcon from '@/components/icons/RulerIcon'
import Link from 'next/link'

const ProfilePage = () => {
  return (
    <main className='main-container flex flex-col items-center sm:block'>
      <ProfileInfoCard />
      <div className='flex flex-col gap-2 w-11/12 sm:w-full mt-6'>
        <div className='flex gap-2'>
          <Link href='/exercises' className='profile-button'>
            <DumbbellIcon />
            Exercises
          </Link>
          <Link href='/history' className='profile-button'>
            <HistoryIcon />
            History
          </Link>
        </div>
        <div className='flex gap-2'>
          <Link href='/measures' className='profile-button'>
            <RulerIcon />
            Measures
          </Link>
          <Link href='/program' className='profile-button'>
            <ProgramIcon />
            Program
          </Link>
        </div>
      </div>
    </main>
  )
}

export default ProfilePage