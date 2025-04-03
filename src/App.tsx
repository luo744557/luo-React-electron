import React, { useState, useEffect } from 'react';
import { Suspense } from 'react';
import { ConfigProvider, Breadcrumb, Layout, Menu, theme, } from 'antd';
import type { MenuProps } from 'antd';
import { MailOutlined, SettingOutlined, } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { Routes, Route, useLocation } from 'react-router';
import router from './pages/router';
import { isRouteType } from './pages/router/modal';
import UserInfo from './component/user-info';
import './App.less';

const { Header, Content, Sider } = Layout;

const itemsHeader: MenuProps['items'] = ['1', '2', '3', '4', '5', '6'].map((key) => ({
  key,
  label: `nav ${key}`,
}));
// const { BrowserWindow } = window.require("@electron/remote")

interface MenuSliderItem {
  key?: string,
  label?: string,
  icon?: React.ReactNode,
  type?: 'group' | 'divider',
  children?: MenuSliderItem[],
}
function App() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [ breadcrumbItemList, setBreadcrumbItemList ] = useState<object[]>([{title: 'App'}]);
  const [path, setPath] = useState<Array<string>>([]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();
  useEffect(() => {
    console.log(location)
    if (location && location.pathname) {
      // console.log([location.pathname.replace('/', '')])
      setPath([location.pathname.replace('/', '')]);
    }
  }, [location])
  
  // const openNewWindow = () => {
  //   new BrowserWindow({
  //     width:500,
  //     height:500
  //   })
  // }
  const items: any[] = [
    {
      key: 'sub1',
      label: '前端工具箱',
      icon: <MailOutlined />,
      children: [
        {
          key: 'g1',
          label: '数据类',
          type: 'group',
          children: [
            { key: 'json-parse', label: 'JSON解析' },
            { key: 'data-board', label: '数据看板' },
          ],
        },
        {
          key: 'g2',
          label: '图片类',
          type: 'group',
          children: [
            { key: '3', label: 'Option 3' },
            { key: '4', label: 'Option 4' },
          ],
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'sub4',
      label: 'Navigation Three',
      icon: <SettingOutlined />,
      children: [
        { key: '9', label: 'Option 9' },
        { key: '10', label: 'Option 10' },
        { key: '11', label: 'Option 11' },
        { key: '12', label: 'Option 12' },
      ],
    },
  ];
  const routeElement = (item: isRouteType.IRouter): React.ReactNode => {
    if (!item.element) {
      return null;
    }
    return <Suspense fallback={<div>loading...</div>}>
      {<item.element />}
    </Suspense>
  }
  const handleRouterList = (routerList: isRouteType.IRouter[]) => {
    return routerList.map((item: isRouteType.IRouter) => {
      if (!item.element) {
        return null;
      }
      return <Route
        key={item.path}
        path={item.path}
        element={routeElement(item)}
      >
        {handleRouterList(item.children || [])}
      </Route>
    })
  }

  const sliderMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    const { key } = e;
    let tempKey = key;
    setBreadcrumbItemList([{title: 'App'}, {title: tempKey}]);
    navigate(key);
  };

  return (
    <ConfigProvider>
      <Layout className="app">
        <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            // defaultSelectedKeys={[]}
            items={itemsHeader}
          />
          <UserInfo />
          
        </Header>
        <Layout>
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <Menu
              onClick={sliderMenuClick}
              theme="dark"
              defaultSelectedKeys={path}
              defaultOpenKeys={['sub1']}
              mode="inline"
              inlineCollapsed={collapsed}
              items={items}
            />
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb
              items={breadcrumbItemList}
              style={{ margin: '16px 0' }}
            />
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                {handleRouterList(router)}
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
