import React, { useEffect, useState } from "react";
import { Tag, message, Card, Button, Breadcrumb } from "antd";
import AdminService from "../services/admin-services";
import styled from "styled-components";
import {
  DownOutlined,
  UserOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  Form,
  Input,
  DatePicker,
  TimePicker,
  Upload,
  Menu,
  Dropdown,
} from "antd";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

const { Meta } = Card;

const ViewMovies = () => {
  const [movies, setMovies] = useState([]);
  const adminService = new AdminService();

  useEffect(() => {
    adminService.getAllMovies().then((data) => {
      setMovies(data.map((movie) => ({ ...movie, genre: movie.genre.join(", ") })));
    });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      const response = await adminService.deleteMovie(id);
      if (response[0]) {
        message.success("Movie deleted successfully");
        setMovies(movies.filter((movie) => movie.id !== id));
      } else {
        message.error("Movie could not be deleted. Reason: " + response[1]);
      }
    }
  };

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
      <Menu.Item key="3" icon={<EyeOutlined />}>
        <Link to="/ViewHighlightMovies">View HIGHLIGHT MOVIES</Link>
      </Menu.Item>
    </Menu>
  );

  const screenMenu = (
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
    left: 20px;
    transform: translateX(-80%);
    color: lightblue;
    font-size: 28px;
    font-weight: bold;
  `;

  return (
    <div>
      <h1 style={{ color: "#32a6f3" }}>VIEW MOVIES</h1>
      <HeaderContainer>
        <Menu mode="horizontal" theme="dark">
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
      {movies.map((movie) => (
        <div
          key={movie.id}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Card style={{ width: 500, background: "rgba(255, 255, 255, 0.8)" }}>
            <Meta
              title={
                <h1
                  style={{ color: "red", fontWeight: "bold", fontSize: "30px" }}
                >
                  {movie.name}
                </h1>
              }
              description={
                <div>
                  <p
                    style={{
                      fontSize: "20px",
                      marginBottom: "0px",
                      marginLeft: "0px",
                      marginRight: "35px",
                      color: "black"
                    }}
                  >
                    <strong style={{ fontSize: "22px" }}>Duration:</strong>{" "}
                    <span style={{ fontSize: "20px" }}>{movie.duration}</span>
                  </p>
                  <p
                    style={{
                      fontSize: "20px",
                      marginBottom: "0px",
                      marginLeft: "0px",
                      marginRight: "30px",
                      color: "black"
                    }}
                  >
                    <strong style={{ fontSize: "22px" }}>Genre:</strong>{" "}
                    <span style={{ fontSize: "20px" }}>{movie.genre}</span>
                  </p>
                  <p
                    style={{
                      fontSize: "20px",
                      marginBottom: "0px",
                      marginLeft: "0px",
                      marginRight: "30px",
                      color: "black"
                    }}
                  >
                    <strong>Description:</strong> {movie.description}
                  </p>
                  <p
                    style={{
                      fontSize: "20px",
                      marginBottom: "0px",
                      marginLeft: "0px",
                      marginRight: "30px",
                      color: "black"
                    }}
                  >
                    <strong>Release Date:</strong> {movie.releaseDate}
                  </p>
                  <p
                    style={{
                      fontSize: "20px",
                      marginBottom: "0px",
                      marginLeft: "0px",
                      marginRight: "30px",
                      color: "black"
                    }}
                  >
                    <strong>Cast:</strong>{" "}
                    {movie.cast.map((actor, index) => (
                      <Tag
                        color="blue"
                        key={index}
                        style={{ fontSize: "16px" }}
                      >
                        {actor}
                      </Tag>
                    ))}
                  </p>
                  <p
                    style={{
                      border: "3px solid #000",
                      padding: "3px",
                      margin: "20px 185px",
                    }}
                  >
                    <Button
                      type="primary"
                      onClick={() => handleDelete(movie.id)}
                    >
                      Delete
                    </Button>
                  </p>
                </div>
              }
            />
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ViewMovies;
