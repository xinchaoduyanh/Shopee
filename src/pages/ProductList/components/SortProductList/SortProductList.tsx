import classNames from 'classnames'
import { sortBy, order as OrderConstant } from 'src/constants/product'
import { ProductListConfig } from 'src/types/product.type'
import { QueryConfig } from '../../ProductList'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { omit } from 'lodash'

interface SortProductListProps {
  pageSize: number
  queryConfig: QueryConfig
}

export default function SortProductList({ queryConfig, pageSize }: SortProductListProps) {
  const navigate = useNavigate()
  const page = Number(queryConfig.page)
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sortByValue === sort_by
  }
  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }
  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }
  return (
    <div className='bg-gray-300/20 py-4 px-3'>
      <div className='flex flex-wrap justify-between items-center gap-2'>
        <div className='flex items-center flex-wrap gap-2'>
          <div>Sắp xếp theo</div>
          <button
            className={classNames('h-8 px-4 capitalize text-sm  text-center', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.view),
              'bg-white text-black hover:bg-slave-100': !isActiveSortBy(sortBy.view)
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames('h-8 px-4 capitalize text-sm  text-center', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.createdAt),
              'bg-white text-black hover:bg-slave-100': !isActiveSortBy(sortBy.createdAt)
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={classNames('h-8 px-4 capitalize text-sm  text-center', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.sold),
              'bg-white text-black hover:bg-slave-100': !isActiveSortBy(sortBy.sold)
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            Bán chạy
          </button>

          <select
            // defaultValue=''
            className={classNames(
              'h-8 px-4 capitalize text-left text-sm outline-none rounded',
              isActiveSortBy(sortBy.price)
                ? 'bg-orange text-white hover:bg-orange/80'
                : 'bg-white text-black hover:bg-slave-100'
            )}
            value={order || ''}
            onChange={(event) => handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
          >
            <option value='' disabled className='bg-white text-black'>
              Giá
            </option>
            <option value={OrderConstant.asc} className='bg-white text-black'>
              Giá: Thấp đến cao
            </option>
            <option value={OrderConstant.desc} className='bg-white text-black'>
              Giá: Cao đến thấp
            </option>
          </select>
        </div>
        <div className=' flex items-center flex-wrap'>
          <div>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2 flex'>
            {page === 1 ? (
              <span className='cursor-not-allowed flex justify-center items-center shadow w-9  h-8 rounded-tr-sm rounded-br-sm bg-white/60 hover:bg-slate-100 '>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='flex justify-center items-center shadow w-9  h-8 rounded-tr-sm rounded-br-sm bg-white/60 hover:bg-slate-100 '
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </Link>
            )}

            {page === pageSize ? (
              <span className='cursor-not-allowed flex justify-center items-center shadow w-9  h-8 rounded-tr-sm rounded-br-sm bg-white/60 hover:bg-slate-100 '>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='flex justify-center items-center shadow w-9  h-8 rounded-tr-sm rounded-br-sm bg-white/60 hover:bg-slate-100 '
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
