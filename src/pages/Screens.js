import React, { useState } from "react";
import styled from "styled-components";
import { Button, Form, Input, DatePicker, message, TimePicker, Upload ,Menu , Dropdown } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import AdminService from "../services/admin-services";
import moment from "moment";
import {Link} from "react-router-dom";
import { DownOutlined, UserOutlined, PlusCircleOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';


const Screen = () => {
    const [showForm, setShowForm] = useState(true);
    const adminService = new AdminService();

    const handleFormSubmit = async (values) => {
        console.log("Form submitted:", values);

    const newScreen = {
            name: values.name,
            totalSeats: values.totalSeats,
            normalSeats: values.normalSeats,
            premiumSeats: values.premiumSeats,
            executiveSeats: values.executiveSeats,
          };    
          var response = await adminService.addScreen(newScreen);
          if (response[0]) {
            setShowForm(false);
            message.success("Screen added successfully!");
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
              <TopText>ADD SCREEN</TopText>
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
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                      <StyledInput  style={{ width: "168px", marginLeft: "75px", height: "40px" }} />
                    </Form.Item>
                    <Form.Item name="totalSeats" label="Total Seats" rules={[{ required: true }]}>
                      <StyledInput type="number" style={{ width: "168px", marginLeft: "48px", height: "40px" }} />
                    </Form.Item>
                    <Form.Item name="normalSeats" label="Normal Seats" rules={[{ required: true }]}>
                      <StyledInput type="number" style={{ width: "168px", marginLeft: "35px", height: "40px" }} />
                    </Form.Item>
                    <Form.Item name="premiumSeats" label="Premium Seats" rules={[{ required: true }]}>
                      <StyledInput type="number"style={{ width: "168px", marginLeft: "25px", height: "40px" }} />
                    </Form.Item>
                    <Form.Item name="executiveSeats" label="Executive Seats" rules={[{ required: true }]}>
                      <StyledInput type="number" style={{ width: "168px", marginLeft: "25px", height: "40px" }} />
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

const TopText = styled.h1`
  font-size: 30px;
  margin-top: 20px;
  margin-left: 50px;
  margin-right: 1280px;
  color: #32a6f3; /* Set the desired font color */
  text-align: center; /* Center-align the text */
`;

const Box = styled.div`
  background-color: rgba(255, 255, 255, 0.8); /* Transparent white background */
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledInput = styled(Input)`
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  border: none;
  border-radius: 4px;
  background-color: #fff;
  text-align: center;
  font-size: 16px;
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

export default Screen;
