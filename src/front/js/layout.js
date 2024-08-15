import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import App from "./pages/App";


import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { CreateChart } from "./pages/createChart";
import { Login } from "./pages/login";
import { Search } from "./pages/searchChart";

import injectContext from "./store/appContext";

import { Register } from "./pages/register";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Upload from "./pages/App";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
          <Route element={<Upload />} path="/upload" />
            <Route element={<Home />} path="/" />
            <Route element={<Register />} path="/register" />
            <Route element={<Demo />} path="/demo" />
            <Route element={<CreateChart />} path="/create-chart" />
            <Route element={<Login />} path="/login" />
            <Route element={<Search />} path="/search" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
