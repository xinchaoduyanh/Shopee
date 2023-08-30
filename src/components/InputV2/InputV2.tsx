import { InputHTMLAttributes, useState } from 'react'
import { UseControllerProps, useController } from 'react-hook-form'
export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  ClassNameInput?: string
  ClassNameError?: string
}

function InputV2(props: UseControllerProps & InputNumberProps) {
  const { field, fieldState } = useController(props)
  const {
    type,
    onChange,
    className,
    value = '',
    ClassNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    ClassNameError = 'mt-1 text-red-500 min-h-[1.25rem] text-sm',
    ...rest
  } = props
  const [localValue, setLocalValue] = useState<string>(field.value)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueFromInput = event.target.value
    const numberCondition = type === 'number' && (/^\d+$/.test(valueFromInput) || valueFromInput === '')
    if (numberCondition || type !== ' number') {
      // Cap nhat  localValue state
      setLocalValue(valueFromInput)
      //Goi onchange de cap nhat state React Hook Form
      field.onChange(event)
      //Thuc thi onChangeCallBack tu ben ngoai truyen vao Props
      onChange && onChange(event)
    }
  }
  return (
    <div className={className}>
      <input {...field} {...rest} onChange={handleChange} value={value || localValue} className={ClassNameInput} />
      <div className={ClassNameError}>{fieldState.error?.message}</div>
    </div>
  )
}
export default InputV2
