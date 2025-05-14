"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import heroImgMobile from "@/public/assets/img/hero/img-mobile.png";
import cancelImg from "@/public/assets/img/cancel.svg";
import AboutMain from "../about/page";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Footer from "@/src/components/Footer";
import FAQ from "@/src/components/FAQ";
import Reviews from "../review/page";
import Services from "../services/page";
import Partners from "../partner/page";
import Blog from "../blog/page";
import { useAppSelector } from "@/src/redux/hooks";

const heroContent = {
  heroImage: "/assets/img/hero/dark.png",
  heroMobileImage: heroImgMobile,
  heroTitleName: "Multisoft",
  heroDesignation: "",
  heroDescriptions: `Multisoft SRL, fundada el 22 de febrero de 2024, se especializa en la implantación de sistemas ERP, particularmente Magnus ERP – SAGE 500, en colaboración con MultiConsulting S.A de C.V. Utilizando su metodología IMPROVE (Impacto en la Productividad y Ventajas Estratégicas) para ofrecer consultoría, implantación y verticalización del ERP.`,
  heroBtn: "Más sobre nosotros",
};

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModalOne() {
    setIsOpen(!isOpen);
  }

  const { isDark } = useAppSelector((state) => state.ui);

  const router = useRouter();

  return (
    <>
      <div className="home mb-5">
        <div
          className="container-fluid main-container container-home p-0 g-0 "
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <div className="color-block d-none d-lg-block"></div>
          <div className="row home-details-container align-items-center">
            <div
              className="col-lg-4 bg position-fixed d-none d-lg-block"
              style={{ backgroundImage: `url(${heroContent.heroImage})` }}
            ></div>
            <div className="col-12 col-lg-8 offset-lg-4 home-details  text-center text-lg-start">
              <div>
                <Image
                  src={heroContent.heroMobileImage}
                  className="img-fluid main-img-mobile d-sm-block d-lg-none"
                  alt="hero man"
                  // style={{width:'100%',height:'100%'}}
                />
                <h1 className="text-uppercase poppins-font">
                  {heroContent.heroTitleName}
                  <span>{heroContent.heroDesignation}</span>
                </h1>
                <p className="open-sans-font">{heroContent.heroDescriptions}</p>
                <button
                  className="button"
                  onClick={toggleModalOne}
                  style={{ marginBottom: "1rem" }}
                >
                  <span className="button-text">{heroContent.heroBtn}</span>
                  <span className="button-icon fa fa-arrow-right"></span>
                </button>
                
              </div>
            </div>
          </div>
          {/* End home-details-container */}

          {/* Start Modal for About More */}
          <Modal
            isOpen={isOpen}
            onRequestClose={toggleModalOne}
            contentLabel="My dialog"
            className="custom-modal dark hero"
            overlayClassName="custom-overlay dark"
            closeTimeoutMS={500}
          >
            <div>
              <button className="close-modal" onClick={toggleModalOne}>
                <Image src={cancelImg} alt="close icon" />
              </button>
              {/* End close icon */}

              <div className="box_inner about">
                <AboutMain />
              </div>
            </div>
            {/* End modal box news */}
          </Modal>
          {/* End  Modal for About More */}
        </div>
      </div>
      <Services/>
      <Reviews />
      <Partners/>
      <Blog/>
      <FAQ />
      <Footer />
    </>
  );
};

export default HomePage;
