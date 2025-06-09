// src/components/Layout.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, showControls = false, userRole = 'user' }) => {
  return (
    <>
      <Header showControls={showControls} userRole={userRole} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
