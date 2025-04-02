import React, { useState, useEffect } from 'react';
import { Suspense } from 'react';
import { Button, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom'
import { Routes, Route } from 'react-router';
import router from './pages/router';
import { isRouteType } from './pages/router/modal';
import style from './App.less';

// const { BrowserWindow } = window.require("@electron/remote")
type MenuItem = Required<MenuProps>['items'][number];
function App() {
  // const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  // const openNewWindow = () => {
  //   new BrowserWindow({
  //     width:500,
  //     height:500
  //   })
  // }
  const items: MenuItem[] = [
    {
      key: 'sub1',
      label: 'Navigation One',
      icon: <MailOutlined />,
      children: [
        {
          key: 'g1',
          label: 'Item 1',
          type: 'group',
          children: [
            { key: '1', label: 'Option 1' },
            { key: '2', label: 'Option 2' },
          ],
        },
        {
          key: 'g2',
          label: 'Item 2',
          type: 'group',
          children: [
            { key: '3', label: 'Option 3' },
            { key: '4', label: 'Option 4' },
          ],
        },
      ],
    },
    {
      key: 'sub2',
      label: 'Navigation Two',
      icon: <AppstoreOutlined />,
      children: [
        { key: '5', label: 'Option 5' },
        { key: '6', label: 'Option 6' },
        {
          key: 'sub3',
          label: 'Submenu',
          children: [
            { key: '7', label: 'Option 7' },
            { key: '8', label: 'Option 8' },
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
    {
      key: 'grp',
      label: 'Group',
      type: 'group',
      children: [
        { key: '13', label: 'Option 13' },
        { key: '14', label: 'Option 14' },
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

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    console.log(style, style.app)
  }, []);

  return (
    <div className={style.app}>
      <div className="app-menu">
        <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          onClick={onClick}
          style={{ width: 256 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
      
      {/* <Button onClick={() => navigate('/home')}>测试跳转</Button> */}
      <Routes>
        {handleRouterList(router)}
      </Routes>

      {/* <button onClick={openNewWindow}>点我开启新窗口</button> */}
    </div>
  );
}

export default App;
