import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import AdminService from '../services/admin-services';

const ViewShows = () => {
  const [shows, setShows] = useState([]);
  const adminService = new AdminService();

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      const data = await adminService.getAllShows();
      setShows(data);
    } catch (error) {
      message.error('Error fetching shows: ' + error);
    }
  };

//   const handleDelete = async (key) => {
//     try {
//       await adminService.deleteShow(key);
//       message.success('Show deleted successfully!');
//       fetchShows();
//     } catch (error) {
//       message.error('Error deleting show: ' + error);
//     }
//   };

  const columns = [
    {
      title: 'Movie Name',
      dataIndex: 'movie',
      key: 'movie',
    },
    {
      title: 'Available Seats',
      dataIndex: 'availableSeats',
      key: 'availableSeats',
    },
    {
      title: 'Available Normal Seats',
      dataIndex: 'availableNormalSeats',
      key: 'availableNormalSeats',
    },
    {
      title: 'Available Premium Seats',
      dataIndex: 'availablePremiumSeats',
      key: 'availablePremiumSeats',
    },
    {
      title: 'Available Executive Seats',
      dataIndex: 'availableExecutiveSeats',
      key: 'availableExecutiveSeats',
    },
    {
      title: 'Normal Rate',
      dataIndex: 'normalRate',
      key: 'normalRate',
    },
    {
      title: 'Executive Rate',
      dataIndex: 'executiveRate',
      key: 'executiveRate',
    },
    {
      title: 'Premium Rate',
      dataIndex: 'premiumRate',
      key: 'premiumRate',
    },
    {
      title: 'Action',
      key: 'action',
    //   render: (text, record) => (
    //     <span>
    //       <a onClick={() => handleDelete(record.id)}>Delete</a>
    //     </span>
    //   ),
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
      dataSource={shows}
      columns={columns}
      style={tableStyle}
      scroll={{ y: tableStyle.maxHeight }}
    />
  );
};

export default ViewShows;
