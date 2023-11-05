import AuthForm from '@/components/forms/AuthForm'

const RegisterPage = () => {
  return (
    <main className='h-full flex flex-col justify-center items-center gap-5'>
      <h1 className='text-green-600 text-3xl font-bold'>GYLOG</h1>
      <AuthForm variant='REGISTER' />
    </main>
  )
}

export default RegisterPage