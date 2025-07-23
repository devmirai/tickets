import React from 'react';
import { ConfigProvider } from 'antd';
import AppRoutes from './routes/AppRoutes';
import 'antd/dist/reset.css';

// Ant Design theme configuration
const theme = {
  token: {
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#f5222d',
    borderRadius: 8,
    fontSize: 14,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    Card: {
      borderRadius: 12,
      boxShadowTertiary: '0 2px 8px rgba(0,0,0,0.1)',
    },
    Button: {
      borderRadius: 8,
      primaryShadow: '0 2px 4px rgba(24,144,255,0.2)',
    },
    Input: {
      borderRadius: 8,
    },
  },
};

function App() {
  return (
    <ConfigProvider theme={theme}>
      <AppRoutes />
    </ConfigProvider>
  );
}

export default App;