import React, { useEffect, useState } from 'react';
import { Table, Divider, Tag } from 'antd';
import AdminService from "../services/admin-services";
import { message } from 'antd';


const ViewMovies = () => {
  const [movies, setMovies] = useState([]);
  const adminService = new AdminService();

  useEffect(() => {
    adminService.getAllMovies().then((data) => {
      setMovies(data);
    });
  }, []);

  const handleDelete = async (key) => {
    try {
      console.log(key);
      await adminService.deleteMovie(key);
      message.success('Movie deleted successfully!');
      adminService.getAllMovies().then((data) => {
        setMovies(data);
      });
    } catch (error) {
      message.error('Error deleting movie: ' + error);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Release Date',
      dataIndex: 'releaseDate',
      key: 'releaseDate',
    },
    {
      title: 'Cast',
      dataIndex: 'cast',
      key: 'cast',
      render: (cast) => (
        <span>
          {cast.map((actor, index) => (
            <Tag color="blue" key={index}>
              {actor}
            </Tag>
          ))}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={() => handleDelete(record.id)}>Delete</a>
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

  

  return (
    <Table dataSource={movies} columns={columns} style={tableStyle} scroll={{ y: tableStyle.maxHeight }} />
  );
};

export default ViewMovies;
