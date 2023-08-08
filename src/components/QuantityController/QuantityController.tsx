import InputNumber, { InputNumberProps } from '../InputNumber'
interface Props extends InputNumberProps {
  max?: number
  value?: number
  onIncrease?: (value: number) => void
  onDescrease?: (value: number) => void
  onType?: (value: number) => void
  classnameWrapper?: string
}
export default function QuantityController({
  max,
  onIncrease,
  onDescrease,
  onType,
  value,
  classnameWrapper = 'ml-10 ',
  ...rest
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }
    onType && onType(_value)
  }
  const increase = () => {
    let _value = Number(value) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    onIncrease && onIncrease(_value)
  }
  const descrease = () => {
    let _value = Number(value) - 1
    if (_value < 1) {
      _value = 1
    }
    onDescrease && onDescrease(_value)
  }
  return (
    <div className={classnameWrapper + 'flex items-center'}>
      <button
        onClick={descrease}
        className='flex h-8 w-8 rounded-l-sm items-center justify-center border border-gray-300 text-gray-600'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-4 h-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
        </svg>
      </button>
      <InputNumber
        className=''
        ClassNameError='hidden'
        onChange={handleChange}
        value={value}
        ClassNameInput='h-8 w-14 border-t border-b border-gray-300 outline-none text-center'
        {...rest}
      />
      <button
        onClick={increase}
        className='flex h-8 w-8 border rounded-r-sm items-center justify-center border-gray-300 text-gray-600'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-4 h-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  )
}
