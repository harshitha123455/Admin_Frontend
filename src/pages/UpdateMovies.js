import React, { useState } from 'react';
import { Input, Button, Table } from 'antd';
import AdminService from "../services/admin-services";

const UpdateMovies = () => {
  const [searchValue, setSearchValue] = useState('');
  const [foundMovie, setFoundMovie] = useState(null);
  const [editedData, setEditedData] = useState({});
  const adminService = new AdminService();

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Function to handle search button click
  const handleSearch = async () => {
    try {
      const movies = await adminService.getAllMovies();
      const movie = findMovieByName(searchValue, movies);
      setFoundMovie(movie);
      setEditedData(movie); // Initialize editedData with the found movie details
    } catch (error) {
      console.error('Error searching movie:', error);
    }
  };

  // Function to handle update button click
  const handleUpdate = () => {
    // Perform the necessary update logic for the found movie
    if (foundMovie) {
      // Perform the update operation using the editedData state
      const updatedMovie = { ...foundMovie, ...editedData };
      // Update the foundMovie state with the updated movie
      setFoundMovie(updatedMovie);
      // Reset the editedData state
      setEditedData({});
      console.log('Movie updated:', updatedMovie);
    }
  };

  // Function to find a movie by name
  const findMovieByName = (name, movies) => {
    return movies.find((movie) => movie.name.toLowerCase() === name.toLowerCase());
  };

  // Function to handle cell value change
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
