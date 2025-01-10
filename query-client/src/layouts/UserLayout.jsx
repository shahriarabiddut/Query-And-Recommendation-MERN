import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { HelmetProvider } from "react-helmet-async";
import PrivateRoute from "../routes/PrivateRoute";

const UserLayout = () => {
  return (
    <PrivateRoute>
      <HelmetProvider>
        <header className="sticky top-0 z-[999]">
          {" "}
          <Header />{" "}
        </header>
        <main className="">
          <Outlet />
        </main>
        <Footer />
      </HelmetProvider>
    </PrivateRoute>
  );
};

export default UserLayout;
