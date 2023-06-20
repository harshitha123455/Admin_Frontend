import React, { useState } from "react";
import styled from "styled-components";
import { Button, Form, Input, DatePicker, message, TimePicker, Upload ,Menu , Dropdown} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { DownOutlined, UserOutlined, PlusCircleOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';


import AdminService from "../services/admin-services";
import moment from "moment";
import {Link} from "react-router-dom";

const { SubMenu } = Menu;

const Movie = () => {
  const [showForm, setShowForm] = useState(true);
  const adminService = new AdminService();
  const handleFormSubmit = async (values) => {
    console.log("Form submitted:", values);

    const newMovie = {
      name: values.name,
      genre: values.genre.split(",").map((genre) => genre.trim()),
      description: values.description,
      releaseDate: values.releaseDate,
      duration: values.duration.format("HH:mm"),
      cast: values.cast.split(",").map((cast) => cast.trim()),
      
      image: values.image && values.image[0] ? values.image[0].originFileObj : null,
    };

    var response = await adminService.addMovie(newMovie);
    if (response[0]) {
      setShowForm(true);
      message.success("Movie added successfully!");
    } else {
      message.error(response[1]);
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
transform: translateX(-80%);
color: lightblue;
font-size: 28px;
font-weight: bold;
`;
  
  return (
    
    <MainContainer>
      <Text>ADD MOVIES</Text>
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
      {showForm && (
        <Box>
          <Form onFinish={handleFormSubmit}>
            <Form.Item name="name" label="Name" rules={[{ required: true }]} >
              <StyledInput style={{ width: '168px', marginLeft: '38px' , height: '40px' }} />
            </Form.Item>
            <Form.Item
              name="image"
              label="Image"
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
              rules={[{ required: true, message: "Please upload an image" }]}
            >
              <Upload
                accept="image/*"
                maxCount={1}
                beforeUpload={() => false} // Prevents immediate upload
              >
                <Button icon={<UploadOutlined />} style={{ marginLeft: "35px" }}>
                Upload</Button>
              </Upload>
            </Form.Item >
            <Form.Item
              name="duration"
              label="Duration"
              rules={[{ required: true }]}
            >
              <TimePicker format="HH:mm:ss" style={{ width: '168px', marginLeft: '20px' , height: '40px'}}/>
            </Form.Item>
            <Form.Item name="genre" label="Genre" rules={[{ required: true }]}>
              <StyledInput style={{ width: '168px', marginLeft: '38px' , height: '40px'}}/>
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <StyledInput style={{ width: '168px', marginLeft: '10px' , height: '40px'}} />
            </Form.Item>
            <Form.Item
              name="releaseDate"
              label="Release Date"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: '168px', marginLeft: '10px' , height: '40px'}} />
            </Form.Item>
            <Form.Item name="cast" label="Cast" rules={[{ required: true }]}>
              <StyledTextArea style={{ width: '168px', marginLeft: '60px' , height: '40px'}}/>
            </Form.Item>
            <Form.Item>
              <ButtonContainer>
                <Button type="primary" htmlType="submit">
                  ADD
                </Button>
              </ButtonContainer>
            </Form.Item>
          </Form>
        </Box>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;


const Box = styled.div`
  background-color: rgba(255, 255, 255, 0.8 ); /* Transparent white background */
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-right: 200px; /* Updated value for right margin */
  margin-left: -200px; /* Added left margin with a negative value */
`;  

const StyledInput = styled(Input)`
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  border: black;
  border-radius: 4px;
  background-color: #fff;
  text-align: center;
  font-size: 20px;
`;

const StyledTextArea = styled(Input.TextArea)`
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  border: none;
  border-radius: 4px;
  background-color: #fff;
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export default Movie;
