"use client";

import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TestimonyFormProps {
  initialData?: {
    TestimonyKey: string;
    date: string;
    name: string;
    cargo: string;
    comment: string;
    imageUrl?: string; // URL de la imagen existente (opcional)
  } | null;
}

const TestimonyForm: React.FC<TestimonyFormProps> = ({ initialData }) => {
  const form = useRef<HTMLFormElement>(null);

  // Usa los datos iniciales si están presentes o valores vacíos si no lo están
  const [date, setDate] = useState<string>(initialData?.date || "");
  const [name, setName] = useState<string>(initialData?.name || "");
  const [cargo, setCargo] = useState<string>(initialData?.cargo || "");
  const [comment, setComment] = useState<string>(initialData?.comment || "");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Determina si se trata de creación o edición
    const method = initialData ? "PUT" : "POST";
    const endpoint = initialData ? `/api/testimony/${initialData.TestimonyKey}` : "/api/testimony";

    const formData = new FormData();
    formData.append("date", date);
    formData.append("name", name);
    formData.append("cargo", cargo);
    formData.append("comment", comment);
    if (image) {
      formData.append("image", image); // Nueva imagen cargada
    }

    const response = await fetch(endpoint, {
      method: method,
      body: formData,
    });

    if (response.ok) {
      toast.success(
        initialData ? "Testimonio actualizado exitosamente!" : "Testimonio creado exitosamente!",
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
        initialData ? "Error al actualizar el testimonio!" : "Error al crear el testimonio!",
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
                name="name"
                placeholder="Nombre"
                required
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
            </div>
          </div>
          <div className="col-12 col-md-12">
            <div className="form-group">
              <input
                type="text"
                name="cargo"
                placeholder="Cargo"
                required
                value={cargo}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCargo(e.target.value)
                }
              />
            </div>
          </div>
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
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
              />
              {initialData?.imageUrl && (
                <p>
                  Imagen actual:{" "}
                  <a href={initialData.imageUrl} target="_blank" rel="noopener noreferrer">
                    Ver imagen
                  </a>
                </p>
              )}
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

export default TestimonyForm;

