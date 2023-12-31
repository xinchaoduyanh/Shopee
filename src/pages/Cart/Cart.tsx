import { Fragment, useContext, useEffect, useMemo } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link, useLocation } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController/QuantityController'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { Purchase } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { produce } from 'immer'
import keyBy from 'lodash/keyBy'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'
import noProduct from 'src/assets/images/no_product.png'
export default function Cart() {
  const { extendedPurchase, setExtendedPurchase } = useContext(AppContext)
  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })

  const location = useLocation()
  console.log(location)
  const ChosenPurchaseIdFromLocation = (location.state as { purchaseId: string } | null)?.purchaseId

  const purchasesInCart = purchasesInCartData?.data.data
  const checkedPurchase = useMemo(() => extendedPurchase.filter((purchase) => purchase.checked), [extendedPurchase])
  const isAllChecked = useMemo(() => extendedPurchase.every((purchase) => purchase.checked), [extendedPurchase])
  const checkedPurchaseLength = checkedPurchase.length

  const totalCheckedPurchasePrice = useMemo(
    () =>
      checkedPurchase.reduce((result, current) => {
        return result + current.product.price * current.buy_count
      }, 0),
    [checkedPurchase]
  )
  const totalCheckedPurchaseSavingPrice = useMemo(
    () =>
      checkedPurchase.reduce((result, current) => {
        return (
          result + current.product.price_before_discount * current.buy_count - current.product.price * current.buy_count
        )
      }, 0),
    [checkedPurchase]
  )

  const buyProductsMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000
      })
    }
  })
  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      refetch()
    }
  })
  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      // console.log('hi')

      refetch()
    }
  })

  useEffect(() => {
    setExtendedPurchase((prev) => {
      const extendedPurchasesObject = keyBy(prev, '_id')
      console.log(extendedPurchasesObject)

      return (
        purchasesInCart?.map((purchase) => {
          const isChoosenPurchaseFromLocation = ChosenPurchaseIdFromLocation === purchase._id
          return {
            ...purchase,
            disabled: false,
            checked: isChoosenPurchaseFromLocation || Boolean(extendedPurchasesObject[purchase._id]?.checked)
          }
        }) || []
      )
    })
  }, [purchasesInCart, ChosenPurchaseIdFromLocation, setExtendedPurchase])
  // console.log(extendedPurchase)
  useEffect(() => {
    window.history.replaceState(null, '')
  }, [])
  const handleCheck = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const purchase = extendedPurchase[purchaseIndex]
    console.log(purchase)
    setExtendedPurchase(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }
  const handleCheckAll = () => {
    setExtendedPurchase((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }
  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchase(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }
  const handleQuantity = (purchaseIndex: number, value: number, enabled: boolean) => {
    if (enabled) {
      const purchase = extendedPurchase[purchaseIndex]
      console.log(purchase)
      setExtendedPurchase(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )

      updatePurchaseMutation.mutate({
        product_id: purchase.product._id,
        buy_count: value
      })
    }
  }
  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchase[purchaseIndex]._id
    deletePurchaseMutation.mutate([purchaseId])
  }
  const handleDeleteManyPurchase = () => {
    const purchaseIds = checkedPurchase.map((purchase) => purchase._id)
    deletePurchaseMutation.mutate(purchaseIds)
  }
  const handleBuyPurchase = () => {
    if (checkedPurchaseLength > 0) {
      const body = checkedPurchase.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyProductsMutation.mutate(body)
    }
  }
  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        {extendedPurchase.length > 0 ? (
          <Fragment>
            {' '}
            <div className='overflow-auto'>
              <div className='min-w-[1000px]'>
                <div className='grid grid-cols-12 rounded-sm shadow bg-white py-5 px-9 text-sm capitalize text-gray-500'>
                  <div className='col-span-6 bg-white'>
                    <div className='flex items-center'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3 '>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange mr-3'
                          checked={isAllChecked}
                          onChange={handleCheckAll}
                        />
                      </div>
                      <div className='flex-grow capitalize text-black'>Sản phẩm</div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid text-center grid-cols-5'>
                      <div className='col-span-2'>Đơn giá</div>
                      <div className='col-span-1'>Số lượng</div>
                      <div className='col-span-1'>Số tiền</div>
                      <div className='col-span-1'>Thao tác</div>
                    </div>
                  </div>
                </div>
                {extendedPurchase.length > 0 && (
                  <div className='my-3 rounded-sm bg-white p-5 shadow'>
                    {extendedPurchase.map((purchase, index) => {
                      return (
                        <div
                          className='mb-5 first:mt-0 items-center grid grid-cols-12 text-center rounded-sm border border-gray-200 bg-white text-gray-500 text-sm'
                          key={index}
                        >
                          <div className='col-span-6'>
                            <div className='flex'>
                              <div className='flex flex-shrink-0 items-center justify-center pr-3 '>
                                <input
                                  type='checkbox'
                                  className='h-5 w-5 accent-orange mr-3'
                                  checked={purchase.checked}
                                  onChange={handleCheck(index)}
                                />
                              </div>
                              <div className='flex-grow'>
                                <div className='flex'>
                                  <Link
                                    to={`${path.home}${generateNameId({
                                      name: purchase.product.name,
                                      id: purchase.product._id
                                    })}`}
                                    className='h-20 w-20 flex-shrink-0'
                                  >
                                    <img src={purchase.product.image} alt={purchase.product.name} />
                                  </Link>
                                  <div className='flex-grow pt-2 px-1 pb-1 text-left '>
                                    <Link
                                      to={`${path.home}${generateNameId({
                                        name: purchase.product.name,
                                        id: purchase.product._id
                                      })}`}
                                      className='line-clamp-2'
                                    >
                                      {purchase.product.name}
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='col-span-6'>
                            <div className='grid grid-cols-5 items-center '>
                              <div className='col-span-2'>
                                <div className='flex items-center justify-center'>
                                  <span className='line-through text-gray-300 '>
                                    {' '}
                                    ₫{formatCurrency(purchase.product.price_before_discount)}
                                  </span>
                                  <span className=' ml-3'>₫{formatCurrency(purchase.product.price)}</span>
                                </div>
                              </div>
                              <div className='col-span-1'>
                                <QuantityController
                                  max={purchase.product.quantity}
                                  classNameWrapper='flex items-center'
                                  value={purchase.buy_count}
                                  onIncrease={(value) =>
                                    handleQuantity(index, value, value <= purchase.product.quantity)
                                  }
                                  onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                                  disabled={purchase.disabled}
                                  onType={handleTypeQuantity(index)}
                                  onFocusOut={(value) =>
                                    handleQuantity(
                                      index,
                                      value,
                                      value >= 1 &&
                                        value <= purchase.product.quantity &&
                                        value !== (purchasesInCart as Purchase[])[index].buy_count
                                    )
                                  }
                                />
                              </div>
                              <div className='col-span-1'>
                                <span className='text-orange'>
                                  ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                                </span>
                              </div>
                              <div className='col-span-1'>
                                <button
                                  onClick={handleDelete(index)}
                                  className='bg-none text-black transition-colors hover:text-orange'
                                >
                                  Xóa
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className='shadow flex-col sm:flex-row borde mt-10 border-gray-100 sticky bottom-0 z-10 flex sm:items-center rounded-sm bg-white p-5'>
              <div className='flex items-center'>
                <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                  <input
                    type='checkbox'
                    className='h-5 w-5 accent-orange'
                    checked={isAllChecked}
                    onChange={handleCheckAll}
                  />
                </div>
                <button className='mx-3 border-none bg-none' onClick={handleCheckAll}>
                  Chọn tất cả ({extendedPurchase.length})
                </button>
                <button onClick={handleDeleteManyPurchase} className='mx-3 border-none bg-none'>
                  Xóa
                </button>
              </div>

              <div className='sm:ml-auto flex flex-col sm:flex-row items-center mt-5 sm:mt-0'>
                <div>
                  <div className='flex items-center sm:justify-end'>
                    <div className=''>Tông thanh toán (0 sản phẩm)</div>
                    <div className='ml-2 text-2xl text-orange'>đ {formatCurrency(totalCheckedPurchasePrice)}</div>
                  </div>
                  <div className='flex items-center sm:justify-end text-xs'>
                    <div className='text-gray-500'>Tiết kiệm</div>
                    <div className='ml-6 text-orange'>đ {formatCurrency(totalCheckedPurchaseSavingPrice)}</div>
                  </div>
                </div>
                <Button
                  onClick={handleBuyPurchase}
                  disabled={buyProductsMutation.isLoading}
                  className='flex sm:ml-4 mt-5 sm:mt-0 justify-center items-center w-52 h-10 text-center  uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                >
                  Mua hàng
                </Button>
              </div>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className='text-center'>
              <img src={noProduct} className='h-24 w-24 mx-auto' alt='no purchase ' />
              <div className='font-bold text-gray-400 mt-3'>Giỏ hàng của bạn còn trống</div>
              <div className='mt-8 text-center'>
                <Link
                  to={path.home}
                  className='mt-8 bg-orange px-9 py-2 rounded-sm uppercase text-white hover:bg-orange/80 transition-opacity'
                >
                  mua ngay
                </Link>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  )
}
