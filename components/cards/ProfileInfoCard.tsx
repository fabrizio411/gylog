import Image from 'next/image'
import Link from 'next/link'
import SettingsIcon from '../icons/SettingsIcon'

const ProfileInfoCard = () => {
  return (
    <article className='relative flex flex-col items-center mt-3 sm:mt-5 w-11/12 sm:w-full'>
      <Image className='rounded-full' src={'/images/placeholder.jpg'} alt='profile photo' height={90} width={90} />
      <h3 className='mt-3 text-light-1 font-semibold text-3xl'>Username</h3>
      <p className='text-xs text-light-3'>Joined: 9/11/2023</p>
      <Link href='/settings' className='absolute top-0 right-4 hidden sm:block'>
        <SettingsIcon className='fill-light-3 hover:fill-light-1' />
      </Link>
    </article>
  )
}

export default ProfileInfoCard