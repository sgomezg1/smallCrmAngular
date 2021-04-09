import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/app',
    icon: 'cil-home'
  },
  {
    name: 'Clients',
    url: '/app/clients',
    icon: 'cil-diamond'
  },
  {
    name: 'Bills',
    url: '/app/bills',
    icon: 'cil-wallet'
  },
  {
    name: 'Items',
    url: '/app/items',
    icon: 'cil-pencil'
  },
  {
    name: 'Users',
    url: '/app/users',
    icon: 'cil-user'
  }
];