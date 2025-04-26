"use client";
import React, {
  ChangeEvent,
  FormEvent,
  useRef,
  useState,
  useEffect,
} from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface BlogFormProps {
  initialData?: {
    id: string;
    Title: string;
    Description: string;
    writtenBy: string;
    date: string;
    imageUrl: string; // URL de la imagen para casos de edición
  } | null;
}

const BlogForm: React.FC<BlogFormProps> = ({ initialData }) => {
  const form = useRef<HTMLFormElement>(null);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [writtenBy, setWrittenBy] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (initialData?.imageUrl) {
      // Si existe una imagen URL, podrías usarla como referencia visual en el formulario
      console.log("Cargando imagen para editar:", initialData.imageUrl);
    }
    console.log(initialData);
    setTitle(initialData?.Title || "");
    setDescription(initialData?.Description || "");
    setWrittenBy(initialData?.writtenBy || "");
    setDate(initialData?.date || "");
  }, [initialData]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("writtenBy", writtenBy);
    formData.append("date", date);
    if (image) {
      formData.append("image", image);
    }

    const method = initialData ? "PUT" : "POST"; // Determina si es creación o edición
    const endpoint = initialData ? `/api/blog/${initialData.id}` : "/api/blog";

    try {
      const response = await fetch(endpoint, {
        method: method,
        body: formData,
      });
      if (response.ok) {
        toast.success(
          initialData
            ? "Blog actualizado exitosamente!"
            : "Blog creado exitosamente!",
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
    } catch (error) {
      console.log(error);
      toast.error(
        initialData
          ? "Error al actualizar el blog!"
          : "Error al crear el blog!",
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

          <div className="col-12 col-md-12">
            <div className="form-group">
              <input
                type="text"
                name="writtenBy"
                placeholder="ESCRITO POR"
                required
                value={writtenBy}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setWrittenBy(e.target.value)
                }
              />
            </div>
          </div>

          <div className="col-12 col-md-12">
            <div className="form-group">
              <input
                type="date"
                name="date"
                placeholder="FECHA"
                required
                value={date}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDate(e.target.value)
                }
              />
            </div>
          </div>

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
            </div>
          </div>

          <div className="col-12">
            <button type="submit" className="button">
              <span className="button-text">
                {initialData ? "Actualizar" : "Guardar"}
              </span>
              <span className="button-icon fa fa-send"></span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default BlogForm;
