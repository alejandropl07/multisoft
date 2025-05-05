"use client";
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface BlogFormProps {
  initialData?: {
    ValueKey: string;
    title: string;
    description: string;
    image_url?: string | null; // URL de la imagen existente (opcional)
  } | null;
}

const ValueForm: React.FC<BlogFormProps> = ({ initialData }) => {
  const form = useRef<HTMLFormElement>(null);

  // Usa los datos iniciales si están presentes, o valores vacíos si no lo están
  const [title, setTitle] = useState<string>(initialData?.title || "");
  const [description, setDescription] = useState<string>(initialData?.description || "");
  const [image, setImage] = useState<File | string | null>(null);


  useEffect(() => {
      if (initialData?.image_url) {
        // Si existe una imagen URL, podrías usarla como referencia visual en el formulario
        console.log("Cargando imagen para editar:", initialData.image_url);
      }
      setTitle(initialData?.title || "");
      setDescription(initialData?.description || "");
      setImage(initialData?.image_url || "");
    }, [initialData]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Determina si se trata de creación o edición
    const method = initialData ? "PUT" : "POST";
    const endpoint = initialData ? `/api/blog/${initialData.ValueKey}` : "/api/values";

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
        initialData ? "Valor actualizado exitosamente!" : "Valor creado exitosamente!",
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
        initialData ? "Error al actualizar el valor!" : "Error al crear el valor!",
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
                name="image_url"
                placeholder="IMAGEN"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
              />
              {initialData?.image_url && (
                <p>
                  Imagen actual:{" "}
                  <a href={initialData.image_url} target="_blank" rel="noopener noreferrer">
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

export default ValueForm;
