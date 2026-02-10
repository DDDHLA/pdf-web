import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  FilePdfOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/pdf-viewer',
      icon: <FilePdfOutlined />,
      label: 'PDF查看',
    },
  ];

  return (
    <Layout style={{ height: '100vh' }}>
      {/* 左侧菜单 */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: '#001529',
        }}
      >
        <div style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: collapsed ? '14px' : '18px',
          fontWeight: 500,
          transition: 'all 0.2s',
        }}>
          {collapsed ? '文档' : '智能文档处理'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>

      {/* 右侧内容区 */}
      <Layout>
        {/* 顶部导航栏 */}
        <Header style={{
          padding: '0 24px',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #f0f0f0',
        }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            style: { fontSize: '18px', cursor: 'pointer' },
            onClick: () => setCollapsed(!collapsed),
          })}
          <div style={{ marginLeft: '24px', fontSize: '16px', color: '#1890ff' }}>
            智能合同审核
          </div>
        </Header>

        {/* 主内容 */}
        <Content style={{
          margin: 0,
          padding: 0,
          background: '#f5f5f5',
          overflow: 'hidden',
        }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
