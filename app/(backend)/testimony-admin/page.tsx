"use client";

import TestimonyForm from "@/src/components/TestimonyForm";
import { useParams } from "next/navigation"; // Para obtener el ID desde la URL
import { useEffect, useState } from "react";

export default function TestimonyAdminPage() {
  const { id } = useParams(); // Obtener el ID dinámico desde la URL
  const [testimonyData, setTestimonyData] = useState(null); // Estado para los datos del testimonio

  useEffect(() => {
    if (id) {
      // Si hay un ID, busca los datos del testimonio para editar
      const fetchTestimony = async() => {
        try {
          const response = await fetch(`/api/testimony/${id}`); // Endpoint para obtener el testimonio
          if (!response.ok) {
            throw new Error("Error al obtener los datos del testimonio");
          }
          const data = await response.json();
          setTestimonyData(data);
        } catch (error) {
          console.error("Error al cargar los datos del testimonio:", error);
        }
      }
      fetchTestimony();
    }
  }, [id]);

  return (
    <div className="contact">
      <div className="title-section text-start text-sm-center">
        <h1>
          <span>{id ? "Editar Testimonio" : "Crear Testimonio"}</span>
        </h1>
        <span className="title-bg">admin</span>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-12">
            {/* Si hay datos del testimonio, los pasamos al formulario */}
            <TestimonyForm initialData={testimonyData} />
          </div>
        </div>
      </div>
    </div>
  );
}
