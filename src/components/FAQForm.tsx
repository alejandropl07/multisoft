"use client";

import React, { ChangeEvent, FormEvent, useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FAQFormProps {
  initialData?: {
    FaqKey: string;
    title: string;
    description: string;
  } | null;
}

const FAQForm: React.FC<FAQFormProps> = ({ initialData }) => {
  const form = useRef<HTMLFormElement>(null);

  const [title, setTitle] = useState<string>(initialData? initialData.title : "");
  const [description, setDescription] = useState<string>(initialData? initialData.description : "");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const method = initialData ? "PUT" : "POST";
    const endpoint = initialData ? `/api/faq/${initialData.FaqKey}` : "/api/faq";

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    const response = await fetch(endpoint, {
      method: method,
      body: formData,
    });

    if (response.ok) {
      toast.success(
        initialData ? "FAQ actualizado exitosamente!" : "FAQ creado exitosamente!",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } else {
      toast.error(
        initialData ? "Error al actualizar el FAQ!" : "Error al crear el FAQ!",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
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
              <span className="button-text">
                {initialData ? "Actualizar" : "Guardar"}
              </span>
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
