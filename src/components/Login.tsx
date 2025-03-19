"use client";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/src/redux/hooks";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginSuccess } from "@/src/redux/features/auth/authSlice";
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const router = useRouter();
  const { showRegister } = useAppSelector((state) => state.ui);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRepeatPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(event.target.value);
  };

  const handleSubmit = async () => {
    if (password !== repeatPassword && showRegister) {
      toast.error("Password not match!", {
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
    let route = "login";
    showRegister ? (route = "signup") : (route = "login");
    console.log(route)
    const response = await fetch(`/api/auth/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    console.log(response)

    const data = await response.json();

    if (response.ok) {
      Cookies.set("token", data.token, { expires: 1 }); // Almacena el token en cookies
      router.push("/blog-admin"); // Redirige a una ruta privada
    }
  };

  return (
    <>
      <div id="myForm" className="contactform">
        <div className="row">
          <div className="col-12 col-md-12">
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="CORREO"
                required
              />
            </div>
          </div>
          {/* End .col */}
          <div className="col-12 col-md-12">
            <div className="form-group">
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="CONTRASEÑA"
                required
              />
            </div>
          </div>
          {/* End .col */}

          {showRegister ? (
            <div className="col-12 col-md-12">
              <div className="form-group">
                <input
                  type="password"
                  name="repeatPassword"
                  value={repeatPassword}
                  onChange={handleRepeatPasswordChange}
                  placeholder="REPETIR CONTRASEÑA"
                  required
                />
              </div>
            </div>
          ) : null}

          <div className="col-12">
            <button type="submit" className="button" onClick={handleSubmit}>
              <span className="button-text">
                {showRegister ? "REGISTRO" : "LOGIN"}
              </span>
              <span className="button-icon fa fa-send"></span>
            </button>
          </div>
          {/* End .col */}
        </div>
      </div>
    </>
  );
}
