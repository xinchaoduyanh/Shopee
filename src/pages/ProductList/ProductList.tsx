import AsideFilter from './components/AsideFilter'
import SortProductList from './components/SortProductList'
import Product from './components/Product/Product'

import { useQuery } from 'react-query'
import productApi from 'src/apis/product.api'

import Pagination from 'src/components/Pagination/Pagination'
import { ProductListConfig } from 'src/types/product.type'
import categoryApi from 'src/apis/category.api'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { Helmet } from 'react-helmet-async'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function ProductList() {
  const queryConfig = useQueryConfig()
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 1000 * 60
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    },
    keepPreviousData: true
  })

  return (
    <div className='bg-gray-100 py-6'>
      <Helmet>
        <title>Shopee | Trang chủ</title>
        <meta name='description' content='Helmet application' />
      </Helmet>
      <div className='container'>
        {productsData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter queryConfig={queryConfig} categories={categoriesData?.data.data || []} />
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                {productsData &&
                  productsData.data.data.products.map((product) => (
                    <div key={product._id} className='col-span-1'>
                      <Product key={product._id} product={product} />
                    </div>
                  ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
