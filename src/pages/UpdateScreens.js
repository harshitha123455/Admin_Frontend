import React, { useState } from 'react';
import { Input, Button, Table, message } from 'antd';
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

  return (
    <div>
      <Input placeholder="Search screen by name" value={searchValue} onChange={handleSearchChange} />
      <Button type="primary" onClick={handleSearch}>Search</Button>
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
            background = 'rgba(255, 255, 255, 0.5)'
          />
          <Button type="primary" onClick={handleUpdate}>Update</Button>
        </div>
      )}
    </div>
  );
};

export default UpdateScreens;
