import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import FetchSSE from "../components/SSE/fetchSSE";

const Layout = ({ children }) => {
  return (
    <div>
      <FetchSSE />
      <header>
        <Header />
      </header>
      <div style={{ position: 'absolute', top: '250px', left: '0', width: '100%' }}>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
      </div>
    </div>
  );
};

export default Layout;
