import { InputHTMLAttributes } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  ClassNameInput?: string
  ClassNameError?: string
}

export default function Input({
  errorMessage,
  className,
  name,
  register,
  rules,
  ClassNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
  ClassNameError = 'mt-1 text-red-500 min-h-[1.25rem] text-sm',
  ...rest
}: Props) {
  const registerResult = register && name ? register(name, rules) : null
  return (
    <div className={className}>
      <input {...rest} className={ClassNameInput} {...registerResult} />
      <div className={ClassNameError}>{errorMessage}</div>
    </div>
  )
}
