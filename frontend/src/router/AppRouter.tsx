// src/AppRouter.tsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import { RecoilRoot } from "recoil";
import Room from "../pages/Room";
import Peergenerator from "../pages/PeerComponent";

const AppRouter: React.FC = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/room/:id" element={<Room />} />
          <Route path="/peer" element={<Peergenerator />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default AppRouter;
