import React from "react";

const Address = () => {
  return (
    <>
      <p className="open-sans-font custom-span-contact position-relative">
        <i className="fa fa-map position-absolute"></i>
        <span className="d-block">Dirección</span>Calle 45 / 26 y Ulloa, Plaza
        de la Revolución, La Habana, Cuba .
      </p>
      {/* End .custom-span-contact */}

      <p className="open-sans-font custom-span-contact position-relative">
        <i className="fa fa-envelope-open position-absolute"></i>
        <span className="d-block">Correo</span>{" "}
        <a href="mailto:steve@mail.com">comercial@multisoft-ti.com</a>
      </p>
      {/* End .custom-span-contact */}

      <p className="open-sans-font custom-span-contact position-relative">
        <i className="fa fa-phone-square position-absolute"></i>
        <span className="d-block">Teléfono</span>{" "}
        <a href="Tel: +216 21 184 010">+53 7 184 010</a>
      </p>
      {/* End .custom-span-contact */}
    </>
  );
};

export default Address;
