import React from "react";
import { Outlet } from "react-router-dom";
// import SidebarMain from "../../Components/Others/SidebarMain";
import { Navigate } from "react-router-dom";
// import ls from "localstorage-slim";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout() {
  // const id = ls.get("id");
  // console.log(id);

  const auth = localStorage.getItem("isAuthenticated");
  if (!auth) {
    console.log("Not Authenticated");
    return <Navigate to="/" />;
  }
  if (auth) {
    return (
      <div>
        <NavBar />

        <Outlet />

        <Footer />
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
}
