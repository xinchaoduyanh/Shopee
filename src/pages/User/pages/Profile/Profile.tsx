import { useMutation, useQuery } from 'react-query'
import userApi from 'src/apis/user.api'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { UserSchema, userSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import InputNumber from 'src/components/InputNumber'
import { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import DateSelect from '../../Components/DateSelect'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'
import { setProfileToLS } from 'src/utils/auth'
import { getAvatarURL, isAxiosErrorUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import InputFile from 'src/components/InputFile'

type FormData = Pick<UserSchema, 'name' | 'address' | 'date_of_birth' | 'avatar' | 'phone'>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}
const profileSchema = userSchema.pick(['name', 'address', 'date_of_birth', 'avatar', 'phone'])
function Info() {
  const {
    register,
    formState: { errors },
    control
  } = useFormContext<FormData>()
  return (
    <Fragment>
      <div className='flex flex-wrap mt-6 sm:flex-row'>
        <div className='truncate sm:w-[20%] pt-3 sm:text-right capitalize'>Tên</div>
        <div className='truncate sm:w-[80%] sm:pl-5'>
          <Input
            ClassNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
            register={register}
            name='name'
            placeholder='Tên'
            errorMessage={errors.name?.message}
          />
        </div>
      </div>
      <div className='flex flex-wrap mt-2 sm:flex-row'>
        <div className='truncate sm:w-[20%] pt-3 sm:text-right capitalize'>Số điện thoại</div>
        <div className='truncate sm:w-[80%] sm:pl-5'>
          <Controller
            control={control}
            name='phone'
            render={({ field }) => (
              <InputNumber
                classNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                placeholder='Số điện thoại'
                errorMessage={errors.phone?.message}
                {...field}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
    </Fragment>
  )
}
function Profile() {
  const { setProfile } = useContext(AppContext)
  const [file, setFile] = useState<File | null>(null)
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const updateProfileMutaion = useMutation(userApi.updateProfile)
  const uploadAvatarMutation = useMutation(userApi.uploadAvatar)
  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1900, 0, 1)
    },
    resolver: yupResolver<FormData>(profileSchema)
  })
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    setError,
    watch
  } = methods
  const avatar = watch('avatar')
  const profile = profileData?.data.data
  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('avatar', profile.avatar)
      setValue('address', profile.address)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date())
    }
  }, [profile, setValue])
  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await uploadAvatarMutation.mutateAsync(form)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
      }
      const res = await updateProfileMutaion.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      setProfile(res.data.data)
      setProfileToLS(res.data.data)
      refetch()
      toast.success(res.data.message)
    } catch (error) {
      if (isAxiosErrorUnprocessableEntity<ErrorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })
  const handleChangeFile = (file?: File) => {
    setFile(file as File)
  }
  return (
    <div className='bg-white rounded-sm px-2 pb-10 md:pb-20 md:px-7  shadow'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-700'>Hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-gra-700'>Quản lí thông tin hồ sơ để bảo mật tài khoản </div>
      </div>
      <FormProvider {...methods}>
        <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start text-sm' onSubmit={onSubmit}>
          <div className='mt-6 flex-grow md:pr-12 md:mt-0'>
            <div className='flex flex-wrap sm:flex-row'>
              <div className='truncate sm:w-[20%] pt-3 sm:text-right capitalize'>Email</div>
              <div className='truncate sm:w-[80%] sm:pl-5'>
                <div className='pt-3 text-gray-700'>{profile?.email}</div>
              </div>
            </div>
            <Info />
            <div className='flex flex-wrap mt-2 sm:flex-row'>
              <div className='truncate sm:w-[20%] pt-3 sm:text-right capitalize'>Địa chỉ</div>
              <div className='truncate sm:w-[80%] sm:pl-5'>
                <Input
                  ClassNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  register={register}
                  name='address'
                  errorMessage={errors.address?.message}
                  placeholder='Địa chỉ nhà'
                />
              </div>
            </div>
            <Controller
              name='date_of_birth'
              control={control}
              render={({ field }) => (
                <DateSelect
                  errorMessage={errors.date_of_birth?.message}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />

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
          <div className='flex justify-center md:border-l md:border-gray-300 pl-5'>
            <div className='flex flex-col items-center'>
              <div className='my-5 h-24'>
                <img
                  src={previewImage || getAvatarURL(avatar)}
                  alt=''
                  className='h-full w-full object-cover rounded-full'
                />
              </div>
              <InputFile onChange={handleChangeFile} />
              <div className='mt-3 text-gray-400'>
                <div>Dung lượng tối đa 1 MB</div>
                <div>Định dạng JPEG PNG</div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default Profile
