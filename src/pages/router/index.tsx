import { lazy } from 'react';
import { isRouteType } from './modal';
const Home = lazy(() => import ('../home/index'));
const JsonParse = lazy(() => import ('../json-parse/index'));
const DataView = lazy(() => import ('../data-view/index'));
// import Home from '../home/index';

const routes: isRouteType.IRouter[] = [
  {
    path: 'home',
    element: Home,
    meta: {
      pageTitle: '首页',
      icon: ''
    },
  },
  {
    path: 'json-parse',
    element: JsonParse,
    meta: {
      pageTitle: 'json解析',
      icon: ''
    },
  },
  {
    path: 'data-board',
    element: DataView,
    meta: {
      pageTitle: '数据看板',
      icon: ''
    },
  }

];

export default routes;
