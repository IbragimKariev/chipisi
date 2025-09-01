export const routes = {
  login: '/login',
  home: '/',
  companies: '/companies',
  users: '/users',
  roles: '/roles',
  orders: '/orders',

  catalog: {
    index: '/catalog',
    productsList: '/catalog/productsList',
    item: (id = ':productId') => `/catalog/productsList/${id}`, 
    priceList: '/catalog/priceList',
  },
}