"use client";
import React, { useEffect } from "react";
import Modal from "react-modal";
import cancelImg from "../../../public/assets/img/cancel.svg";
import blogQuote from "../../../public/assets/img/blog/quote.svg";
import AllBlogData from "../../../src/hooks/AllBlogData";
import Image from "next/image";

const Blog = () => {
  const { singleData, isOpen, setIsOpen, blogsData, handleBlogsData } =
    AllBlogData();
  const handleModle = (id: any) => {
    handleBlogsData(id);
  };
  useEffect(() => {
    Modal.setAppElement("#modal");
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
            {blogsData.map((item: any) => (
              <div
                key={item.id}
                className="col-12 col-md-6 col-lg-6 col-xl-4 mb-30"
              >
                <article
                  className="post-container"
                  onClick={() => handleModle(item?.id)}
                >
                  <div className="post-thumb">
                    <div className="d-block position-relative overflow-hidden">
                      <Image
                        src={item?.img}
                        className="img-fluid"
                        alt="item.title"
                      />
                    </div>
                  </div>
                  {/* End .thumb */}
                  <div className="post-content">
                    <div className="entry-header">
                      <h3>{item?.title}</h3>
                    </div>
                    <div className="entry-content open-sans-font">
                      <p>{item?.description1.slice(0, 100)}</p>
                    </div>
                  </div>
                  {/* End .post-content */}
                </article>

                {/* Start ModalOneBlogContent */}
                <Modal
                  isOpen={isOpen}
                  onRequestClose={() => setIsOpen(false)}
                  contentLabel="My dialog"
                  className="custom-modal dark"
                  overlayClassName="custom-overlay dark"
                  closeTimeoutMS={500}
                >
                  <div>
                    <button
                      className="close-modal"
                      onClick={() => setIsOpen(false)}
                    >
                      <Image src={cancelImg} alt="close icon" />
                    </button>
                    {/* End close icon */}

                    <div className="box_inner blog-post">
                      {/* Article Starts */}
                      <article>
                        <div className="title-section text-start text-sm-center">
                          <h1>
                            Post <span>Details</span>
                          </h1>
                          <span className="title-bg">posts</span>
                        </div>
                        {/* Meta Starts */}

                        <div className="meta open-sans-font">
                          <span>
                            <i className="fa fa-user"></i>{" "}
                            {singleData.commentor}
                          </span>
                          <span className="date">
                            <i className="fa fa-calendar"></i> {singleData.date}
                          </span>
                          <span>
                            <i className="fa fa-tags"></i> {singleData.tag}
                          </span>
                        </div>
                        {/* Meta Ends */}
                        {/* Article Content Starts */}

                        <h1>{singleData?.title}</h1>
                        <Image
                          src={singleData?.img}
                          className="img-fluid"
                          alt="Blog"
                        />
                        <div className="blog-excerpt open-sans-font pb-5">
                          <p>{singleData?.description1}</p>
                          <div className="quotebox">
                            <div className="icon">
                              <Image src={blogQuote} alt="blog quote" />
                            </div>
                            <p>{singleData?.description2}</p>
                          </div>
                          <p>{singleData?.description3}</p>
                          <p>{singleData?.description4}</p>
                        </div>
                        {/* Article Content Ends */}
                      </article>
                      {/* Article Ends */}
                    </div>
                  </div>
                </Modal>
                {/* End  ModalOneBlogContent */}
              </div>
            ))}
          </div>
        </div>
        {/* Articles Ends */}
      </div>
    </>
  );
};

export default Blog;
