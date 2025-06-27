'use client';

import BreadcrumbDashboard from '@/components/admin/dashboard/BreadcrumbDashboard';
import Sidenav from '@/components/admin/dashboard/Sidenav';
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Avatar, Button, Layout, Modal, theme } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const { Header, Sider, Content, Footer } = Layout;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [modal, modalContextHolder] = Modal.useModal();
  const router = useRouter();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = async () => {
    modal.confirm({
      title: 'Logout',
      content: 'Are you sure you want to logout?',
      onOk: async () => {
        await fetch('/api/auth/admin/logout', {
          method: 'POST',
        });
        router.push('/admin/auth/login');
      },
      onCancel: () => {},
    });
  };

  return (
    <>
      {modalContextHolder}
      <Layout>
        <Sider width={220} trigger={null} collapsible collapsed={collapsed}>
          <Sidenav />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <div className="flex items-center justify-between w-full px-4">
              <span>E-commerce Nextjs</span>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Avatar
                    src="https://www.sichuantravelguide.com/assets/images/pandas/panda-feiyun-01.jpg"
                    size={38}
                  />
                  <span>John Doe</span>
                </div>
                <Button type="primary" danger onClick={handleLogout}>
                  Log out
                  <LogoutOutlined />
                </Button>
              </div>
            </div>
          </Header>
          <BreadcrumbDashboard pathname={pathname} />
          <Content
            style={{
              margin: '0 16px 16px 16px',
              padding: 24,
              background: colorBgContainer,
              borderRadius: '8px',
              minHeight: 'calc(100vh - 203px)',
            }}
          >
            {children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <span>© 2025 E-commerce Nextjs. All rights reserved.</span>
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}
