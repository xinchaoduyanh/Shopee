import type { RegisterOptions, UseFormRegister } from 'react-hook-form'
interface Props {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  placeholder?: string
  className?: string
  name: string
  register: UseFormRegister<any>
  rules?: RegisterOptions
  autoComplete?: string
}

export default function Input({
  type,
  errorMessage,
  placeholder,
  className,
  name,
  register,
  rules,
  autoComplete
}: Props) {
  return (
    <div className={className}>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
        {...register(name, rules)}
      />
      <div className='mt-1 text-red-500 min-h-[1.25rem] text-sm'>{errorMessage}</div>
    </div>
  )
}
