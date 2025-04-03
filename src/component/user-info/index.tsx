import React, { useState } from 'react';
import { Avatar, Col, Divider, Drawer, Row, Popover } from 'antd';

interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
}

const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="user-info">
      <Popover content={<div className="user-info-popover">123</div>}>
        <div onClick={showDrawer} className="user" >
          <span className="user-name">admin</span>
          <Avatar
            size="large"
            shape="circle"
            alt="头像"
            src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
          />
        </div>
      </Popover>
      <Drawer width={'30vw'} placement="right" closable={false} onClose={onClose} open={open}>
        <Avatar size="large" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
        <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
          Weber Luo
        </p>
        <p className="site-description-item-profile-p">Personal</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Full Name" content="Luo YJ" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Account" content="luo744557@live.com" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Country" content="China🇨🇳" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="City" content="北京" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Message"
              content="Make things as simple as possible but no simpler."
            />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={12}>
            <DescriptionItem title="Department" content="XTech" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Supervisor" content="web developer" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Skills"
              content="JS/TS/React/Redux/Vue/VueX/Node/MySQL/Git/Nginx/Echarts/"
            />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Contacts</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Email" content="luo744557@live.com" />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Github"
              content={
                <a href="https://github.com/luo744557/luo-React-electron" target="_blank" rel="noreferrer">
                  luo-React-electron
                </a>
              }
            />
          </Col>
        </Row>
      </Drawer>
    </div>
  );
};

export default App;