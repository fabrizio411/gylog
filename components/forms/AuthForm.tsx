'use client'

import Link from 'next/link'

interface AuthFormProps {
  variant: 'LOGIN' | 'REGISTER'
}

const AuthForm: React.FC<AuthFormProps> = ({
  variant
}) => {

  return (
    <form className='bg-dark-2 w-80 p-7 rounded-lg border border-dark-border'>
      <h1 className='text-center text-light-1 text-lg'>{variant === 'LOGIN' ? 'Login in your account' : 'Create a new account'}</h1>
      <div className='flex flex-col gap-3 mt-5'>
        <input className='text-input' type='text' placeholder='Email' />
        <input className='text-input' type='password' placeholder='Password' />
      </div>
      <button type='submit' className='button mt-5 w-full'>{variant === 'LOGIN' ? 'Login' : 'Register'}</button>
      <div className='flex gap-3 mt-4'>
        <p className='text-light-2 text-sm'>
          {variant === 'LOGIN' ? "Don't have an account?" : 'Already have an account?'}
        </p>
        <Link className='text-green-700 text-sm hover:underline hover:text-green-500' href={variant === 'LOGIN' ? '/register' : '/login'}>
          {variant === 'LOGIN' ? 'Register' : 'Login'}
        </Link>
      </div>
    </form>
  )
}

export default AuthForm