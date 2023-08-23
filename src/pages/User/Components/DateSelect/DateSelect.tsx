import { range } from 'lodash'
import { useEffect, useState } from 'react'

interface DateSelectProps {
  onChange?: (value: Date) => void
  errorMessage?: string
  value?: Date
}

export default function DateSelect({ onChange, errorMessage, value }: DateSelectProps) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: ValueFromSelect, name } = event.target
    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(ValueFromSelect)
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }
  // console.log('ren');
  
  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])
  return (
    <div className='flex flex-wrap mt-2 sm:flex-row'>
      <div className='truncate sm:w-[20%] pt-3 sm:text-right capitalize'>Ngày sinh</div>
      <div className='truncate sm:w-[80%] sm:pl-5 '>
        <select
          name='date'
          value={value?.getDate() || date.date}
          onChange={handleChange}
          className='h-10 w-[30%]  rounded-sm  border border-black/30 px-3 capitalize hover:border-orange cursor-pointer'
        >
          <option disabled>ngày</option>
          {range(1, 30).map((item) => {
            return (
              <option value={item} key={item}>
                {item}
              </option>
            )
          })}
        </select>
        <select
          name='month'
          onChange={handleChange}
          value={value?.getMonth() || date.month}
          className='h-10 w-[30%]  rounded-sm  border border-black/30 px-3 capitalize hover:border-orange cursor-pointer ml-5'
        >
          <option disabled>tháng</option>
          {range(0, 12).map((item) => {
            return (
              <option value={item} key={item}>
                {item + 1}
              </option>
            )
          })}
        </select>
        <select
          name='year'
          onChange={handleChange}
          value={value?.getFullYear() || date.year}
          className='h-10 w-[30%]  rounded-sm border border-black/30 px-3 capitalize hover:border-orange cursor-pointer ml-6  '
        >
          <option disabled>năm</option>
          {range(1940, 2024).map((item) => {
            return (
              <option value={item} key={item}>
                {item}
              </option>
            )
          })}
        </select>
        <div className='mt-1 text-red-500 min-h-[1.25rem]  text-sm'>{errorMessage} </div>
      </div>
    </div>
  )
}
