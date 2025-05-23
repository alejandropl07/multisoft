"use client";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// interface AboutProps {
//   AboutKey: number;
//   mission: string;
//   vision: string;
//   purpose: string;
// }

const AboutForm = () => {
  const form = useRef<HTMLFormElement>(null);
  

  const [mission, setMission] = useState<string>("");
  const [vision, setVision] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");

  const fetchAbout = async () => {
    try {
      const response = await fetch("/api/about");
      if (!response.ok) {
        throw new Error("Error al obtener el about");
      }
      const data = await response.json();
      // setInvoicesData(data);
      setMission(data.mission);
      setVision(data.vision);
      setPurpose(data.purpose);
      return data;
    } catch (error) {
      console.error("Error al obtener el about:", error);
      throw error; // Re-lanzar el error para manejarlo en otro lugar si es necesario
    }
  };

  useEffect(() => {
    const getAbout = async () => {
      try {
        const result = await fetchAbout();
      } catch (error) {
        console.log(error);
      }
    };
    getAbout();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("mission", mission);
    formData.append("vision", vision);
    formData.append("purpose", purpose);

    const response = await fetch("/api/about", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      toast.success("Message Sent Successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Ops Message Not Sent!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <form
        id="myForm"
        className="contactform"
        ref={form}
        onSubmit={handleSubmit}
      >
        <div className="row">
          <div className="col-12 col-md-12">
            <div className="form-group">
              <input
                type="text"
                name="mission"
                placeholder="MISIÓN"
                required
                value={mission}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setMission(e.target.value)
                }
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-12">
            <div className="form-group">
              <input
                type="text"
                name="vision"
                placeholder="VISIÓN"
                required
                value={vision}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setVision(e.target.value)
                }
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-12 col-md-12">
            <div className="form-group">
              <input
                type="text"
                name="purpose"
                placeholder="Propósito"
                required
                value={purpose}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPurpose(e.target.value)
                }
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-12">
            <button type="submit" className="button">
              <span className="button-text">Guardar</span>
              <span className="button-icon fa fa-send"></span>
            </button>
          </div>
          {/* End .col */}
        </div>
      </form>
    </>
  );
};

export default AboutForm;
