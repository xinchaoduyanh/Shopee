import DOMPurify from 'dompurify'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { useNavigate, useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import ProductRating from 'src/components/ProductRating/ProductRating'
// import useQueryConfig from 'src/hooks/useQueryConfig'
import { Product as ProductType, ProductListConfig } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from 'src/utils/utils'
import Product from '../ProductList/components/Product'
import QuantityController from 'src/components/QuantityController/QuantityController'
import purchaseApi from 'src/apis/purchase.api'
import { purchasesStatus } from 'src/constants/purchase'
import { toast } from 'react-toastify'
import path from 'src/constants/path'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { convert } from 'html-to-text'
export default function ProductDetail() {
  const { t } = useTranslation(['product', 'home'])
  const [buyCount, setBuyCount] = useState(1)
  const { nameId } = useParams()
  // const queryConfig = useQueryConfig()
  const id = getIdFromNameId(nameId as string)
  const { data: ProductDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const queryCilent = useQueryClient()
  const product = ProductDetailData?.data.data
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const imageRef = useRef<HTMLImageElement>(null)
  const currentImage = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [currentIndexImages, product]
  )
  // console.log(product)
  // console.log(currentImage)
  const queryConfig: ProductListConfig = { limit: 20, page: '1', category: product?.category._id }
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig)
    },
    enabled: Boolean(product),
    staleTime: 3 * 1000 * 60
  })
  const navigate = useNavigate()
  const addToCartMutation = useMutation(purchaseApi.addToCart)
  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  const chooseActive = (img: string) => {
    setActiveImage(img)
  }
  const next = () => {
    if (currentIndexImages[1] < (product as ProductType).images.length) {
      setCurrentIndexImages([currentIndexImages[0] + 1, currentIndexImages[1] + 1])
    }
  }
  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages([currentIndexImages[0] - 1, currentIndexImages[1] - 1])
    }
  }
  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    // console.log(rect)

    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    const { offsetX, offsetY } = event.nativeEvent
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }
  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }
  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }
  const addToCart = () => {
    addToCartMutation.mutate(
      { buy_count: buyCount, product_id: product?._id as string },
      {
        onSuccess: (data) => {
          toast.success(data.data.message, { autoClose: 3000 })
          queryCilent.invalidateQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
        }
      }
    )
  }
  const buyNow = async () => {
    const res = await addToCartMutation.mutateAsync({ buy_count: buyCount, product_id: product?._id as string })
    const purchase = res.data.data
    console.log(purchase)

    navigate(path.cart, {
      state: {
        purchaseId: purchase._id
      }
    })
  }

  if (!product) return null
  return (
    <div className='bg-gray-200 py-6'>
      <Helmet>
        <title>Shoppe clone | {product.name} </title>
        <meta
          name='description'
          content={convert(product.description, {
            limits: {
              maxDepth: 120
            }
          })}
        />
      </Helmet>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full pt-[100%] shadow cursor-zoom-in overflow-hidden'
                onMouseLeave={handleRemoveZoom}
                onMouseMove={handleZoom}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  ref={imageRef}
                  className='absolute pointer-events-none top-0 left-0 h-full w-full bg-white object-cover'
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-2'>
                <button
                  onClick={prev}
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </button>
                <button
                  onClick={next}
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
                {currentImage.map((img) => {
                  const isActive = img === activeImage
                  return (
                    <div key={img} className='relative w-full pt-[100%]' onMouseEnter={() => chooseActive(img)}>
                      <img
                        src={img}
                        alt={product.name}
                        className='cursor-pointer absolute top-0 left-0 h-full w-full bg-white object-cover'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-orange' />}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                <span className='border-b border-orange text-orange mr-1'>{product.rating}</span>
                <ProductRating
                  rating={product.rating}
                  activeClassname='text-orange fill-orange h-4 w-4'
                  nonActiveClassname='text-gray fill-gray-300 h-4 w-4'
                />
                <div className='h-4 mx-4 w-[1px] bg-gray-300'></div>
                <div>
                  <span>{formatNumberToSocialStyle(product.sold)}</span>
                  <span>Đã bán</span>
                </div>
              </div>
              <div className='flex items-center mt-8 bg-gray-50 px-5 py-4'>
                <div className='text-gray-400 mr-2 line-through'>₫{formatCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-orange mr-4 text-3xl font-medium'>₫{formatCurrency(product.price)}</div>
                <div className='bg-orange uppercase text-white px-1 py-[2px] text-xs'>
                  {rateSale(product.price, product.price_before_discount)}% Đã giảm
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <QuantityController
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onType={handleBuyCount}
                  value={buyCount}
                  max={product.quantity}
                />
                <div className='ml-6 text-sm text-gray-300'>
                  {product.quantity} {t('product:available')}
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <button
                  onClick={addToCart}
                  className='flex h-12 capitalize px-5 items-center cursor-pointer shadow-sm hover:bg-orange/5 justify-center rounded-sm border-orange border text-orange bg-orange/10'
                >
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='w-5 h-5 mr-[10px] fill-current text-orange stroke-orange'
                  >
                    <g>
                      <g>
                        <polyline
                          fill='none'
                          points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeMiterlimit={10}
                        />
                        <circle cx={6} cy='13.5' r={1} stroke='none' />
                        <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                      </g>
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1='7.5' x2='10.5' y1={7} y2={7} />
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1={9} x2={9} y1='8.5' y2='5.5' />
                    </g>
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button
                  onClick={buyNow}
                  className='ml-4 h-12 capitalize px-5 items-center cursor-pointer shadow-sm bg-orange text-white hover:bg-orange/70'
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container'>
          <div className='mt-8 bg-white p-4 shadow'>
            <div className='rounded bg-gray-50 p-4 text-lg  uppercase text-slate-700'>Mô tả sản phẩm</div>
            <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description)
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container'>
          <div className='uppercase text-gray-400'>Có thể bạn cũng thích</div>
          <div className='mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1'>
            {productsData &&
              productsData.data.data.products.map((product) => (
                <div key={product._id} className='col-span-1'>
                  <Product key={product._id} product={product} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
