"use client";
import Footer from '../Footer';
// import HeaderStyle2 from '../Header/HeaderStyle2';

export default function LayoutStyle2({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <HeaderStyle2 variant='cs_type_1 cs_color_1 ' /> */}
      {children}
      <Footer />
    </>
  );
}
