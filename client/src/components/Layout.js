import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../App.css'; // Make sure your styles are imported

const Layout = ({ children, showControls = false, userRole = 'user' }) => {
  return (
    <div className="layout">
      <Header showControls={showControls} userRole={userRole} />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;