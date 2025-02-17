import { timelineContent } from "./timelineContent";
import heroImgMobile from "@/public/assets/img/hero/img-mobile.png";
import Image from "next/image";
import { TimelineProps } from "@/src/interfaces/interfaces";

const AboutPage = () => {
  const chunkArray = (array: TimelineProps[], size: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };


  const timelineChunks = chunkArray(timelineContent, 2);
  return (
    <div data-aos="fade-down" data-aos-duration="1200" className="about">
      <div className="title-section text-start text-sm-center">
        <h1>
          SOBRE <span>NOSOTROS</span>
        </h1>
        <span className="title-bg">RESUMEN</span>
      </div>
      <section className="main-content ">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-5 col-12">
              <div className="row">
                <div className="col-12 d-block d-sm-none">
                  <Image
                    src={heroImgMobile}
                    className="img-fluid main-img-mobile"
                    alt="about avatar"
                  />
                </div>
                {/* image for mobile menu */}
              </div>
            </div>
            {/*  Personal Info Ends */}
          </div>
          {/* End .row */}

          {/* Timeline Starts */}
          <div className="row">
            {/* <div className="col-12">
              <h3 className="text-uppercase pb-5 mb-0 text-start text-sm-center custom-title ft-wt-600">
                Our Timeline
              </h3>
            </div> */}
            <div className="container">
              {timelineChunks.map((chunk, index) => (
                <div className="row" key={index}>
                  {chunk.map((val, i) => (
                    <div className="col-lg-6 m-15px-tb" key={i}>
                      <div className="resume-box">
                        <ul>
                          <li>
                            <div className="icon">
                              <i className="fa fa-briefcase"></i>
                            </div>
                            <span className="time open-sans-font text-uppercase">
                              {val.year}
                            </span>
                            <h5 className="poppins-font text-uppercase">
                              {val.title}
                            </h5>
                            <p className="open-sans-font">{val.details}</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {/*  Timeline Ends */}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
