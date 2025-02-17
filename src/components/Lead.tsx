"use client";
import { useState } from "react";
import { useAppDispatch } from "@/src/redux/hooks";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createLead } from "../redux/features/lead/leadSlice";

export default function Lead() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    date: "",
    status: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const isFormDataEmpty = Object.values(formData).some((value) => value === "");
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    console.log(isFormDataEmpty)
    if (isFormDataEmpty) {
      toast.error("Please fill out all fields!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    try {
      dispatch(createLead(formData));
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <>
      <div id="myForm" className="contactform pt-5">
        <div className="row">
          <div className="col-md-5">
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="NAME"
                required
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-md-5">
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="EMAIL"
                required
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-md-5">
            <div className="form-group">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="PHONE"
                required
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-md-5">
            <div className="form-group">
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                placeholder="TYPE"
                required
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-md-5">
            <div className="form-group">
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                placeholder="DATE"
                required
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-md-5">
            <div className="form-group">
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                placeholder="STATUS"
                required
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-12">
            <button type="submit" className="button" onClick={handleSubmit}>
              <span className="button-text">CREATE</span>
              <span className="button-icon fa fa-user"></span>
            </button>
          </div>
          {/* End .col */}
        </div>
      </div>
    </>
  );
}
