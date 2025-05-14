"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { fetchBlog } from "@/src/redux/features/blog/blogSlice";

interface Blog {
  BlogKey: number;
  Title: string;
  Description: string;
  Image_URL: string;
  date: string;
  writtenBy: string;
}

const Blog = () => {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  const { isDark } = useAppSelector((state) => state.ui);

  const modalStyles = {
    backgroundColor: isDark ? "#1f2937" : "#ffffff",
    color: isDark ? "#ffffff" : "#000000",
  };

  const { blogs } = useAppSelector((state) => state.blog);
  const dispatch = useAppDispatch();

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blog");
      if (!response.ok) {
        throw new Error("Error al obtener los blogs");
      }
      const data = await response.json();
      dispatch(fetchBlog(data));
      return data;
    } catch (error) {
      console.error("Error al obtener los blogs:", error);
      throw error; // Re-lanzar el error para manejarlo en otro lugar si es necesario
    }
  };

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
          my <span>blog</span>
        </h1>
        <span className="title-bg">posts</span>
      </div>
      <div className="container" data-aos="fade-up" data-aos-duration="1200">
        {/*  Articles Starts  */}
        <div className="row pb-50">
          <div className="row" id="modal">
            {blogs.map((item: any) => (
              <div
                key={item.BlogKey}
                className="col-12 col-md-6 col-lg-6 col-xl-4 mb-30"
              >
                <article
                  className="post-container"
                  onClick={() => openModal(item)}
                >
                  <div className="post-thumb">
                    <div className="d-block position-relative overflow-hidden">
                      <Image
                        src={`${item?.Image_URL}`}
                        className="img-fluid"
                        alt="image"
                        width={895}
                        height={552}
                      />
                    </div>
                  </div>
                  {/* End .thumb */}
                  <div className="post-content">
                    <div className="entry-header">
                      <h3>{item?.Title}</h3>
                    </div>
                    <div className="entry-content open-sans-font">
                      <p>{item?.Description?.slice(0, 100)}</p>
                    </div>
                  </div>
                  {/* End .post-content */}
                </article>
              </div>
            ))}
          </div>
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Detalles del Blog"
          className="custom-modal"
          overlayClassName="custom-overlay"
          style={{
              content: {
                ...modalStyles,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                padding: "2rem",
                maxWidth: "800px",
                width: "90%",
                height: "100%",
                overflowY: "auto",
                borderRadius: "8px",
              },
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.75)",
              },
            }}
        >
          {selectedBlog && (
            <div className="modal-content">
              <h2>{selectedBlog.Title}</h2>
              <p>
                <strong>Escrito por:</strong> {selectedBlog.writtenBy}
              </p>
              <p>
                <strong>Fecha:</strong> {selectedBlog.date}
              </p>
              <Image
                src={selectedBlog.Image_URL}
                alt="Blog"
                width={800}
                height={400}
                className="img-fluid"
              />
              <p>{selectedBlog.Description}</p>
              <button onClick={closeModal} className="btn btn-primary mt-3">
                Cerrar
              </button>
            </div>
          )}
        </Modal>

        {/* Articles Ends */}
      </div>
    </>
  );
};

export default Blog;
