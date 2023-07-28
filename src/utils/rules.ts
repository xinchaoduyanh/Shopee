import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'
type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email là bắt buộc'
    },
    pattern: {
      value: /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/gm,
      message: 'Email không đúng định dạng'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5 đến 160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 5 đến 160 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password là bắt buộc'
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/,
      message: 'Password phải chứa ít nhất 1 kí tự in hoa, 1 kí tự in thường, 1 chữ số từ 0 đến 9  '
    },
    maxLength: {
      value: 160,
      message: 'Độ dài tối đa là 160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài tối thiểu là 5 ký tự'
    }
  },

  confirm_password: {
    required: {
      value: true,
      message: 'Nhập lại Password là bắt buộc'
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      message: 'Password không đúng định dạng'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài tối đa là 160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài tối thiểu là 5 ký tự'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Password nhập lại không đúng'
        : undefined
  }
})

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài từ 5 đến 160 ký tự')
    .max(160, 'Độ dài từ 5 đến 160 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/,
      'Password phải chứa ít nhất 1 kí tự in hoa, 1 kí tự in thường, 1 chữ số từ 0 đến 9'
    )
    .min(5, 'Độ dài từ 5 đến 160 ký tự')
    .max(160, 'Độ dài từ 5 đến 160 ký tự'),
  confirm_password: yup
    .string()
    .required('Nhập lại Password là bắt buộc')

    .min(5, 'Độ dài từ 5 đến 160 ký tự')
    .max(160, 'Độ dài từ 5 đến 160 ký tự')
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp')
})
const loginSchema = schema.omit(['confirm_password'])
export type LoginSchema = yup.InferType<typeof loginSchema>
export type Schema = yup.InferType<typeof schema>
