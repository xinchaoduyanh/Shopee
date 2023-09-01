export default function Footer() {
  return (
    <footer className='py-16 bg-neutral-100 border-t-orange border-[4px] border-solid'>
      <div className='container'>
        <div className='grid grid-cols-1 md:grid-cols-5  gap-8 '>
          {/* <div className='lg:col-span-1'>
            <div className=''>© 2023 Shopee. Tất cả các quyền được bảo lưu.</div>
          </div>
          <div className='lg:col-span-2'>
            <div>
              Quốc gia & Khu vực: Singapore Indonesia Đài Loan Thái Lan Malaysia Việt Nam Philippines Brazil México
              Colombia Chile
            </div>
          </div>
          <div className='text-center text-sm mt-10 '>
            <div>Công ty TNHH Shopee</div>
            <div className='mt-2'>
              Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành
              phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
            </div>
            <div className='mt-2'>
              Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)
            </div>
            <div className='mt-2'>
              Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
            </div>
            <div className='mt-2'>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</div>
          </div> */}
          <div className='col-span-1'>
            <div className='flex-col text-left'>
              <div className='font-bold w-full uppercase text-sm justify-center block text-black/80'>
                Chăm sóc khách hàng
              </div>
              <ul className=''>
                <li className='text-xs mt-6 text-black/60  hover:text-orange cursor-pointer'>Trung Tâm Trợ Giúp</li>
                <li className='text-xs mt-4 text-black/60 hover:text-orange cursor-pointer'>Shopee Blog</li>
                <li className='text-xs mt-4 text-black/60 hover:text-orange cursor-pointer'>Shopee Mall</li>
                <li className='text-xs mt-4 text-black/60 hover:text-orange cursor-pointer'>Hướng Dẫn Mua Hàng</li>
                <li className='text-xs mt-4 text-black/60 hover:text-orange cursor-pointer'>Hướng Dẫn Bán Hàng</li>
                <li className='text-xs mt-4 text-black/60 hover:text-orange cursor-pointer'>Thanh Toán</li>
                <li className='text-xs mt-4 text-black/60 hover:text-orange cursor-pointer'>Shopee Xu</li>
                <li className='text-xs mt-4 text-black/60 hover:text-orange cursor-pointer'>Vận Chuyển</li>
                <li className='text-xs mt-4 text-black/60 hover:text-orange cursor-pointer'>Trả Hàng & Hoàn Tiền</li>
                <li className='text-xs mt-4 text-black/60 hover:text-orange cursor-pointer'>Chăm Sóc Khách Hàng</li>
                <li className='text-xs mt-4 text-black/60 hover:text-orange cursor-pointer'>Chính Sách Bảo Hành</li>
              </ul>
            </div>
          </div>
          <div className='col-span-1'>
            <div className='flex-col text-left'>
              <div className='font-bold w-full uppercase text-sm justify-center block text-black/80'> VỀ SHOPEE</div>
              <ul className=''>
                <li className='text-xs mt-6 text-black/60 hover:text-orange cursor-pointer'>
                  Giới Thiệu Về Shopee Việt Nam
                </li>
                <li className='text-xs mt-4 text-black/60 hover:text-orange cursor-pointer'>Tuyển Dụng</li>
                <li className='text-xs mt-4 text-black/60 hover:text-orange cursor-pointer'>Chính Sách Bảo Mật</li>
                <li className='text-xs mt-4 text-black/60 hover:text-orange cursor-pointer'>Chính Hãng</li>
                <li className='text-xs mt-4 text-black/60 hover:text-orange cursor-pointer'>Kênh Người Bán</li>
                <li className='text-xs mt-4 text-black/60 hover:text-orange cursor-pointer'>Flash Sales</li>
                <li className='text-xs mt-4 text-black/60 hover:text-orange cursor-pointer'>
                  Chương Trình Tiếp Thị Liên Kết Shopee
                </li>
                <li className='text-xs mt-4 text-black/60 hover:text-orange cursor-pointer'>
                  Liên Hệ Với Truyền Thông
                </li>
              </ul>
            </div>
          </div>
          <div className='col-span-1'>
            <div className='flex-col text-left'>
              <div className='font-bold uppercase w-full text-base justify-center block text-black/80'>Thanh toán</div>
              <ul className=' grid grid-cols-3 gap-1'>
                <li className='text-xs mt-6 p-1   shadow-sm border border-sm text-black/60 '>
                  <img
                    src='https://down-vn.img.susercontent.com/file/d4bbea4570b93bfd5fc652ca82a262a8
                '
                    alt=''
                    className=''
                  />
                </li>
                <li className='text-xs mt-6 p-1   shadow-sm border border-sm text-black/60 '>
                  <img
                    src='https://down-vn.img.susercontent.com/file/a0a9062ebe19b45c1ae0506f16af5c16
                '
                    alt=''
                    className=''
                  />
                </li>
                <li className='text-xs mt-6 p-1   shadow-sm border border-sm text-black/60 '>
                  <img
                    src='https://down-vn.img.susercontent.com/file/38fd98e55806c3b2e4535c4e4a6c4c08
                '
                    alt=''
                    className=''
                  />
                </li>
                <li className='text-xs mt-2 p-1   shadow-sm border border-sm text-black/60 '>
                  <img
                    src='https://down-vn.img.susercontent.com/file/bc2a874caeee705449c164be385b796c
                '
                    alt=''
                    className=''
                  />
                </li>
                <li className='text-xs mt-2 p-1   shadow-sm border border-sm text-black/60 '>
                  <img
                    src='https://down-vn.img.susercontent.com/file/2c46b83d84111ddc32cfd3b5995d9281'
                    alt=''
                    className=''
                  />
                </li>
                <li className='text-xs mt-2 p-1   shadow-sm border border-sm text-black/60 '>
                  <img
                    src='https://down-vn.img.susercontent.com/file/9263fa8c83628f5deff55e2a90758b06
                '
                    alt=''
                    className=''
                  />
                </li>
                <li className='text-xs mt-2 p-1   shadow-sm border border-sm text-black/60 '>
                  <img
                    src='https://down-vn.img.susercontent.com/file/0217f1d345587aa0a300e69e2195c492
                '
                    alt=''
                    className=''
                  />
                </li>
                <li className='text-xs mt-2 p-1   shadow-sm border border-sm text-black/60 '>
                  <img
                    src='https://down-vn.img.susercontent.com/file/5e3f0bee86058637ff23cfdf2e14ca09'
                    alt=''
                    className=''
                  />
                </li>
              </ul>
            </div>
            <div className='flex-col text-left'>
              <div className='uppercase font-bold w-full mt-8 text-base justify-center block text-black/80'>
                Đơn vị vận chuyển{' '}
              </div>
              <ul className=' grid grid-cols-3 gap-1'>
                <li className='text-xs mt-6 p-1   shadow-sm border border-sm text-black/60 '>
                  <img
                    src='https://down-vn.img.susercontent.com/file/vn-50009109-159200e3e365de418aae52b840f24185
                '
                    alt=''
                    className=''
                  />
                </li>
                <li className='text-xs mt-6 p-1   shadow-sm border border-sm text-black/60 '>
                  <img
                    src='https://down-vn.img.susercontent.com/file/d10b0ec09f0322f9201a4f3daf378ed2
                '
                    alt=''
                    className=''
                  />
                </li>
                <li className='text-xs mt-6 p-1   shadow-sm border border-sm text-black/60 '>
                  <img
                    src='https://down-vn.img.susercontent.com/file/77bf96a871418fbc21cc63dd39fb5f15'
                    alt=''
                    className=''
                  />
                </li>
                <li className='text-xs mt-2 p-1   shadow-sm border border-sm text-black/60 '>
                  <img
                    src='https://down-vn.img.susercontent.com/file/957f4eec32b963115f952835c779cd2c'
                    alt=''
                    className=''
                  />
                </li>
                <li className='text-xs mt-2 p-1   shadow-sm border border-sm text-black/60 '>
                  <img
                    src='https://down-vn.img.susercontent.com/file/59270fb2f3fbb7cbc92fca3877edde3f'
                    alt=''
                    className=''
                  />
                </li>
                <li className='text-xs mt-2 p-1   shadow-sm border border-sm text-black/60 '>
                  <img
                    src='https://down-vn.img.susercontent.com/file/0d349e22ca8d4337d11c9b134cf9fe63
                '
                    alt=''
                    className=''
                  />
                </li>
                <li className='text-xs mt-2 p-1   shadow-sm border border-sm text-black/60 '>
                  <img
                    src='https://down-vn.img.susercontent.com/file/3900aefbf52b1c180ba66e5ec91190e5
                '
                    alt=''
                    className=''
                  />
                </li>
                <li className='text-xs mt-2 p-1   shadow-sm border border-sm text-black/60 '>
                  <img
                    src='https://down-vn.img.susercontent.com/file/6e3be504f08f88a15a28a9a447d94d3d'
                    alt=''
                    className=''
                  />
                </li>
                <li className='text-xs mt-2 p-1   shadow-sm border border-sm text-black/60 '>
                  <img
                    src='https://down-vn.img.susercontent.com/file/b8348201b4611fc3315b82765d35fc63'
                    alt=''
                    className=''
                  />
                </li>
                <li className='text-xs mt-2 p-1   shadow-sm border border-sm text-black/60 '>
                  <img
                    src='https://down-vn.img.susercontent.com/file/0b3014da32de48c03340a4e4154328f6'
                    alt=''
                    className=''
                  />
                </li>
                <li className='text-xs mt-2 p-1   shadow-sm border border-sm text-black/60 '>
                  <img
                    src='https://down-vn.img.susercontent.com/file/vn-50009109-ec3ae587db6309b791b78eb8af6793fd'
                    alt=''
                    className=''
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className='col-span-1'>
            <div className='flex-col text-left'>
              <div className='uppercase font-bold w-full text-base justify-center block text-black/80'>
                Theo dõi chúng tôi trên
              </div>
              <ul className=''>
                <li className='text-xs mt-4 text-black/60 hover:text-orange cursor-pointer flex'>
                  <img
                    className='h-4 w-4 mr-3'
                    src='https://down-vn.img.susercontent.com/file/2277b37437aa470fd1c71127c6ff8eb5'
                    alt=''
                  />
                  Facebook
                </li>
                <li className='text-xs mt-4 text-black/60 hover:text-orange cursor-pointer flex'>
                  <img
                    className='h-4 w-4 mr-3'
                    src='https://down-vn.img.susercontent.com/file/5973ebbc642ceee80a504a81203bfb91'
                    alt=''
                  />
                  Instargram
                </li>
                <li className='text-xs mt-4 text-black/60 hover:text-orange cursor-pointer flex'>
                  <img
                    className='h-4 w-4 mr-3'
                    src='https://down-vn.img.susercontent.com/file/f4f86f1119712b553992a75493065d9a'
                    alt=''
                  />
                  Linkedln
                </li>
              </ul>
            </div>
          </div>
          <div className='col-span-1'>
            <div className='flex-col text-left'>
              <div className='font-bold w-full text-base uppercase justify-center block text-black/80'>
                TẢI ỨNG DỤNG SHOPEE NGAY THÔI
              </div>
              <ul className='grid grid-cols-2'>
                <li className='text-xs mt-6 text-black/60'>
                  <img src='https://down-vn.img.susercontent.com/file/a5e589e8e118e937dc660f224b9a1472' alt='' />
                </li>
                <li className='text-xs mt-4 text-black/60 hover:text-orange cursor-pointer '>
                  <div className=''>
                    <div className='w-[100px] h-8 p-1 justify-center rounded-sm shadow-md border border-sm'>
                      <img
                        className='w-full'
                        src='https://down-vn.img.susercontent.com/file/ad01628e90ddf248076685f73497c163'
                        alt=''
                      />
                    </div>
                    <div className='w-[100px] h-8 p-1 justify-center rounded-sm shadow-md border border-sm mt-4 '>
                      <img
                        className='w-full'
                        src='https://down-vn.img.susercontent.com/file/ae7dced05f7243d0f3171f786e123def'
                        alt=''
                      />
                    </div>
                    <div className='w-[100px] h-8 p-1 justify-center rounded-sm shadow-md border border-sm mt-4 '>
                      <img
                        className='w-full'
                        src='https://down-vn.img.susercontent.com/file/35352374f39bdd03b25e7b83542b2cb0'
                        alt=''
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
