import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";

import { CreateChart } from "./pages/createChart";
import { SignUp } from "./pages/signUp";
import { Login } from "./pages/login";
import { Search } from "./pages/searchChart";
import { Chart } from "./pages/chart";
import { EditChart } from "./pages/editChart";

import injectContext from "./store/appContext";

import { CreateProfile } from "./pages/createProfile";

import { EditProfile } from "./pages/editProfile";
import { Register } from "./pages/register";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Profile } from "./component/profile";
import { AuthWrapper } from "./component/authwrapper";

const Layout = () => {
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />

            <Route element={<CreateProfile/>} path="/create-profile"/>
            <Route element={<EditProfile/>}path="/edit-profile"/>
            <Route element={<SignUp />} path="/signup" />
            <Route element={<Demo />} path="/demo" />
            <Route element={<CreateChart />} path="/create-chart" />
            <Route element={<Chart />} path="/chart" />
            <Route element={<EditChart />} path="/edit-chart" />
            <Route element={<Login />} path="/login" />
            <Route element={<Search />} path="/search" />
            <Route element={<AuthWrapper />} path="/protected">
              <Route element={<Profile />} path="profile" />
            </Route>
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
