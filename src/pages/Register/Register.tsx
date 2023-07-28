import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { schema, Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import { registerAccount } from 'src/apis/auth.api'
import { omit } from 'lodash'

// interface FormData {
//   email: string
//   password: string
//   confirm_password: string
// }
type FormData = Schema
export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        console.log(error)
      }
    })
  })

  // const value = watch()
  // console.log(value)

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className=' p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng kí</div>
              <Input
                name='email'
                register={register}
                type='email'
                placeholder='Email'
                className='mt-8'
                errorMessage={errors.email?.message}
              />
              <Input
                name='password'
                register={register}
                type='password'
                autoComplete='on'
                placeholder='Password'
                className='mt-3'
                errorMessage={errors.password?.message}
              />
              <Input
                name='confirm_password'
                register={register}
                autoComplete='on'
                type='password'
                placeholder='Confirm password'
                className='mt-6'
                errorMessage={errors.confirm_password?.message}
              />
              {/* <div className='mt-8'>
                <input
                  type='email'
                  placeholder='Email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  {...register('email', rules.email)}
                />
                <div className='mt-1 text-red-500 min-h-[1.25rem] text-sm'>{errors.email?.message}</div>
              </div> */}
              {/* <div className='mt-3'>
                <input
                  type='password'
                  placeholder='Password'
                  autoComplete='on'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  {...register('password', rules.password)}
                />
                <div className='mt-1 text-red-500 min-h-[1.25rem] text-sm'>{errors.password?.message}</div>
              </div>
              <div className='mt-6'>
                <input
                  type='password'
                  placeholder='Confirm password'
                  autoComplete='on'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  {...register('confirm_password', {
                    ...rules.confirm_password
                  })}
                />
                <div className='mt-1 text-red-500 min-h-[1.25rem] text-sm'>{errors.confirm_password?.message}</div>
              </div> */}
              <div className='mt-6'>
                <button className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'>
                  Đăng kí
                </button>
              </div>

              <div className='flex item-center justify-center mt-5'>
                <div className='text-slate-400'> Bạn đã có tài khoản chưa?</div>
                <Link className='text-red-400 ml-1' to='/Login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
