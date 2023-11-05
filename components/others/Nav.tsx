'use client'

import Link from 'next/link'
import HomeIcon from '../icons/HomeIcon'
import ProfileIcon from '../icons/ProfileIcon'
import DumbbellIcon from '../icons/DumbbellIcon'
import RulerIcon from '../icons/RulerIcon'
import { usePathname } from 'next/navigation'

const Nav = () => {
  const pathname = usePathname()

  return (
    <nav className='flex justify-around items-center h-full w-full sm:w-[700px]'>
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