"use client";

import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ServicesFormProps {
  initialData?: {
    ServiceKey: string;
    title: string;
    description: string;
    imageUrl?: string; // URL de la imagen existente (opcional)
  } | null;
}

const ServicesForm: React.FC<ServicesFormProps> = ({ initialData }) => {
  const form = useRef<HTMLFormElement>(null);

  // Usa los datos iniciales si están presentes o valores vacíos si no
  const [title, setTitle] = useState<string>(initialData?.title || "");
  const [description, setDescription] = useState<string>(initialData?.description || "");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Determina si se trata de creación o edición
    const method = initialData ? "PUT" : "POST";
    const endpoint = initialData ? `/api/services/${initialData.ServiceKey}` : "/api/services";

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("image", image); // Nueva imagen cargada
    }

    const response = await fetch(endpoint, {
      method: method,
      body: formData,
    });

    if (response.ok) {
      toast.success(
        initialData ? "Servicio actualizado exitosamente!" : "Servicio creado exitosamente!",
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
        initialData ? "Error al actualizar el servicio!" : "Error al crear el servicio!",
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
                placeholder="TITULO"
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
                placeholder="DESCRIPCION"
                required
                value={description}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(e.target.value)
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

export default ServicesForm;
