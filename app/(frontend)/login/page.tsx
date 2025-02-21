"use client";
import {
  showLoginAction,
  showRegisterAction,
} from "@/src/redux/features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import Login from "@/src/components/Login";

export default function LoginPage() {
  const { showRegister } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    showRegister ? dispatch(showLoginAction()) : dispatch(showRegisterAction());
  };

  return (
    <div className="contact">
      <div
        className="title-section text-start text-sm-center"
        data-aos="fade-up"
        data-aos-duration="1200"
      >
        <h1>
          Crear <span>cuenta</span>
        </h1>
        <span className="title-bg">login</span>
      </div>
      <div className="container" data-aos="fade-up" data-aos-duration="1200">
        <div className="row">
          {/*  Left Side Starts */}
          <div className="col-12 col-lg-4">
            <h3 className="text-uppercase custom-title mb-0 ft-wt-600 pb-3">
              LOGIN / REGISTRO
            </h3>
            <div className="col-12 mb-3">
              <button
                style={{ padding: "1rem" }}
                type="submit"
                className="button"
                onClick={handleLogin}
              >
                <span className="button-text">
                  {showRegister
                    ? "No tienes una cuenta? Login"
                    : "No tienes una cuenta? Registrar"}
                </span>
              </button>
            </div>
            <p className="open-sans-font mb-4">
              Una cuenta será creada si usted no tiene una...
            </p>
          </div>
          {/* Left Side Ends */}
          <div className="col-12 col-lg-8">
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
}
