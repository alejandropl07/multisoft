"use client";
import { ChangeEvent, useState } from "react";
import Modal from "react-modal";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useAppSelector } from "@/src/redux/hooks";
import cancelImg from "@/public/assets/img/cancel.svg";
import Image from "next/image";
import Lead from "@/src/components/Lead";

interface Column {
  id: "name" | "email" | "phone" | "type" | "date" | "status";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  {
    id: "phone",
    label: "Phone",
    minWidth: 150,
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "type",
    label: "Type",
    minWidth: 100,
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "date",
    label: "Date",
    minWidth: 150,
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
];


export default function LeadsPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { isDark } = useAppSelector((state) => state.ui);
  const [isOpen, setIsOpen] = useState(false);
  function toggleModalOne() {
    setIsOpen(!isOpen);
  }

  const { leads } = useAppSelector((state) => state.lead);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  return (
    <div className="contact">
      <div
        className="title-section text-start text-sm-center"
        data-aos="fade-up"
        data-aos-duration="1200"
      >
        <h1>
          <span>LEADS</span>
        </h1>
        <span className="title-bg">LEADS</span>
      </div>
      <div className="container" data-aos="fade-up" data-aos-duration="1200">
        <div className="col-12">
          <button className="button mb-4" onClick={toggleModalOne}>
            <span className="button-text">Create Lead</span>
            <span className="button-icon fa fa-user"></span>
          </button>
        </div>
        <Paper
          sx={{
            width: "95%",
            overflow: "hidden",
            marginTop: 0,
            marginLeft: 2,
            marginRight: 2,
          }}
        >
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      sx={{
                        backgroundColor: isDark ? "#111111" : "white",
                        color: isDark ? "white" : "gray",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {leads
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.name}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              sx={{
                                backgroundColor: isDark ? "#111111" : "white",
                                color: isDark ? "white" : "gray",
                              }}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={leads.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              backgroundColor: isDark ? "#111111" : "white",
              color: isDark ? "white" : "gray",
            }}
          />
        </Paper>
      </div>
      {/* End .container */}
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModalOne}
        contentLabel="My dialog"
        className="custom-modal dark hero"
        overlayClassName="custom-overlay dark"
        closeTimeoutMS={500}
      >
        <div>
          <button className="close-modal" onClick={toggleModalOne}>
            <Image src={cancelImg} alt="close icon" />
          </button>
          {/* End close icon */}

          <div className="box_inner contact">
            <Lead />
          </div>
        </div>
        {/* End modal box news */}
      </Modal>
    </div>
  );
}
