import { lazy } from 'react';
import { isRouteType } from './modal';
const Home = lazy(() => import ('../home/index'));
// import Home from '../home/index';

const routes: isRouteType.IRouter[] = [
  {
    path: '/home',
    element: Home,
    meta: {
      pageTitle: '首页',
      icon: ''
    },
  }
];

export default routes;
