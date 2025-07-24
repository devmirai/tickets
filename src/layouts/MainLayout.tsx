import React from 'react';
import { Layout } from 'antd';
import Header from './Header';
import Footer from './Footer';

const { Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Content className="pt-16 flex-1">
        <div className="min-h-[calc(100vh-8rem)]">
          {children}
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainLayout;