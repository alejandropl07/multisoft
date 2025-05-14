import Image from "next/image";
import React, { useEffect, useState } from "react";
import lightImage from "../../../public/assets/img/sun.png";
import handleSwitchValue from "../../../utils/theme";
import { useAppDispatch } from "@/src/redux/hooks";
import { toggleDarkMode } from "@/src/redux/features/ui/uiSlice";

const SwitchDark = () => {
  const [isDark, setIsDark] = useState(false);
  const dispatch = useAppDispatch();

  // Al montar el componente, lee el tema guardado
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme-color");
    const isDarkTheme = savedTheme === "dark";

    setIsDark(isDarkTheme);
    handleSwitchValue(isDarkTheme); // aplica la clase al <body>
  }, []);

  const handleLabelClick = () => {
    const newDarkValue = !isDark;
    setIsDark(newDarkValue);
    dispatch(toggleDarkMode());
    handleSwitchValue(newDarkValue);
  };

  return (
    <label className={`theme-switcher-label d-flex ${isDark ? "active" : ""}`}>
      <input
        type="checkbox"
        checked={isDark}
        onChange={handleLabelClick}
        className="theme-switcher"
      />
      <div className="switch-handle">
        <span className="light-text">
          <Image src={lightImage} alt="swicher" className="filter_1" priority />
        </span>
        <span className="dark-text">
          <i className="fa fa-moon-o" aria-hidden="true"></i>
        </span>
      </div>
    </label>
  );
};

export default SwitchDark;
