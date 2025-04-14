"use client";

import ValueForm from "@/src/components/ValueForm";
import { useParams } from "next/navigation"; // Para obtener el ID dinámico desde la URL
import { useEffect, useState } from "react";

export default function ValueAdminPage() {
  const { id } = useParams(); // Obtener el ID dinámico desde la URL
  const [valueData, setValueData] = useState(null); // Estado para los datos del valor

  useEffect(() => {
    if (id) {
      // Si hay un ID, busca los datos del valor para editar
      const fetchValue = async () => {
        try {
          const response = await fetch(`/api/values/${id}`); // Endpoint para obtener el valor por ID
          if (!response.ok) {
            throw new Error("Error al obtener los datos del valor");
          }
          const data = await response.json();
          setValueData(data);
        } catch (error) {
          console.error("Error al cargar los datos del valor:", error);
        }
      }
      fetchValue();
    }
  }, [id]);

  return (
    <div className="contact">
      <div className="title-section text-start text-sm-center">
        <h1>
          <span>{id ? "Editar Valor" : "Crear Valor"}</span>
        </h1>
        <span className="title-bg">admin</span>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-12">
            {/* Si hay datos del valor, los pasamos al formulario */}
            <ValueForm initialData={valueData} />
          </div>
        </div>
      </div>
    </div>
  );
}
