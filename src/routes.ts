export const routes = {
  login: '/login',
  home: '/',
  reports: '/reports',
  users: '/users',
  roles: '/roles',
  employees: '/employees',
  positions: '/positions',
  appeals: '/appeals',
  categories: '/categories',
  government: {
    index: '/governments',
    item: (id = ':governmentId') => `/government/${id}`,
  },
  objectWorks: {
    index: '/objectWorks',
    item: (id = ':objectWorkId') => `/objectWorks/${id}`,
  },
  handbooks: {
    index: '/handbooks',
    regions: '/handbooks/regions',
    category1: '/handbooks/categoryOne',
    category2: '/handbooks/categoryTwo',
    category3: '/handbooks/categoryThree',
  },
}