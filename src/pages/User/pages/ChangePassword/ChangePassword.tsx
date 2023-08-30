import { yupResolver } from '@hookform/resolvers/yup'
import omit from 'lodash/omit'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { ErrorResponse } from 'src/types/utils.type'
import { UserSchema, userSchema } from 'src/utils/rules'
import { isAxiosErrorUnprocessableEntity } from 'src/utils/utils'
type FormData = Pick<UserSchema, 'password' | 'new_password' | 'new_confirm_password'>
const passwordSchema = userSchema.pick(['password', 'new_confirm_password', 'new_password'])
export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
    reset
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      new_confirm_password: ''
    },
    resolver: yupResolver<FormData>(passwordSchema)
  })
  const updateProfileMutaion = useMutation(userApi.updateProfile)
  console.log(watch())

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfileMutaion.mutateAsync(omit(data, ['new_confirm_password']))
      toast.success(res.data.message)
      reset()
    } catch (error) {
      if (isAxiosErrorUnprocessableEntity<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: 'Server'
            })
          })
        }
      }
    }
  })
  return (
    <div className='bg-white rounded-sm px-2 pb-10 md:pb-20 md:px-7  shadow'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg capitalize text-gray-700 font-bold'>Đổi mật khẩu</h1>
        <div className='mt-1 text-sm text-gra-700'>Quản lí thông tin hồ sơ để bảo mật tài khoản </div>
      </div>

      <form className='mt-8 mr-auto max-w-2xl' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:pr-12 md:mt-0'>
          <div className='flex flex-wrap mt-2 sm:flex-row'>
            <div className='truncate sm:w-[20%] pt-3 sm:text-right capitalize'>Mật khẩu cũ</div>
            <div className='truncate sm:w-[80%] sm:pl-5'>
              <Input
                ClassNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                className='relative'
                register={register}
                name='password'
                type='password'
                errorMessage={errors.password?.message}
                placeholder='Mật khẩu cũ'
              />
            </div>
          </div>
          <div className='flex flex-wrap mt-2 sm:flex-row'>
            <div className='truncate sm:w-[20%] pt-3 sm:text-right capitalize'>Mật khẩu mới</div>
            <div className='truncate sm:w-[80%] sm:pl-5'>
              <Input
                ClassNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                className='relative'
                register={register}
                name='new_password'
                type='password'
                errorMessage={errors.new_password?.message}
                placeholder='Mật khẩu mới'
              />
            </div>
          </div>
          <div className='flex flex-wrap mt-2 sm:flex-row'>
            <div className='truncate sm:w-[20%] pt-3 sm:text-right capitalize'>Nhập lại mật khẩu</div>
            <div className='truncate sm:w-[80%] sm:pl-5'>
              <Input
                ClassNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                className='relative'
                register={register}
                name='new_confirm_password'
                type='password'
                errorMessage={errors.new_confirm_password?.message}
                placeholder='Nhập lại mật khẩu'
              />
            </div>
          </div>

          <div className='flex flex-wrap mt-2 sm:flex-row'>
            <div className='truncate sm:w-[20%] pt-3 sm:text-right capitalize' />
            <div className='truncate sm:w-[80%] sm:pl-5'>
              <Button
                className='flex items-center rounded-sm bg-orange px-5 h-9 text-sm text-white text-center hover:bg-orange/80'
                type='submit'
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
