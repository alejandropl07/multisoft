"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(email: string) {
  return { email };
}

const rows = [
  createData("Frozen yoghurt"),
  createData("Ice cream sandwich"),
  createData("Eclair"),
  createData("Cupcake"),
  createData("Gingerbread"),
];

export default function BulletinAdminPage() {
  const exportToCSV = (data: any[]) => {
    const headers = Object.keys(data[0]).join(","); // Encabezados del CSV
    const rows = data.map((row) => Object.values(row).join(",")).join("\n"); // Filas de datos
    const csvContent = `${headers}\n${rows}`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="contact">
      <div
        className="title-section text-start text-sm-center"
        // data-aos="fade-up"
        // data-aos-duration="1200"
      >
        <h1>
          <span>Boletín</span>
        </h1>
        <span className="title-bg">admin</span>
      </div>
      <div
        className="container"
        //    data-aos="fade-up" data-aos-duration="1200"
      >
        <div className="row">
          {/*  Left Side Starts */}
          {/*  Contact Form Starts  */}
          <div className="col-12 col-lg-12">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Correo</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.email}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.email}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="col-12 mt-4">
            <button className="button" onClick={()=> exportToCSV(rows)}>
              <span className="button-text">Exportar CSV</span>
              <span className="button-icon fa fa-send"></span>
            </button>
          </div>
          {/*  Contact Form Ends */}
        </div>
      </div>
      {/* End .container */}
    </div>
  );
}
