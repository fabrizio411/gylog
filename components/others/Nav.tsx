'use client'

import Link from 'next/link'
import HomeIcon from '../icons/HomeIcon'
import ProfileIcon from '../icons/ProfileIcon'
import DumbbellIcon from '../icons/DumbbellIcon'
import RulerIcon from '../icons/RulerIcon'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import BackArrow from '../icons/BackArrow'

const Nav = () => {
  const pathname = usePathname()
  const router = useRouter()
  
  const mainPages = ['/routines', '/', '/measures', 'profile']

  return (
    <nav className='flex justify-around items-center h-16 w-full sm:w-[700px]'>
      {!mainPages.includes(pathname) ? (
        <div className='nav-item hidden sm:flex' onClick={() => router.back()}>
          <BackArrow className='scale-150' />
          Back
        </div>
      ) : null}
      <Link className={`nav-item ${pathname === '/' && 'current-page'}`} href={'/'}>
        <HomeIcon />
        Home
      </Link>
      <Link className={`nav-item ${pathname === '/routines' && 'current-page'}`} href={'/routines'}>
        <DumbbellIcon />
        Routines
      </Link>
      <Link className={`nav-item ${pathname === '/measures' && 'current-page'}`} href={'/measures'}>
        <RulerIcon />
        Measures
      </Link>
      <Link className={`nav-item ${pathname === '/profile' && 'current-page'}`} href={'/profile'}>
        <ProfileIcon />
        Profile
      </Link>
    </nav>
  )
}

export default Nav