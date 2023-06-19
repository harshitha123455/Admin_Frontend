import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import AdminService from '../services/admin-services';

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const adminService = new AdminService();

  useEffect(() => {
    adminService.getAllBooking().then((data) => {
      setBookings(data);
    });
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
      title: 'Show',
      dataIndex: 'show',
      key: 'show',
      render: (show) => <span>{show.movie}</span>,
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
