import React, { useState, useEffect } from 'react';
import AdminService from '../services/admin-services';
import styled from 'styled-components';
import { Button, Form, Input, DatePicker, message, TimePicker, Upload ,Menu , Dropdown} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { DownOutlined, UserOutlined, PlusCircleOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;  
`;

const TopText = styled.h1`
  font-size: 30px;
  margin-top: 20px;
  color: #32a6f3;
  text-align: center;
`;

const Box = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 500px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PrimaryButton = styled.button`
  background-color: #32a6f3;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;
const HeaderContainer = styled.header`
background-color: rgba(0, 0, 0, 0.5);
height: 60px;
display: flex;
align-items: center;
justify-content: flex-start;
padding: 0 20px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
position: absolute;
top: 0px;
right: 0;
left: 900px;
white-space: nowrap;
`;



const movieMenu = (
<Menu>
  <Menu.Item key="1" icon={<PlusCircleOutlined />}>
    <Link to="/movies">ADD MOVIES</Link>
  </Menu.Item>
  <Menu.Item key="2" icon={<EyeOutlined />}>
    <Link to="/ViewMovies">VIEW MOVIES</Link>
  </Menu.Item>
  <Menu.Item key="3" icon={<EditOutlined />}>
    <Link to="/UpdateMovies">UPDATE MOVIES</Link>
  </Menu.Item>
  <Menu.Item key="3" icon={<PlusCircleOutlined />}>
    <Link to="/AddHighlightMovies">ADD HIGHLIGHT MOVIES</Link>
  </Menu.Item>
  <Menu.Item key="3" icon={<EyeOutlined/>}>
    <Link to="/ViewHighlightMovies">View HIGHLIGHT MOVIES</Link>
  </Menu.Item>
</Menu>
);

const screenMenu =(
<Menu>
  <Menu.Item key="1" icon={<PlusCircleOutlined />}>
    <Link to="/screens">ADD SCREENS</Link>
  </Menu.Item>
  <Menu.Item key="2" icon={<EyeOutlined />}>
    <Link to="/ViewScreens">VIEW SCREENS</Link>
  </Menu.Item>
  <Menu.Item key="3" icon={<EditOutlined />}>
    <Link to="/UpdateScreens">UPDATE SCREENS</Link>
  </Menu.Item>
</Menu>
);

const timetableMenu = (
<Menu>
<Menu.Item key="1" icon={<PlusCircleOutlined />}>
<Link to="/TimeTable">ADD TIMETABLE</Link>
</Menu.Item>
<Menu.Item key="2" icon={<EyeOutlined />}>
<Link to="/ViewTimeTable">VIEW TIMETABLE</Link>
</Menu.Item>
</Menu>

);

const showsMenu = (
<Menu>
  <Menu.Item key="1" icon={<UserOutlined />}>
    <Link to="/ViewShows">VIEW SHOWS</Link>
  </Menu.Item>
  <Menu.Item key="2" icon={<UserOutlined />}>
    <Link to="/ViewBookings">VIEW BOOKINGS</Link>
  </Menu.Item>
  </Menu>
);
const Text = styled.div`
position: absolute;
top: 10%;
right: 75%;
left: 15%;  
transform: translateX(-80%);
color: lightblue;
font-size: 28px;
font-weight: bold;
`;

const AddHighlightMovie = () => {
  const [movieName, setMovieName] = useState('');
  const [poster, setPoster] = useState(null);
  const [movies, setMovies] = useState([]);
  const [movieNamesList, setMovieNamesList] = useState([]);
  const adminService = new AdminService();

  useEffect(() => {
    adminService.getAllMovies().then((data) => {
      setMovies(data);
      console.log(data);
    });
  }, []);

  const handleMovieNameChange = (e) => {
    setMovieName(e.target.value);
  };

  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    setPoster(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await adminService.addHighlightMovie(movieName, poster);
      if (response[0]) {
        message.success("Movie details added successfully!");
        setMovieName("");
        setPoster(null);
      } else {
        message.error("Movie details not added!");
      }
    } catch (error) {
      console.error("Error adding movie details:", error);
    }
  };

  return (
    <MainContainer>
      <Text>Add Highlight Movies</Text>
      <HeaderContainer>
      <Menu mode="horizontal" theme = 'dark'>
      <Menu.Item key="home">
              <Link to="/dashboard">HOME</Link>
            </Menu.Item>
            <Dropdown overlay={movieMenu} placement="bottomLeft" arrow>
            <Menu.Item key="movies" title="Movies">
              <span>MOVIES</span>
            </Menu.Item>
            </Dropdown>
            <Dropdown overlay={screenMenu} placement="bottomLeft" arrow>
            <Menu.Item key="screen" title="Movies">
              <span>SCREENS</span>
            </Menu.Item>
          </Dropdown>
          <Dropdown overlay={timetableMenu} placement="bottomLeft" arrow>
        <Menu.Item key="timetable" title="Timetable">
          <span>TIMETABLE</span>
        </Menu.Item>
      </Dropdown>
      <Dropdown overlay={showsMenu} placement="bottomLeft" arrow>
        <Menu.Item key="shows" title="Shows">
          <span>SHOWS</span>
        </Menu.Item>
      </Dropdown>
      <Menu.Item key="payments">
              <Link to="/payment">PAYMENT</Link>
            </Menu.Item>

          </Menu>
    </HeaderContainer>
      <Box>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="movieName">Movie Name:</label>
            <select
              id="movieName"
              value={movieName}
              onChange={handleMovieNameChange}
              style={{ width: "250px", marginLeft: "38px", height: "40px", fontSize: "16px"}}
            >
              <option value="">Select a movie</option>
              {movies.map((movie) => (
                <option key={movie.name} value={movie.name}>
                  {movie.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="poster">Movie Poster:</label>
            <input
              type="file"
              id="poster"
              accept="image/*"
              onChange={handlePosterChange}
              style={{ width: "250px", marginLeft: "38px", marginTop:"20px" ,height: "40px", fontSize: "16px"}}
            />
          </div>
          <ButtonContainer>
            <PrimaryButton type="submit">Add Movie</PrimaryButton>
          </ButtonContainer>
        </form>
      </Box>
    </MainContainer>
  );
};

export default AddHighlightMovie;
