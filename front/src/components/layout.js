import React from 'react';
import CustomSidebar from './sidebar.js';

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <CustomSidebar />
      <div style={{  margin: '0 2% 0 7%', width: '100%'}}>{children}</div>
    </div>
  );
};

export default Layout;