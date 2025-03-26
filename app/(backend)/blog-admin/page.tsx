"use client";
import BlogForm from '@/src/components/BlogForm';
import { useState, ChangeEvent, FormEvent } from 'react';

export default function BlogAdminPage() {
  

  return (
    <div className="contact">
      <div
        className="title-section text-start text-sm-center"
        // data-aos="fade-up"
        // data-aos-duration="1200"
      >
        <h1>
          <span>blog</span>
        </h1>
        <span className="title-bg">admin</span>
      </div>
      <div className="container" 
      // data-aos="fade-up" data-aos-duration="1200"
      >
        <div className="row">
          {/*  Left Side Starts */}
          

          {/*  Contact Form Starts  */}
          <div className="col-12 col-lg-12">
            <BlogForm />
          </div>
          {/*  Contact Form Ends */}
        </div>
      </div>
      {/* End .container */}
    </div>
  );
}