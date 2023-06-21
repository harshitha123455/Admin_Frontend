import React, { useState, useEffect } from "react";
import { Form, DatePicker, Select, Button, message,Menu , Dropdown } from "antd";
import styled from "styled-components";
import AdminService from "../services/admin-services";
import {Link} from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { DownOutlined, UserOutlined, PlusCircleOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import moment from "moment";

const ViewTable = () => {
  const [form] = Form.useForm();
  const [screens, setScreens] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const adminService = new AdminService();

  useEffect(() => {
    adminService.getAllScreens().then((data) => {
      setScreens(data);
      console.log(data);
    });
  }, []);

  const handleFormSubmit = async (values) => {
    console.log("Form submitted:", values);

    const response = await adminService.getTimeTable(values.date, values.screen);
    if(response[0]){
      const slotObjects = {
        slot1: response[1].slot1,
        slot2: response[1].slot2,
        slot3: response[1].slot3,
        slot4: response[1].slot4,
      }
      const data = Object.values(slotObjects)
      message.success("Timetable retrieved");
      setTimetable(data);
      console.log(data);
    }
    else{
      message.error("Timetable not found");
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
      <Text>VIEW TABLE</Text>
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
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker style={{ width: "100%" }}/>
          </Form.Item>
          <Form.Item name="screen" label="Screen" rules={[{ required: true }]}>
            <Select style={{ width: "100%" }}>
              {screens.map((screen) => (
                <Select.Option key={screen.id} value={screen.id}>
                  {screen.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <ButtonContainer>
            <Button type="primary" htmlType="submit">
              SEARCH
            </Button>
          </ButtonContainer>
        </Form>

        {timetable && timetable.length > 0 && (
          <TimetableContainer>
            
            <Table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Movie Name</th>
                  <th>Available Normal Seats</th>
                  <th>Available Executive Seats</th>
                  <th>Available Premium Seats</th>
                </tr>
              </thead>
              <tbody>
                {timetable.map((entry) => (
                  <tr key={entry.id}>
                    <td>{entry.time}</td>
                    <td>{entry.movie.name}</td>
                    <td>{entry.seatingArrangement.availableNormalSeats}</td>
                    <td>{entry.seatingArrangement.availablePremiumSeats}</td>
                    <td>{entry.seatingArrangement.availableExecutiveSeats}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TimetableContainer>
        )}
      </Box>
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
  color: #32a6f3;
  text-align: center;
`;

const Box = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;



const TimetableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0px;
  left: 10px;
`;

const Table = styled.table`
  width: 70%;
  border-collapse: collapse;

  th,
  td {
    padding: 9px;
    border-bottom: 1px solid #000;
  }
  th {
    background-color: rgba(255, 255, 255, 0.9);
    font-size: 16px;
    margin-right: 20px;
    text-align: right;
  }
`;

export default ViewTable;
