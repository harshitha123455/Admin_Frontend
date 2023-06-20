import React, { useEffect, useState } from 'react';
import { Tag, message, Card, Button, Breadcrumb } from 'antd';
import AdminService from '../services/admin-services';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const { Meta } = Card;

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

  return (
    <div>
      <Breadcrumb separator=">">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>View Movies</Breadcrumb.Item>
      </Breadcrumb>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#32a6f3' }}>VIEW MOVIES</h1>
      <Carousel showArrows={true}>
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
      </Carousel>
    </div>
  );
};

export default ViewMovies;
