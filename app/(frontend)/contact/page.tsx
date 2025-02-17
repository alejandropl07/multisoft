import Address from "@/src/components/Address";
import Contact from "@/src/components/Contact";

export default function ContactPage() {
  return (
    <div className="contact">
      <div
        className="title-section text-start text-sm-center"
        data-aos="fade-up"
        data-aos-duration="1200"
      >
        <h1>
          get in <span>touch</span>
        </h1>
        <span className="title-bg">contact</span>
      </div>
      <div className="container" data-aos="fade-up" data-aos-duration="1200">
        <div className="row">
          {/*  Left Side Starts */}
          <div className="col-12 col-lg-4">
            <h3 className="text-uppercase custom-title mb-0 ft-wt-600 pb-3">
            Let’s work together!
            </h3>
            <p className="open-sans-font mb-4">
            We are here to help you. If you have any questions or need assistance, or you need training on how to convert our leads, feel free to contact us.
            </p>
            <Address />
            {/* End Address */}

          </div>
          {/* Left Side Ends */}

          {/*  Contact Form Starts  */}
          <div className="col-12 col-lg-8">
            <Contact />
          </div>
          {/*  Contact Form Ends */}
        </div>
      </div>
      {/* End .container */}
    </div>
  );
}
