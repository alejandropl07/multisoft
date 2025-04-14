"use client";
import BlogForm from "@/src/components/BlogForm";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BlogAdminPage() {
  const [blogData, setBlogData] = useState(null); // Estado para los datos del blog
  const { id } = useParams(); 

  useEffect(() => {
    if (id) {
      // Si hay un ID, obten los datos del blog
      fetch(`/api/blog/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener los datos del blog");
          }
          return response.json();
        })
        .then((data) => setBlogData(data))
        .catch((error) =>
          console.error("Error al obtener datos del blog para editar:", error)
        );
    }
  }, [id]);

  return (
    <div className="contact">
      <div className="title-section text-start text-sm-center">
        <h1>
          <span>{id ? "Editar Blog" : "Crear Blog"}</span>
        </h1>
        <span className="title-bg">admin</span>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-12">
            {/* Si hay datos del blog, los pasamos al formulario para editar */}
            <BlogForm initialData={blogData} />
          </div>
        </div>
      </div>
    </div>
  );
}
