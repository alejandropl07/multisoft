"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { useAppDispatch } from "@/src/redux/hooks";

interface Services {
  ServiceKey: number;
  title: string;
  description: string;
  image_url: string;
}

const Services = () => {
  //   const { blogs } = useAppSelector((state) => state.blog);
  const [services, setServices] = useState<Services[]>([]);
  const dispatch = useAppDispatch();

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/services");
      if (!response.ok) {
        throw new Error("Error al obtener los servicios");
      }
      const data = await response.json();
      //   dispatch(fetchBlog(data));
      setServices(data);
      return data;
    } catch (error) {
      console.error("Error al obtener los servicios:", error);
      throw error; // Re-lanzar el error para manejarlo en otro lugar si es necesario
    }
  };

  // const uploadsDir = path.join(process.cwd(), 'uploads');
  // console.log(uploadsDir)

  useEffect(() => {
    Modal.setAppElement("#modal");
    const getBlogs = async () => {
      try {
        const result = await fetchBlogs();
      } catch (error) {
        console.log(error);
      }
    };
    getBlogs();
  }, []);

  return (
    <>
      <div
        className="title-section text-start text-sm-center "
        data-aos="fade-up"
        data-aos-duration="1200"
      >
        <h1>
          mis <span>servicios</span>
        </h1>
        <span className="title-bg">Servicios</span>
      </div>
      <div className="container" data-aos="fade-up" data-aos-duration="1200">
        {/*  Articles Starts  */}
        <div className="row pb-50">
          <div className="row" id="modal">
            {services.map((item: any) => (
              <div
                key={item.ServiceKey}
                className="col-12 col-md-6 col-lg-6 col-xl-6 mb-30"
              >
                <article className="post-container">
                  <div className="post-content">
                    <div
                      className="entry-header"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Image
                        src={`${item?.image_url}`}
                        className="img-fluid"
                        alt="image"
                        width={40}
                        height={40}
                        style={{marginBottom:"20px"}}
                      />
                      <h3>{item?.title}</h3>
                    </div>
                    <div className="entry-content open-sans-font">
                      <p>{item?.description?.slice(0, 100)}</p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
        {/* Articles Ends */}
      </div>
    </>
  );
};

export default Services;
