const path = {
  home: '/',
  profile: '/user/profile',
  changePassword: '/user/password',
  historyPurchase: '/user/purchase',
  notification: '/user/notification',
  vouchers: '/user/vouchers',
  coins: 'user/coins',
  user: '/user',
  login: '/login',
  register: '/register',
  logout: '/logout',
  productDetail: ':nameId',
  cart: '/cart'
} as const
export default path
