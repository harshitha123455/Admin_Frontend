import UpdateMovies from "../pages/UpdateMovies";

export default class AdminService {
  BASE_URL = "http://localhost:8880";

  //Authentication
  authenticate = async (email, password) => {
    try {
      const response = await fetch(this.BASE_URL + "/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const responseBody = await response.json();
        // Save the token in localStorage
        localStorage.setItem("token", responseBody.token);
        return true;
      } else {
        //Login failed
        return false;
      }
    } catch (error) {
      console.log(error);
      //Login failed
      return false;
    }
  };

  //Add new Movie
  addMovie = async (newMovie) => {
    try {
      const response = await fetch("http://localhost:8880/admin/movie/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: newMovie.name,
          genre: newMovie.genre,
          description: newMovie.description,
          releaseDate: newMovie.releaseDate,
          duration: newMovie.duration,
          cast: newMovie.cast
        }),
      });
      if (response.status === 202) {
        return [true];
      }
      else {
        return [false, await response.json().then((data) => data.message)];
      }
    } catch (error) {
      console.log(error);
      return [false, error.toString()];
    }
  };

  //Get all movies
  getAllMovies = async () => {
    try {
      const response = await fetch(this.BASE_URL + "/movie/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const responseBody = await response.json();
        return responseBody;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

//Update Movies












  