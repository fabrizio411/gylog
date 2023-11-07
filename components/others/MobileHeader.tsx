'use client'

import { usePathname, useRouter } from 'next/navigation'
import BackArrow from '../icons/BackArrow'

const MobileHeader = () => {
  const pathname = usePathname()
  const router = useRouter()
  
  const mainPages = ['/routines', '/', '/measures', '/profile']

  let titleText = 'GYLOG'
  if (pathname === '/routines') titleText = 'ROUTINES'
  if (pathname === '/measures') titleText = 'MEASURES'
  if (pathname === '/profile') titleText = 'PROFILE'

  return (
    <div className='sm:hidden flex justify-center items-center absolute top-0 w-full bg-dark-1 p-2'>
      {!mainPages.includes(pathname) ? (
        <div className='absolute top-1/2 -translate-y-1/2 left-3' onClick={() => router.back()}>
          <BackArrow className='scale-150 fill-green-900' />
        </div>
      ) : null}
      <h1 className='text-2xl text-green-700 font-bold'>{titleText}</h1>
    </div>
  )
}

export default MobileHeader