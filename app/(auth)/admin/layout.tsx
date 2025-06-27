'use client';

import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <Content
        style={{
          background: '#F5F6FA',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </Content>
    </Layout>
  );
}
