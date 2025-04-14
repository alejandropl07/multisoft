"use client";
import {
  DataTable,
  DataTableRowClickEvent,
  DataTableSelectionMultipleChangeEvent,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Dropdown } from "primereact/dropdown";
import {
  PaginatorCurrentPageReportOptions,
  PaginatorRowsPerPageDropdownOptions,
} from "primereact/paginator";
import { useRouter } from "next/navigation";
import { fetchFaq } from "@/src/redux/features/faq/faqSlice";

const Invoices = () => {
  const dispatch = useDispatch();

  const rowClassName = (rowData: any) => {
    return invoiceData && invoiceData.id === rowData.id ? "selected-row" : "";
  };

  const [invoicesData, setInvoicesData] = useState<any[]>([
    {
      FaqKey: 1,
      Title: "",
      Description: "",
    },
  ]);
  const [invoiceData, setInvoiceData] = useState<any | undefined>(undefined);

  const [selectedInvoices, setSelectedInvoices] = useState<any[]>([]);

  const hidePagination = selectedInvoices.length > 0;

  const fetchFaqs = async () => {
    try {
      const response = await fetch("/api/faq");
      if (!response.ok) {
        throw new Error("Error al obtener los faqs");
      }
      const data = await response.json();
      dispatch(fetchFaq(data));
      setInvoicesData(data);
      return data;
    } catch (error) {
      console.error("Error al obtener los faqs:", error);
      throw error; // Re-lanzar el error para manejarlo en otro lugar si es necesario
    }
  };

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const result = await fetchFaqs();
      } catch (error) {
        console.log(error);
      }
    };
    getBlogs();
  }, []);

  const handleDelete = async (id: any) => {
    try {
      const response = await fetch(`/api/faq/${id}`, {
        method: "DELETE", // Cambiamos el método a DELETE
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el registro");
      }
      const data = await response.json();
      // dispatch(deleteBlog(id));
      console.log(`Blog con ID ${id} eliminado exitosamente.`);
      return data;
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
      throw error; // Re-lanzar el error para manejarlo en otro lugar si es necesario
    }
  };

  const router = useRouter();

  const handleUpdate = async (id: any) => {
    try {
      router.push(`faq-admin/${id}`);
    } catch (error) {
      console.error("Error al actualizar el registro:", error);
      throw error; // Re-lanzar el error para manejarlo en otro lugar si es necesario
    }
  };

  const statusBodyTemplate = (rowData: any) => {
    return (
      <div>
        <IconButton onClick={() => handleUpdate(rowData.FaqKey)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(rowData.FaqKey)}>
          <DeleteIcon />
        </IconButton>
      </div>
    );
  };

  const handleRowSelect = (
    event: DataTableSelectionMultipleChangeEvent<any[]>
  ) => {
    setSelectedInvoices(event.value);
  };

  const handleRowClickSelect = (event: DataTableRowClickEvent) => {
    if (selectedInvoices.length === 0) {
      setInvoiceData(event.data as any);
    }
  };

  const paginatorTemplate = {
    layout:
      "CurrentPageReport PrevPageLink PageLinks NextPageLink RowsPerPageDropdown",
    RowsPerPageDropdown: (options: PaginatorRowsPerPageDropdownOptions) => {
      const dropdownOptions = [
        { label: 5, value: 5 },
        { label: 10, value: 10 },
        { label: 25, value: 25 },
        { label: 50, value: 50 },
      ];

      return (
        <div className="paginator-page-drowpdown">
          <span
            className="mx-1"
            style={{ color: "var(--text-color)", userSelect: "none" }}
          >
            Items per page{" "}
          </span>
          <Dropdown
            style={{ border: "none", backgroundColor: "#E7EBEA" }}
            value={options.value}
            options={dropdownOptions}
            onChange={options.onChange}
          />
        </div>
      );
    },

    CurrentPageReport: (options: PaginatorCurrentPageReportOptions) => {
      return (
        <span className="paginator-current-page">
          Showing {options.first} - {options.last} of {options.totalRecords}
        </span>
      );
    },
  };

  return (
    <div className="container grid">
      <div className="col-12">
        <div className="card table mt-5">
          <DataTable
            selectionMode="checkbox"
            selection={selectedInvoices}
            onSelectionChange={handleRowSelect}
            value={invoicesData}
            onRowClick={handleRowClickSelect}
            rowClassName={rowClassName}
            paginator={!hidePagination}
            paginatorTemplate={paginatorTemplate}
            rows={5}
            dataKey="FaqKey"
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{
              width: "100%",
            }}
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "2%" }}
            ></Column>
            <Column
              field="Title"
              header="Título"
              style={{ width: "20%" }}
            ></Column>
            {/* <Column
              field="Description"
              header="Descripción"
              style={{ width: "20%" }}
            ></Column> */}

            <Column
              field="status"
              header="Acciones"
              body={statusBodyTemplate}
              style={{ width: "20%" }}
            ></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Invoices;