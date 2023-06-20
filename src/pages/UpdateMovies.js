import React, { useState } from "react";
import { Input, Button, Table, message, Menu, Dropdown } from "antd";
import AdminService from "../services/admin-services";
import { UploadOutlined } from "@ant-design/icons";
import styled from "styled-components";
import {
  DownOutlined,
  UserOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const UpdateMovies = () => {
  const [searchValue, setSearchValue] = useState("");
  const [foundMovie, setFoundMovie] = useState(null);
  const [editedData, setEditedData] = useState({});
  const adminService = new AdminService();

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const movies = await adminService.getAllMovies();
      const movie = findMovieByName(searchValue, movies);
      if (movie === undefined) {
        message.error("Movie not found");
        return;
      }
      //split the director list to a string
      movie.director = movie.director.join(", ");
      //split the genre list to a string
      movie.genre = movie.genre.join(", ");
      //split the cast list to a string
      movie.cast = movie.cast.join(", ");
      setFoundMovie(movie);
      setEditedData(movie); // Initialize editedData with the found movie details
    } catch (error) {
      console.error("Error searching movie:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (foundMovie) {
        const updatedMovie = {
          ...foundMovie,
          ...editedData,
          imageUrl: foundMovie.imageUrl,
        };
        const response = await adminService.updateMovie(updatedMovie);
        if (response[0]) {
          message.success("Movie updated successfully!");
          setFoundMovie(updatedMovie);
          setEditedData({});
        } else {
          message.error(response[1]);
        }
      }
    } catch (error) {
      message.error("Error updating movie:", error);
    }
  };

  const findMovieByName = (name, movies) => {
    return movies.find(
      (movie) => movie.name.toLowerCase() === name.toLowerCase()
    );
  };

  const handleCellValueChange = (key, dataIndex, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [dataIndex]: value,
    }));
  };

  // Columns for the movie details table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Input
          value={editedData.name || text}
          onChange={(e) =>
            handleCellValueChange(record.key, "name", e.target.value)
          }
        />
      ),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (text, record) => (
        <Input
          value={editedData.duration || text}
          onChange={(e) =>
            handleCellValueChange(record.key, "duration", e.target.value)
          }
        />
      ),
    },
    {
      title: "Director",
      dataIndex: "director",
      key: "director",
      render: (text, record) => (
        <Input
          value={editedData.director || text}
          onChange={(e) =>
            handleCellValueChange(record.key, "director", e.target.value)
          }
        />
      ),
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      render: (text, record) => (
        <Input
          value={editedData.genre || text}
          onChange={(e) =>
            handleCellValueChange(record.key, "genre", e.target.value)
          }
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record) => (
        <Input
          value={editedData.description || text}
          onChange={(e) =>
            handleCellValueChange(record.key, "description", e.target.value)
          }
        />
      ),
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      key: "releaseDate",
      render: (text, record) => (
        <Input
          value={editedData.releaseDate || text}
          onChange={(e) =>
            handleCellValueChange(record.key, "releaseDate", e.target.value)
          }
        />
      ),
    },
    {
      title: "Cast",
      dataIndex: "cast",
      key: "cast",
      render: (text, record) => (
        <Input
          value={editedData.cast || text}
          onChange={(e) =>
            handleCellValueChange(record.key, "cast", e.target.value)
          }
        />
      ),
    },
  ];

  const tableData = foundMovie ? [{ ...foundMovie, key: "movie" }] : [];

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

  return (
    <MainContainer>
      <Text>UPDATE MOVIES</Text>
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

      <div>
        <Input
          placeholder="Search movie by name"
          value={searchValue}
          onChange={handleSearchChange}
          style={{ width: "300px", height: "40px", marginRight: "10px" }}
        />
        <Button
          type="primary"
          onClick={handleSearch}
          style={{ height: "40px", fontSize: "16px" }}
        >
          Search
        </Button>
        <br />
        {foundMovie && (
          <div>
            <h2>Movie Details:</h2>
            <Table
              dataSource={tableData}
              columns={columns}
              pagination={false}
              bordered
              size="small"
              scroll={{ y: 300 }}
            />
            <Button type="primary" onClick={handleUpdate}>
              Update
            </Button>
          </div>
        )}
      </div>
    </MainContainer>
  );
};

const Text = styled.div`
position: absolute;
top: 10%;
right: 70%;
transform: translateX(-80%);
color: lightblue;
font-size: 28px;
font-weight: bold;
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
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default UpdateMovies;
