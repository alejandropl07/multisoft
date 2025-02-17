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
          ponte en <span>contacto</span>
        </h1>
        <span className="title-bg">contacto</span>
      </div>
      <div className="container" data-aos="fade-up" data-aos-duration="1200">
        <div className="row">
          {/*  Left Side Starts */}
          <div className="col-12 col-lg-4">
            <h3 className="text-uppercase custom-title mb-0 ft-wt-600 pb-3">
            Trabajemos juntos!
            </h3>
            <p className="open-sans-font mb-4">
            Estamos aquí para ayudarte. Si tienes alguna pregunta o necesitas más información sobre nuestra empresa que ofrece soluciones ERP, no dudes en contactarnos.
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
