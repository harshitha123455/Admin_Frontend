import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Button, Form, Input, DatePicker, message, TimePicker, Upload ,Menu , Dropdown , Table} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { DownOutlined, UserOutlined, PlusCircleOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";
import AdminService from '../services/admin-services';

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const adminService = new AdminService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingData = await adminService.getAllBooking();
        console.log(bookingData);
  
        const bookings = await Promise.all(
          bookingData.map(async (booking) => {
            const timeTable = await adminService.getTimeTableByShowId(booking.shows.id);
            console.log(timeTable);
  
            return {
              id: booking.id,
              user: booking.user,
              movie: booking.shows.movie.name,
              seats: booking.pos,
              totalAmount: booking.payment.amount,
              date: timeTable.date,
              time:booking.shows.time,
              screen: timeTable.screen.name,
            };
          })
        );
  
        setBookings(bookings);
      } catch (error) {
        console.log(error);
        message.error(error.message);
      }
    };
  
    fetchData();
  }, []);
  

  const columns = [
    {
      title: 'Booking ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: (user) => <span>{user.name}</span>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => <span>{date}</span>,
    },
    {
      title: 'Movie',
      dataIndex: 'movie',
      key: 'movie',
      render: (movie) => <span>{movie}</span>,
    },
    {
      title: 'Screen',
      dataIndex: 'screen',
      key: 'screen',
      render: (screen) => <span>{screen}</span>,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: (time) => <span>{time}</span>,
    },
    {
      title: 'Seats',
      dataIndex: 'seats',
      key: 'seats',
      render: (seats) => (
        <span>
          {seats.map((seat, index) => (
            <span key={index}>{seat}, </span>
          ))}
        </span>
      ),
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
  ];

  const tableStyle = {
    width: '100%',
    maxWidth: '800px',
    maxHeight: '400px', // Adjust the value to your desired height
    margin: '0 auto',
    background: '#283593', // Add your desired background color here
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
      <Text>VIEW BOOKINGS</Text>
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
    <Table
      dataSource={bookings}
      columns={columns}
      style={tableStyle}
      scroll={{ y: tableStyle.maxHeight }}
    />
    </MainContainer>
  );
};

export default ViewBookings;
