"use client";
import PartnerForm from "@/src/components/PartnerForm";
import { useParams } from "next/navigation"; // Para obtener el ID de la URL
import { useEffect, useState } from "react";

export default function PartnerAdminPage() {
  const { id } = useParams(); // Obtener el ID dinámico desde la URL
  const [partnerData, setPartnerData] = useState(null); // Estado para los datos del socio

  useEffect(() => {
    if (id) {
      // Si hay un ID, busca los datos del socio para editar
      const fetchPartner = async() => {
        try {
          const response = await fetch(`/api/partner/${id}`); // Endpoint para obtener el socio
          if (!response.ok) {
            throw new Error("Error al obtener los datos del socio");
          }
          const data = await response.json();
          setPartnerData(data);
        } catch (error) {
          console.error("Error al cargar los datos del socio:", error);
        }
      }
      fetchPartner();
    }
  }, [id]);

  return (
    <div className="contact">
      <div className="title-section text-start text-sm-center">
        <h1>
          <span>{id ? "Editar Socio" : "Crear Socio"}</span>
        </h1>
        <span className="title-bg">admin</span>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-12">
            {/* Si hay datos del socio, los pasamos al formulario */}
            <PartnerForm initialData={partnerData} />
          </div>
        </div>
      </div>
    </div>
  );
}
