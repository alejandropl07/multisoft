"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { useAppDispatch } from "@/src/redux/hooks";

interface Partners {
  PartnerKey: number;
  address: string;
  image_url: string;
}

const Partners = () => {
  //   const { blogs } = useAppSelector((state) => state.blog);
  const [partners, setPartners] = useState<Partners[]>([]);
  const dispatch = useAppDispatch();

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/partner");
      if (!response.ok) {
        throw new Error("Error al obtener los partners");
      }
      const data = await response.json();
      //   dispatch(fetchBlog(data));
      setPartners(data);
      return data;
    } catch (error) {
      console.error("Error al obtener los partners:", error);
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
          Mis <span>Aliados</span>
        </h1>
        <span className="title-bg">Aliados</span>
      </div>
      <div className="container" data-aos="fade-up" data-aos-duration="1200">
        {/*  Articles Starts  */}
        <div className="row pb-50">
          <div className="row" id="modal">
            {partners.map((item: any) => (
              <div
                key={item.ServiceKey}
                className="col-12 col-md-6 col-lg-6 col-xl-4 mb-30"
              >
                <article className="post-container">
                  <a
                    href={item?.address}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="post-thumb">
                      <div className="d-block position-relative overflow-hidden">
                        <Image
                          src={`${item?.image_url}`}
                          className="img-fluid"
                          alt="image"
                          width={895}
                          height={552}
                        />
                      </div>
                    </div>
                  </a>
                  {/* End .thumb */}
                  {/* <div className="post-content">
                    <div className="entry-content open-sans-font">
                      <p>
                        <a
                          href={item?.address}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item?.address?.slice(0, 100)}
                        </a>
                      </p>
                    </div>
                  </div> */}
                  {/* End .post-content */}
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

export default Partners;
