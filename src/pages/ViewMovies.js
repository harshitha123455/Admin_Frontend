import AdminService from "../services/admin-services";
import { useEffect, useState } from "react";

const ViewMovies = () => {
  const [movies, setMovies] = useState([]);
  const adminService = new AdminService();

  useEffect(() => {
    adminService.getAllMovies().then((data) => {
      setMovies(data);
    });
  }, []);

  return (
    <div>
        {movies.map((movie) => (
            <div key={movie.id}>
                <h1>{movie.name}</h1>
                <h2>{movie.genre}</h2>
                <h3>{movie.description}</h3>
                <h4>{movie.releaseDate}</h4>
                <h5>{movie.cast}</h5>
                </div>
        ))}

    </div>
  );
};

export default ViewMovies;
