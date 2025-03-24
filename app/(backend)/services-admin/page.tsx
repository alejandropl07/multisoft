"use client";
import ServicesForm from '@/src/components/ServicesForm';
export default function ServicesAdminPage() {
  return (
    <div className="contact">
      <div
        className="title-section text-start text-sm-center"
        // data-aos="fade-up"
        // data-aos-duration="1200"
      >
        <h1>
          <span>SERVICES</span>
        </h1>
        <span className="title-bg">admin</span>
      </div>
      <div className="container"
      //  data-aos="fade-up" data-aos-duration="1200"
       >
        <div className="row">
          {/*  Left Side Starts */}
          

          {/*  Contact Form Starts  */}
          <div className="col-12 col-lg-12">
            <ServicesForm />
          </div>
          {/*  Contact Form Ends */}
        </div>
      </div>
      {/* End .container */}
    </div>
  );
}