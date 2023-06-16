import React, { useState } from 'react';
import { Input, Button, Table, message } from 'antd';
import AdminService from "../services/admin-services";

const UpdateMovies = () => {
  const [searchValue, setSearchValue] = useState('');
  const [foundMovie, setFoundMovie] = useState(null);
  const [editedData, setEditedData] = useState({});
  const adminService = new AdminService();

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const movies = await adminService.getAllMovies();
      const movie = findMovieByName(searchValue, movies);
      if (movie === undefined) {
        message.error('Movie not found');
        return;
      }
      //split the director list to a string
      movie.director = movie.director.join(", ");
      //split the genre list to a string
      movie.genre = movie.genre.join(", ");
      //split the cast list to a string
      movie.cast = movie.cast.join(", ");
      setFoundMovie(movie);
      setEditedData(movie); // Initialize editedData with the found movie details
    } catch (error) {
      console.error('Error searching movie:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (foundMovie) {
        const updatedMovie = { ...foundMovie, ...editedData };
        const response = await adminService.updateMovie(updatedMovie);
        if (response[0]) {
          message.success('Movie updated successfully!');
          setFoundMovie(updatedMovie);
          setEditedData({});
        } else {
          message.error(response[1]);
        }
      }
    } catch (error) {
      message.error('Error updating movie:', error);
    }
  };

  const findMovieByName = (name, movies) => {
    return movies.find((movie) => movie.name.toLowerCase() === name.toLowerCase());
  };

  const handleCellValueChange = (key, dataIndex, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [dataIndex]: value,
    }));
  };

    // Columns for the movie details table
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
        title: 'Duration',
        dataIndex: 'duration',
        key: 'duration',
        render: (text, record) => (
          <Input
            value={editedData.duration || text}
            onChange={(e) => handleCellValueChange(record.key, 'duration', e.target.value)}
          />
        ),
      },
      {
        title: 'Director',
        dataIndex: 'director',
        key: 'director',
        render: (text, record) => (
          <Input
            value={editedData.director || text}
            onChange={(e) => handleCellValueChange(record.key, 'director', e.target.value)}
          />
        ),
      },
      {
        title: 'Genre',
        dataIndex: 'genre',
        key: 'genre',
        render: (text, record) => (
          <Input
            value={editedData.genre || text}
            onChange={(e) => handleCellValueChange(record.key, 'genre', e.target.value)}
          />
        ),
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: (text, record) => (
          <Input
            value={editedData.description || text}
            onChange={(e) => handleCellValueChange(record.key, 'description', e.target.value)}
          />
        ),
      },
      {
        title: 'Release Date',
        dataIndex: 'releaseDate',
        key: 'releaseDate',
        render: (text, record) => (
          <Input
            value={editedData.releaseDate || text}
            onChange={(e) => handleCellValueChange(record.key, 'releaseDate', e.target.value)}
          />
        ),
      },
      {
        title: 'Cast',
        dataIndex: 'cast',
        key: 'cast',
        render: (text, record) => (
          <Input
            value={editedData.cast || text}
            onChange={(e) => handleCellValueChange(record.key, 'cast', e.target.value)}
          />
        ),
      },
    ];

  const tableData = foundMovie ? [{ ...foundMovie, key: 'movie' }] : [];

  return (
    <div>
      <Input placeholder="Search movie by name" value={searchValue} onChange={handleSearchChange} />
      <Button type="primary" onClick={handleSearch}>Search</Button>
      <br />
      {foundMovie && (
        <div>
          <h2>Movie Details:</h2>
          <Table
            dataSource={tableData}
            columns={columns}
            pagination={false}
            bordered
            size="small"
            scroll={{ y: 300 }}
          />
          <Button type="primary" onClick={handleUpdate}>Update</Button>
        </div>
      )}
    </div>
  );
};

export default UpdateMovies;
