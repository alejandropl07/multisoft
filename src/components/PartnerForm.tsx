"use client";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PartnerForm = () => {
  const form = useRef<HTMLFormElement>(null);

  const [address, setAddress] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("address", address);
    if (image) {
      formData.append("image", image);
    }

    const response = await fetch("/api/partner", {
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
                name="title"
                placeholder="TITULO"
                required
                value={address}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setAddress(e.target.value)
                }
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-12 col-md-12">
            <div className="form-group">
              <input
                type="file"
                name="image"
                placeholder="IMAGEN"
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setImage(e.target.files ? e.target.files[0] : null)
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

export default PartnerForm;