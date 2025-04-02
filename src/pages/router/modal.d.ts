import { JsxAttribute } from "typescript";

declare namespace isRouteType {
  interface IMeta {
    pageTitle: string,
    icon: string
  }
  interface IRouter {
    path: string;
    element: React.LazyExoticComponent<() => JSX.Element>;
    meta: IMeta,
    children?: IRouter[];
  }
}