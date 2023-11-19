'use client'

import { LoginValidation, RegisterValidation } from '@/libs/validations/auth.validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, useSession } from 'next-auth/react'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm, Controller, FieldValues, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'

interface AuthFormProps {
  variant: 'LOGIN' | 'REGISTER'
}

const AuthForm: React.FC<AuthFormProps> = ({
  variant
}) => {
  const session = useSession()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [formError, setFromError] = useState<string>('')

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/')
    }
  }, [session?.status, router])

  let userValidation
  if (variant === 'REGISTER') {
    userValidation = zodResolver(RegisterValidation)
  }
  else {
    userValidation = zodResolver(LoginValidation)
  }

  const { control, register, handleSubmit, formState: {errors} , watch} = useForm<FieldValues>({
    resolver: userValidation,
    defaultValues: {
      email: '',
      password: '',
      username: '',
      image: ''
    }
  })

  const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
    e.preventDefault()

    const fileReader = new FileReader()

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      if (!file.type.includes('image')) return

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || ''

        fieldChange(imageDataUrl)
      }

      fileReader.readAsDataURL(file)
    }
  }

  const emailValue = watch('email')
  const usernameValue = watch('username')
  const passwordValue = watch('password')

  useEffect(() => {
    if (variant === 'LOGIN') {
      if (!emailValue || !passwordValue) {
        setIsDisabled(true)
      } else {
        setIsDisabled(false)
      }
    } else {
      if (!emailValue || !passwordValue || !usernameValue) {
        setIsDisabled(true)
      } else {
        setIsDisabled(false)
      }
    }
  }, [emailValue, passwordValue, usernameValue, variant])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)

    if (variant === 'REGISTER') {
      const res: any = await axios.post('/api/register', data)
      .catch((err) => {
        setFromError('Register error, try again')
        console.log('Register error', err)
      })
      .finally(() => {
        setIsLoading(false)
      })

      if (res.data?.error) {
        setFromError(res.data.message)
      } else {
        signIn('credentials', data)
      }
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false
      })
      .then((callback) => {
        if (callback?.error) {
          setFromError('Incorrect email or password')
        }

        if (callback?.ok || !callback?.error) {
          router.push('/')
        }
      })
      .catch((err) => {
        console.log('Login error', err)
        setFromError('Authentication error')
      })
      .finally(() => {
        setIsLoading(false)
      })
    }
  } 

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='bg-dark-2 w-80 p-7 rounded-lg border border-dark-border'>
      <h1 className='text-center text-light-1 text-lg'>{variant === 'LOGIN' ? 'Login in your account' : 'Create a new account'}</h1>
      <div className='flex flex-col gap-3 mt-5'>
        {variant === 'REGISTER' ? (
          <div className='self-center relative m-2'>
            <Controller 
              name='image' 
              control={control} 
              render={({ field }) => (
                <label htmlFor='image'>
                  {field.value ? (
                    <Image className='rounded-full cursor-pointer' src={field.value} alt='Profile photo' height={70} width={70} priority/>
                  ) : (
                    <Image className='rounded-full cursor-pointer' src='/images/placeholder.jpg' alt='Profile photo' height={70} width={70}/>
                  )}
                  <div className='cursor-pointer bg-light-1 absolute flex justify-center items-center w-6 h-6 bottom-0 right-0 box-content border-2 border-dark-border rounded-full hover:bg-light-2'>
                    <svg className='scale-105' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'><path d='M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z'></path></svg>
                    <input disabled={isLoading} className='image-input' hidden type='file' accept='image/*' id='image'
                      onChange={(e) => handleImage(e, field.onChange)}
                    />
                  </div>
                </label>
              )}
            />
          </div>
        ) : null}
        <input disabled={isLoading} className='text-input' type='text' placeholder='Email' {...register('email')} />
        {errors?.email ? (
          <p className='text-red-1 text-sm'>{errors.email.message as string}</p>
        ) : null}
        {variant === 'REGISTER' ? (
          <>
            <input disabled={isLoading} className='text-input' type='text' placeholder='Username' {...register('username')} />
            {errors?.username ? (
              <p className='text-red-1 text-sm'>{errors.username.message as string}</p>
            ) : null}
          </>
        ) : null}
        <input disabled={isLoading} className='text-input' type='password' placeholder='Password' {...register('password')} />
        {errors?.password ? (
          <p className='text-red-1 text-sm'>{errors.password.message as string}</p>
        ) : null}
      </div>
      {formError ? (
        <p className='text-red-1 mt-3 text-sm'>{formError}</p>
      ) : null}
      <button disabled={isDisabled || isLoading} type='submit' className='button disabled:text-light-3 disabled:cursor-not-allowed disabled:bg-green-950 mt-5 w-full'>{variant === 'LOGIN' ? 'Login' : 'Register'}</button>
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