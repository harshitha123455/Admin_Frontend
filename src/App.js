import React from "react";
import "./App.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Movies from "./pages/Movies";
import ViewMovies from "./pages/ViewMovies";
import Screens from "./pages/Screens";
import ViewScreens from "./pages/ViewScreens";
import UpdateScreens from "./pages/UpdateScreens";
import UpdateMOvies from "./pages/UpdateMovies";
import TimeTable from "./pages/TimeTable";
import ViewTimeTable from "./pages/ViewTimeTable";
import ViewShows from "./pages/ViewShows";
import ViewBookings from "./pages/ViewBookings";
import AddHighlightMovies from "./pages/AddHighlightMovies";
import Payment from "./pages/Payment";
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
          <Route exact path="/ViewScreens" element={<ViewScreens />} />
          <Route exact path="/UpdateScreens" element={<UpdateScreens />} />
          <Route exact path="/TimeTable" element={<TimeTable />} />
          <Route exact path="/ViewTimeTable" element={<ViewTimeTable />} />
          <Route exact path="/ViewShows" element={<ViewShows />} />
          <Route exact path="/ViewBookings" element={<ViewBookings />} />
          <Route exact path="/AddHighlightMovies" element={<AddHighlightMovies />} />
          <Route exact path="/Payment" element={<Payment />} />

       
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
