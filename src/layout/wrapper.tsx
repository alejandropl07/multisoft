import React from "react";
import { ToastContainer } from "react-toastify";
import { ChildrenProps } from "../interfaces/interfaces";

const Wrapper = ({ children }: ChildrenProps) => {
  
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export default Wrapper;
