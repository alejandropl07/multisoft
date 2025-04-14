"use client";
import {
  DataTable,
  DataTableRowClickEvent,
  DataTableSelectionMultipleChangeEvent,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./styles.css";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import TuneIcon from "@mui/icons-material/Tune";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { Dropdown } from "primereact/dropdown";
import Popper from "@mui/material/Popper";
import {
  PaginatorCurrentPageReportOptions,
  PaginatorRowsPerPageDropdownOptions,
} from "primereact/paginator";
import { deleteBlog } from "@/src/redux/features/blog/blogSlice";

const Invoices = () => {
  const dispatch = useDispatch();
  //   const { organization } = useSelector((state: RootState) => state.auth);

  const rowClassName = (rowData: any) => {
    return invoiceData && invoiceData.id === rowData.id ? "selected-row" : "";
  };

  const [invoicesData, setInvoicesData] = useState<any[]>([
    {
      id: 1,
      invoice_id: "INV-2025-001",
      receiver_name: "Juan Pérez",
      status: "Pagada",
    },
  ]);
  const [invoiceData, setInvoiceData] = useState<any | undefined>(undefined);

  const [selectedInvoices, setSelectedInvoices] = useState<any[]>([]);

  const hidePagination = selectedInvoices.length > 0;

  const handleDelete = async () => {
    try {
      const response = await fetch("/api/about");
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const data = await response.json();
      dispatch(deleteBlog(data));
      return data;
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      throw error; // Re-lanzar el error para manejarlo en otro lugar si es necesario
    }
  };

  const statusBodyTemplate = (rowData: any) => {
    return (
      <div>
        <IconButton onClick={handleDelete}>
          <OpenInNewIcon />
        </IconButton>
        <IconButton>
          <OpenInNewIcon />
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
            dataKey="id"
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
              field="invoice_id"
              header="Título"
              style={{ width: "20%" }}
            ></Column>
            <Column
              field="receiver_name"
              header="Descripción"
              style={{ width: "20%" }}
            ></Column>

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