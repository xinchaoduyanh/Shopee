import { Link, NavLink } from 'react-router-dom'
import path from 'src/constants/path'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { getAvatarURL } from 'src/utils/utils'
import classNames from 'classnames'
export default function UserSideNav() {
  const { profile } = useContext(AppContext)
  return (
    <div>
      <div className='flex items-center border-b border-gray-200 py-4'>
        <Link to={path.profile} className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/40'>
          <img src={getAvatarURL(profile?.avatar)} className='h-full w-full object-cover ' alt='' />
        </Link>
        <div className='mb-1 flex-grow pl-4'>
          <div className='mb-1 truncate font-semibold text-gray-600'>vuduyanh</div>
          <NavLink to={path.profile} className='flex itmes-center capitalize text-gray-500'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-4 h-4 mr-1'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
              />
            </svg>
            <span>Sửa hồ sơ</span>
          </NavLink>
        </div>
      </div>
      <NavLink
        to={path.profile}
        className={({ isActive }) =>
          classNames(' flex items-center capitalize transition-colors mt-8', {
            'text-orange': isActive,
            'text-black': !isActive
          })
        }
      >
        <div className='h-5 w-5 mr-6'>
          <img src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4' alt='' />
        </div>
        Tài khoản của tôi
      </NavLink>
      <NavLink
        to={path.changePassword}
        className={({ isActive }) =>
          classNames(' flex items-center capitalize transition-colors mt-8', {
            'text-orange': isActive,
            'text-black': !isActive
          })
        }
      >
        <div className='h-5 w-5 mr-6 fill-orange'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z'
            />
          </svg>
        </div>
        Đỏi mật khẩu
      </NavLink>
      <NavLink
        to={path.historyPurchase}
        className={({ isActive }) =>
          classNames(' flex items-center capitalize transition-colors mt-8', {
            'text-orange': isActive,
            'text-black': !isActive
          })
        }
      >
        <div className='h-5 w-5 mr-6'>
          <img src='https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078' alt='' />
        </div>
        Đơn mua
      </NavLink>
      <NavLink
        to={path.changePassword}
        className={({ isActive }) =>
          classNames(' flex items-center capitalize transition-colors mt-8', {
            'text-orange': isActive,
            'text-black': !isActive
          })
        }
      >
        <div className='h-5 w-5 mr-6'>
          <img src='https://down-vn.img.susercontent.com/file/e10a43b53ec8605f4829da5618e0717c' alt='' />
        </div>
        Thông báo
      </NavLink>
      <NavLink
        to={path.changePassword}
        className={({ isActive }) =>
          classNames(' flex items-center capitalize transition-colors mt-8', {
            'text-orange': isActive,
            'text-black': !isActive
          })
        }
      >
        <div className='h-5 w-5 mr-6'>
          <img src='https://down-vn.img.susercontent.com/file/84feaa363ce325071c0a66d3c9a88748' alt='' />
        </div>
        Kho voucher
      </NavLink>
      <NavLink
        to={path.home}
        className={({ isActive }) =>
          classNames(' flex items-center capitalize transition-colors mt-8', {
            'text-orange': isActive,
            'text-black': !isActive
          })
        }
      >
        <div className='h-5 w-5 mr-6'>
          <img src='https://down-vn.img.susercontent.com/file/a0ef4bd8e16e481b4253bd0eb563f784' alt='' />
        </div>
        Shopee Xu
      </NavLink>
    </div>
  )
}
