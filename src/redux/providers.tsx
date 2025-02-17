"use client"
import { Provider } from "react-redux";
import { ChildrenProps } from "../interfaces/interfaces";
import { store } from "./store";

function Providers({ children }: ChildrenProps) {
  return <Provider store={store}>{children}</Provider>;
}

export default Providers;
