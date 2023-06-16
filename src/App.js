import React from "react";
import "./App.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Movies from "./pages/Movies";
import ViewMovies from "./pages/ViewMovies";
import Screens from "./pages/Screens";
import Seating from "./pages/Seating";
import UpdateMOvies from "./pages/UpdateMovies";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/movies" element={<Movies />} />
          <Route exact path="/ViewMovies" element={<ViewMovies />} />
          <Route exact path="/UpdateMovies" element={<UpdateMOvies />} />
          <Route exact path="/screens" element={<Screens />} />
          <Route exact path="/seating" element={<Seating/>} />
       
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
