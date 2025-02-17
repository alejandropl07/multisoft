"use client";
import React, { useEffect } from "react";
import Wrapper from "@/src/layout/wrapper";
import HomePage from "./(frontend)/home/page";
import Aos from "aos";

const Home = () => {
  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      body.classList.remove("rtl");
    }
    Aos.init({
      duration: 1200,
    });
  }, []);

  return (
    <>
      <Wrapper>
        <HomePage/>
      </Wrapper>
    </>
  );
};

export default Home;
