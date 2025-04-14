"use client";

import ServicesForm from "@/src/components/ServicesForm";
import { useParams } from "next/navigation"; // Para obtener el ID desde la URL
import { useEffect, useState } from "react";

export default function ServicesAdminPage() {
  const { id } = useParams(); // Obtener el ID dinámico desde la URL
  const [serviceData, setServiceData] = useState(null); // Estado para los datos del servicio

  useEffect(() => {
    if (id) {
      // Si hay un ID, busca los datos del servicio para editar
      const fetchService = async() => {
        try {
          const response = await fetch(`/api/services/${id}`); // Endpoint para obtener el servicio
          if (!response.ok) {
            throw new Error("Error al obtener los datos del servicio");
          }
          const data = await response.json();
          setServiceData(data);
        } catch (error) {
          console.error("Error al cargar los datos del servicio:", error);
        }
      }
      fetchService();
    }
  }, [id]);

  return (
    <div className="contact">
      <div className="title-section text-start text-sm-center">
        <h1>
          <span>{id ? "Editar Servicio" : "Crear Servicio"}</span>
        </h1>
        <span className="title-bg">admin</span>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-12">
            {/* Si hay datos del servicio, los pasamos al formulario */}
            <ServicesForm initialData={serviceData} />
          </div>
        </div>
      </div>
    </div>
  );
}
