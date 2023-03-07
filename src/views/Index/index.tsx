import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  AppstoreOutlined,
  TagOutlined,
  ShopOutlined,
  FileDoneOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme ,Button } from 'antd';
import './index.less'
import kun from '../../assets/kunkun.jpg'
import { homeList } from '../../api/home';
import type { MenuProps } from 'antd';
import {Outlet} from 'react-router-dom'

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('用户管理', '1', <UserOutlined />, [getItem('用户列表', '11', <AppstoreOutlined />)]),
  getItem('权限管理', '2', <TagOutlined />, [
    getItem('角色列表', '21', <AppstoreOutlined />),
    getItem('权限管理', '22', <AppstoreOutlined />)
  ]),
  getItem('商品管理', 'sub1', <ShopOutlined />, [
    getItem('商品列表', '31', <AppstoreOutlined />),
    getItem('分类参数', '32', <AppstoreOutlined />),
    getItem('商品分类', '33', <AppstoreOutlined />),
  ]),
  getItem('订单管理', '4', <FileDoneOutlined />, [
    getItem('订单列表', '41', <AppstoreOutlined />)
  ]),
  getItem('数据统计', '5', <BarChartOutlined />, [
    getItem('数据报表', '51', <AppstoreOutlined />),
  ]),
];

const Index: React.FC = () => {
  let [leftList, setLeftList] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    homeList().then(res => {
      console.log(res);
      setLeftList(res.data.data)
    })
  }, [])

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <div className='logo_1'>
            <img src={kun} alt="" />
          </div>
          <p>admin管理员</p>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} multiple={false} />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ background: colorBgContainer }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <Button type="primary">退出</Button>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Index;