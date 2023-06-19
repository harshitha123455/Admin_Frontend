import React, { useState, useEffect } from 'react';
import AdminService from '../services/admin-services';
import styled from 'styled-components';
import { message } from 'antd';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const TopText = styled.h1`
  font-size: 30px;
  margin-top: 20px;
  color: #32a6f3;
  text-align: center;
`;

const Box = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PrimaryButton = styled.button`
  background-color: #32a6f3;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

const AddHighlightMovie = () => {
  const [movieName, setMovieName] = useState('');
  const [poster, setPoster] = useState(null);
  const [movies, setMovies] = useState([]);
  const [movieNamesList, setMovieNamesList] = useState([]);
  const adminService = new AdminService();

  useEffect(() => {
    adminService.getAllMovies().then((data) => {
      setMovies(data);
      console.log(data);
    });
  }, []);

  const handleMovieNameChange = (e) => {
    setMovieName(e.target.value);
  };

  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    setPoster(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await adminService.addHighlightMovie(movieName, poster);
      if (response[0]) {
        message.success("Movie details added successfully!");
        setMovieName("");
        setPoster(null);
      } else {
        message.error("Movie details not added!");
      }
    } catch (error) {
      console.error("Error adding movie details:", error);
    }
  };

  return (
    <MainContainer>
      <TopText>Add Highlight Movies</TopText>
      <Box>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="movieName">Movie Name:</label>
            <select
              id="movieName"
              value={movieName}
              onChange={handleMovieNameChange}
            >
              <option value="">Select a movie</option>
              {movies.map((movie) => (
                <option key={movie.name} value={movie.name}>
                  {movie.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="poster">Movie Poster:</label>
            <input
              type="file"
              id="poster"
              accept="image/*"
              onChange={handlePosterChange}
            />
          </div>
          <ButtonContainer>
            <PrimaryButton type="submit">Add Movie</PrimaryButton>
          </ButtonContainer>
        </form>
      </Box>
    </MainContainer>
  );
};

export default AddHighlightMovie;
