import React, { useState } from 'react';
import { Button, Form, Input, DatePicker, message, TimePicker, Upload ,Menu , Dropdown  , Table} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { DownOutlined, UserOutlined, PlusCircleOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";
import styled from "styled-components";
import AdminService from "../services/admin-services";

const UpdateScreens = () => {
  const [searchValue, setSearchValue] = useState('');
  const [foundScreen, setFoundScreen] = useState(null);
  const [editedData, setEditedData] = useState({});
  const adminService = new AdminService();

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const screens = await adminService.getAllScreens();
      const screen = findScreenByName(searchValue, screens);
      if (screen === undefined) {
        message.error('Screen not found');
        return;
      }
      setFoundScreen(screen);
      setEditedData(screen); // Initialize editedData with the found screen details
    } catch (error) {
      console.error('Error searching screen:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (foundScreen) {
        const updatedScreen = { ...foundScreen, ...editedData };
        const response = await adminService.updateScreen(updatedScreen);
        if (response[0]) {
          message.success('Screen updated successfully!');
          setFoundScreen(updatedScreen);
          setEditedData({});
        } else {
          message.error(response[1]);
        }
      }
    } catch (error) {
      message.error('Error updating screen:', error);
    }
  };

  const findScreenByName = (name, screens) => {
    return screens.find((screen) => screen.name.toLowerCase() === name.toLowerCase());
  };

  const handleCellValueChange = (key, dataIndex, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [dataIndex]: value,
    }));
  };
  

  // Columns for the screen details table
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Input
          value={editedData.name || text}
          onChange={(e) => handleCellValueChange(record.key, 'name', e.target.value)}
        />
      ),
    },
    {
      title: 'Total Seats',
      dataIndex: 'totalSeats',
      key: 'totalSeats',
      render: (text, record) => (
        <Input
          value={editedData.totalSeats || text}
          onChange={(e) => handleCellValueChange(record.key, 'totalSeats', e.target.value)}
        />
      ),
    },
    {
      title: 'Normal Seats',
      dataIndex: 'normalSeats',
      key: 'normalSeats',
      render: (text, record) => (
        <Input
          value={editedData.normalSeats || text}
          onChange={(e) => handleCellValueChange(record.key, 'normalSeats', e.target.value)}
        />
      ),
    },
    {
      title: 'Premium Seats',
      dataIndex: 'premiumSeats',
      key: 'premiumSeats',
      render: (text, record) => (
        <Input
          value={editedData.premiumSeats || text}
          onChange={(e) => handleCellValueChange(record.key, 'premiumSeats', e.target.value)}
        />
      ),
    },
    {
      title: 'Executive Seats',
      dataIndex: 'executiveSeats',
      key: 'executiveSeats',
      render: (text, record) => (
        <Input
          value={editedData.executiveSeats || text}
          onChange={(e) => handleCellValueChange(record.key, 'executiveSeats', e.target.value)}
        />
      ),
    },
  ];

  const tableData = foundScreen ? [{ ...foundScreen, key: 'screen' }] : [];

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
right: 65%;
transform: translateX(-80%);
color: lightblue;
font-size: 28px;
font-weight: bold;
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
  return (
    <MainContainer>
    <Text>UPDATE SCREENS</Text>
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
    <div>
    <Input placeholder="Search movie by name" value={searchValue} onChange={handleSearchChange} style={{ width: '300px', height: '40px', marginRight: '10px' }}/>
      <Button type="primary" onClick={handleSearch}  style={{ height: '40px', fontSize: '16px' }}>Search</Button>
      <br />
      {foundScreen && (
        <div>
          <h2>Screen Details:</h2>
          <Table
            dataSource={tableData}
            columns={columns}
            pagination={false}
            bordered
            size="small"
            scroll={{ y: 300 }}
            background = 'rgba(255, 255, 255, 0.8)'
          />
          <Button type="primary" onClick={handleUpdate}>Update</Button>
        </div>
      )}
    </div>
    </MainContainer>
  );
};

export default UpdateScreens;
