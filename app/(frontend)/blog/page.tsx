"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import AllBlogData from "../../../src/hooks/AllBlogData";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { fetchBlog } from "@/src/redux/features/blog/blogSlice";
import path from "path";

interface Blog {
  BlogKey: number;
  Title: string;
  Description: string;
  Image_URL: string;
}

const Blog = () => {
  const { singleData, isOpen, setIsOpen, blogsData, handleBlogsData } =
    AllBlogData();

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
                  // onClick={() => handleModle(item?.blogKey)}
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
        {/* Articles Ends */}
      </div>
    </>
  );
};

export default Blog;
