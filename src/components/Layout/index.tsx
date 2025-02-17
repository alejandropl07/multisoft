"use client";

import { ToastContainer } from "react-toastify";
import Footer from "../Footer";

// import Signin from '../blocks/navbar/partials/Signin';
// import Footer from '../Footer/FooterNew';
// import Header from '../Header/HeaderNew';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <Header /> */}
      {children}
      <Footer />
      <ToastContainer />
      {/* <Signin /> */}
    </>
  );
}
