"use client";
import { usePathname } from "next/navigation";
import "./globals.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import componentReducer from "../store/ComponentSlice";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    component: componentReducer,
  },
});

export default function ClientRootLayout({ children }) {
  const pathname = usePathname();
  const hideNavbarFooter =
    pathname === "/Register" ||
    pathname === "/Login" ||
    pathname === "/RegisterAdmin" ||
    pathname === "/LoginAdmin" ||
    pathname === "/Dashboard";

  return (
    <>
      <Provider store={store}>
        {!hideNavbarFooter && <Navbar />}
        <div>{children}</div>
        {!hideNavbarFooter && <Footer />}
      </Provider>
    </>
  );
}
