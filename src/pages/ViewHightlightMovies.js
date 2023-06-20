import React, { useEffect, useState } from 'react';
import { Tag, message, Card, Button, Breadcrumb } from 'antd';
import AdminService from '../services/admin-services';


const { Meta } = Card;

const ViewHighlightMovies = () => {
  const [movies, setMovies] = useState([]);
  const adminService = new AdminService();

  useEffect(() => {
    adminService.getAllMovies().then((data) => {
      setMovies(data);
    });
  }, []);

  const handleDelete = async (id) => {
    if ( window.confirm("Are you sure you want to delete this movie?") ) {
      const response = await adminService.deleteMovie(id);
      if(response[0]) {
        message.success('Movie deleted successfully');
        setMovies(movies.filter((movie) => movie.id !== id));
      } else {
        message.error('Movie could not be deleted. Reason: ' + response[1]);
      }
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#32a6f3' }}>VIEW MOVIES</h1>
        {movies.map((movie) => (
          <div key={movie.id} style={{ display: 'flex', justifyContent: 'center' }}>
            <Card style={{ width: 500, background: 'rgba(255, 255, 255, 0.7)' }}>
              <Meta
                title={<h1 style={{ color: 'red', fontWeight: 'bold', fontSize: '30px' }}>{movie.name}</h1>}
                description={
                  <div>
                    <p style={{ fontSize: '20px', marginBottom: '0px', marginLeft: '0px', marginRight: '35px' }}>
                      <strong style={{ fontSize: '22px' }}>Duration:</strong>{' '}
                      <span style={{ fontSize: '20px' }}>{movie.duration}</span>
                    </p>
                    <p style={{ fontSize: '20px', marginBottom: '0px', marginLeft: '0px', marginRight: '30px' }}>
                      <strong style={{ fontSize: '22px' }}>Genre:</strong>{' '}
                      <span style={{ fontSize: '20px' }}>{movie.genre}</span>
                    </p>
                    <p style={{ fontSize: '20px', marginBottom: '0px', marginLeft: '0px', marginRight: '30px' }}>
                      <strong>Description:</strong> {movie.description}
                    </p>
                    <p style={{ fontSize: '20px', marginBottom: '0px', marginLeft: '0px', marginRight: '30px' }}>
                      <strong>Release Date:</strong> {movie.releaseDate}
                    </p>
                    <p style={{ fontSize: '20px', marginBottom: '0px', marginLeft: '0px', marginRight: '30px' }}>
                      <strong>Cast:</strong>{' '}
                      {movie.cast.map((actor, index) => (
                        <Tag color="blue" key={index}>
                          {actor}
                        </Tag>
                      ))}
                    </p>
                    <p style={{ border: '3px solid #000', padding: '3px', margin: '20px 185px' }}>
                    <Button type="primary" onClick={() => handleDelete(movie.id)}>Delete</Button>
                    </p>
                  </div>
                }
              />
            </Card>
          </div>
        ))}
    </div>
  );
};

export default ViewHighlightMovies;
