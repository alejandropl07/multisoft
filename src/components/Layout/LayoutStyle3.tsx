"use client";
import Footer from '../Footer';
// import HeaderStyle3 from '../Header/HeaderStyle3';

export default function LayoutStyle3({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <HeaderStyle3 /> */}
      {children}
      <Footer />
    </>
  );
}
