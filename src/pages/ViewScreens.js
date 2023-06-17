import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import AdminService from '../services/admin-services';

const ViewScreens = () => {
  const [screens, setScreens] = useState([]);
  const adminService = new AdminService();

  useEffect(() => {
    adminService.getAllScreens().then((data) => {
      setScreens(data);
    });
  }, []);

  const handleDelete = async (key) => {
    try {
      console.log(key);
      await adminService.deleteScreen(key);
      message.success('Screen deleted successfully!');
      adminService.getAllScreens().then((data) => {
        setScreens(data);
      });
    } catch (error) {
      message.error('Error deleting screen: ' + error);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Total Seats',
      dataIndex: 'totalSeats',
      key: 'totalSeats',
    },
    {
      title: 'Normal Seats',
      dataIndex: 'normalSeats',
      key: 'normalSeats',
    },
    {
      title: 'Premium Seats',
      dataIndex: 'premiumSeats',
      key: 'premiumSeats',
    },
    {
      title: 'Executive Seats',
      dataIndex: 'executiveSeats',
      key: 'executiveSeats',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={() => handleDelete(record.name)}>Delete</a>
        </span>
      ),
    },
  ];

  const tableStyle = {
    width: '100%',
    maxWidth: '800px',
    maxHeight: '400px', // Adjust the value to your desired height
    margin: '0 auto',
    background: '#283593', // Add your desired background color here
  };

  return <Table dataSource={screens} columns={columns} style={tableStyle} scroll={{ y: tableStyle.maxHeight }} />;
};

export default ViewScreens;
