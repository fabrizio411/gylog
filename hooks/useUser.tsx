import { TypeUser } from '@/libs/utils/types'
import axios from 'axios'
import { useEffect, useState } from 'react'

const useUser = () => {
  const [user, setUser] = useState<Partial<TypeUser> | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
        const res: any = axios.get('/api/user')
        .catch((err) => console.log('Get user error', err))

        setUser(res.data)
    }

    fetchUser()

  }, [])

  return { user }
}

export default useUser