import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { Resizable } from 'react-resizable';
import AdminService from '../services/admin-services';
import { message } from 'antd';

const ViewMovies = () => {
  const [movies, setMovies] = useState([]);
  const [columns, setColumns] = useState([
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: (text) => <span style={{ color: 'red', fontWeight: 'bold' }}>{text}</span>,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      width: 100,
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre',
      width: 150,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 300,
    },
    {
      title: 'Release Date',
      dataIndex: 'releaseDate',
      key: 'releaseDate',
      width: 140,
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
  ]);

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

  const ResizableTitle = (props) => {
    const { width, onResize, ...restProps } = props;

    if (!width) {
      return <th {...restProps} />;
    }

    return (
      <Resizable width={width} height={0} onResize={onResize}>
        <th {...restProps} />
      </Resizable>
    );
  };

  const components = {
    header: {
      cell: ResizableTitle,
    },
  };

  const handleResize = (index) => (e, { size }) => {
    setColumns((columns) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return nextColumns;
    });
  };

  

  return (
    <Table
      dataSource={movies}
      columns={columns}
      components={components}
      bordered
      scroll={{ y: 400 }}
      pagination={false}
    />
  );
};

export default ViewMovies;
