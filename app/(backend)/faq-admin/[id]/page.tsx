"use client";
import FAQForm from "@/src/components/FAQForm";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function FAQAdminPage() {
  const { id } = useParams(); // Obtén el ID del FAQ desde la URL
  const [faqData, setFAQData] = useState(null); // Estado para los datos del FAQ

  useEffect(() => {
    if (id) {
      // Si hay un ID, obten los datos del FAQ para editar
      const fetchFAQ = async () => {
        try {
          const response = await fetch(`/api/faq/${id}`); // Endpoint para obtener el FAQ por ID
          if (!response.ok) {
            throw new Error("Error al obtener los datos del FAQ");
          }
          const data = await response.json();
          setFAQData(data);
        } catch (error) {
          console.error("Error al cargar datos del FAQ:", error);
        }
      };
      fetchFAQ();
    }
  }, [id]);

  return (
    <div className="contact">
      <div className="title-section text-start text-sm-center">
        <h1>
          <span>{id ? "Editar FAQ" : "Crear FAQ"}</span>
        </h1>
        <span className="title-bg">admin</span>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-12">
            {/* Pasamos datos iniciales si estamos editando */}
            <FAQForm initialData={faqData} />
          </div>
        </div>
      </div>
    </div>
  );
}
