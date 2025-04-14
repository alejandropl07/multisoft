"use client";

import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PartnerFormProps {
  initialData?: {
    PartnerKey: string;
    address: string;
    imageUrl: string; 
  } | null;
}

const PartnerForm: React.FC<PartnerFormProps> = ({ initialData }) => {
  const form = useRef<HTMLFormElement>(null);

  // Estados iniciales con datos existentes si están presentes
  const [address, setAddress] = useState<string>(initialData?.address || "");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Determina si se trata de creación o edición
    const method = initialData ? "PUT" : "POST";
    const endpoint = initialData ? `/api/partner/${initialData.PartnerKey}` : "/api/partner";

    const formData = new FormData();
    formData.append("address", address);
    if (image) {
      formData.append("image", image); // Nueva imagen cargada
    }

    const response = await fetch(endpoint, {
      method: method,
      body: formData,
    });

    if (response.ok) {
      toast.success(
        initialData ? "Socio actualizado exitosamente!" : "Socio creado exitosamente!",
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
        initialData ? "Error al actualizar el socio!" : "Error al crear el socio!",
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
                name="address"
                placeholder="DIRECCIÓN"
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

export default PartnerForm;
