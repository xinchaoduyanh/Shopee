import { InputHTMLAttributes, forwardRef } from 'react'
export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  ClassNameInput?: string
  ClassNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    errorMessage,
    className,
    ClassNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    ClassNameError = 'mt-1 text-red-500 min-h-[1.25rem] text-sm',
    onChange,
    ...rest
  },
  ref
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(event)
    }
  }
  return (
    <div className={className}>
      <input onChange={handleChange} ref={ref} {...rest} className={ClassNameInput} />
      <div className={ClassNameError}>{errorMessage}</div>
    </div>
  )
})
export default InputNumber
