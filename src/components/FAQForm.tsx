"use client";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FAQForm = () => {
  const form = useRef<HTMLFormElement>(null);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    const response = await fetch("/api/faq", {
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
                placeholder="PREGUNTA"
                required
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-12">
            <div className="form-group">
              <textarea
                name="description"
                placeholder="RESPUESTA"
                required
                value={description}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(e.target.value)
                }
              ></textarea>
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

export default FAQForm;
