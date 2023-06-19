import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
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

  return (
    <Table
      dataSource={bookings}
      columns={columns}
      style={tableStyle}
      scroll={{ y: tableStyle.maxHeight }}
    />
  );
};

export default ViewBookings;
