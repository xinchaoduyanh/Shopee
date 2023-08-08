import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating/ProductRating'
import path from 'src/constants/path'
import { Product as ProducType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from 'src/utils/utils'

interface ProductProps {
  product: ProducType
}

export default function Product({ product }: ProductProps) {
  return (
    <Link to={`${path.home}${generateNameId({ name: product.name, id: product._id })}`}>
      <div className='overflow-hidden bg-white shadow rounded-sm hover:translate-y-[-0.0625rem] hover:shadow-md duration-100 transition-transform'>
        <div className='w-full pt-[100%] relative'>
          <img
            src={product.image}
            alt={product.name}
            className='absolute top-0 left-0 bg-white w-full h-full object-cover'
          />
        </div>
        <div className='p-2 overflow-hidden '>
          <div className='min-h-[2rem]  line-clamp-2 text-xs'>{product.name}</div>
          <div className='flex items-center mt-3'>
            <div className='line-through max-w-[45%] text-xs text-gray-500 truncate'>
              <span>₫</span>
              <span>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className='mr-1 max-w-[50%] text-orange ml-1 text-base   truncate'>
              <span>₫</span>
              <span>{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-start'>
            <ProductRating rating={product.rating} />
            <div className='ml-2 text-sm'>
              <span>{formatNumberToSocialStyle(product.sold)} </span>
              <span>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
