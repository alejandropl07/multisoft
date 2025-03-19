"use client";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TestimonyForm = () => {
  const form = useRef<HTMLFormElement>(null);

  const [date, setDate] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("date", date);
    formData.append("comment", comment);
    if (image) {
      formData.append("image", image);
    }

    const response = await fetch("/api/testimony", {
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
                type="date"
                name="date"
                placeholder="Fecha"
                required
                value={date}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDate(e.target.value)
                }
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-12">
            <div className="form-group">
              <textarea
                name="comment"
                placeholder="Comentario"
                required
                value={comment}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setComment(e.target.value)
                }
              ></textarea>
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

export default TestimonyForm;
