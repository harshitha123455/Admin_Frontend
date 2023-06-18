import moment from "moment/moment";
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

  // Add new Movie
  addMovie = async (newMovie) => {
    try {
      const formData = new FormData();
      formData.append(
        "movie",
        JSON.stringify({
          name: newMovie.name,
          genre: newMovie.genre,
          description: newMovie.description,
          releaseDate: this.formatDate(newMovie.releaseDate),
          duration: newMovie.duration,
          cast: newMovie.cast,
        })
      );
      formData.append("image", newMovie.image);

      const response = await fetch("http://localhost:8880/admin/movie/add", {
        method: "POST",
        headers: {
          contentType: "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,
      });

      if (response.status === 202) {
        return [true];
      } else {
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
  };

  getMovieByName = async (name) => {
    try {
      const response = await fetch(
        this.BASE_URL + "/movie/search/name/" + name,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const responseBody = await response.json();
        return responseBody;
      }
    } catch (error) {
      console.log(error);
    }
  };

  updateMovie = async (updatedMovie) => {
    console.log(updatedMovie);
    try {
      const response = await fetch(this.BASE_URL + "/admin/movie/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          id: updatedMovie.id,
          name: updatedMovie.name,
          director: updatedMovie.director
            .split(",")
            .map((genre) => genre.trim()),
          genre: updatedMovie.genre.split(",").map((genre) => genre.trim()),
          description: updatedMovie.description,
          releaseDate: updatedMovie.releaseDate,
          duration: updatedMovie.duration,
          cast: updatedMovie.cast.split(",").map((genre) => genre.trim()),
        }),
      });
      if (response.status === 202) {
        return [true];
      } else {
        return [false, await response.json().then((data) => data.message)];
      }
    } catch (error) {
      console.log(error);
      return [false, error.toString()];
    }
  };

  deleteMovie = async (id) => {
    try {
      const response = await fetch(
        this.BASE_URL + "/admin/movie/remove/id/" + id,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 202) {
        return [true];
      } else {
        return [false, await response.json().then((data) => data.message)];
      }
    } catch (error) {
      console.log(error);
      return [false, error.toString()];
    }
  };

  //Add Screen
  addScreen = async (newScreen) => {
    try {
      const response = await fetch(this.BASE_URL + "/admin/screen/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: newScreen.name,
          totalSeats: newScreen.totalSeats,
          normalSeats: newScreen.normalSeats,
          premiumSeats: newScreen.premiumSeats,
          executiveSeats: newScreen.executiveSeats,
        }),
      });

      if (response.status === 202) {
        return [true];
      } else {
        return [false, (await response.json()).message];
      }
    } catch (error) {
      console.log(error);
      return [false, error.toString()];
    }
  };

  //get Screens
  getAllScreens = async () => {
    try {
      const response = await fetch(this.BASE_URL + "/admin/screen/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        const responseBody = await response.json();
        return responseBody;
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteScreen = async (id) => {
    try {
      const response = await fetch(
        this.BASE_URL + "/admin/screen/remove/id/" + id,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 202) {
        return [true];
      } else {
        return [false, await response.json().then((data) => data.message)];
      }
    } catch (error) {
      console.log(error);
      return [false, error.toString()];
    }
  };

  updateScreen = async (updatedScreen) => {
    console.log(updatedScreen);
    try {
      const response = await fetch(this.BASE_URL + "/admin/screen/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          id: updatedScreen.id,
          name: updatedScreen.name,
          totalSeats: updatedScreen.totalSeats,
          normalSeats: updatedScreen.normalSeats,
          premiumSeats: updatedScreen.premiumSeats,
          executiveSeats: updatedScreen.executiveSeats,
        }),
      });
      if (response.status === 202) {
        return [true];
      } else {
        return [false, await response.json().then((data) => data.message)];
      }
    } catch (error) {
      console.log(error);
      return [false, error.toString()];
    }
  };

  getScreenById = async (id) => {
    try {
      const response = await fetch(
        this.BASE_URL + "/admin/screen/search/id/" + id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        const responseBody = await response.json();
        return responseBody;
      }
    } catch (error) {
      console.log(error);
    }
  };

  createTimeTable = async (newTimeTable) => {
    newTimeTable.slot1.movie = await this.getMovieByName(
      newTimeTable.slot1.movie
    );
    newTimeTable.slot2.movie = await this.getMovieByName(
      newTimeTable.slot2.movie
    );
    newTimeTable.slot3.movie = await this.getMovieByName(
      newTimeTable.slot3.movie
    );
    newTimeTable.slot4.movie = await this.getMovieByName(
      newTimeTable.slot4.movie
    );
    try {
      const body = JSON.stringify({
        date: this.formatDate(newTimeTable.date),
        screen: await this.getScreenById(newTimeTable.screen),
        slot1: newTimeTable.slot1,
        slot2: newTimeTable.slot2,
        slot3: newTimeTable.slot3,
        slot4: newTimeTable.slot4,
      });
      console.log(body);
      const response = await fetch(this.BASE_URL + "/admin/timeTable/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: body,
      });

      if (response.status === 202) {
        return [true];
      } else {
        return [false, (await response.json()).message];
      }
    } catch (error) {
      console.log(error);
      return [false, error.toString()];
    }
  };

  getAllTimeTables = async () => {
    try {
      const response = await fetch(this.BASE_URL + "/admin/timeTable/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        const responseBody = await response.json();
        return responseBody;
      }
    } catch (error) {
      console.log(error);
    }
  };

  getTimeTable = async (date, screen) => {
    try {
      const response = await fetch(
        this.BASE_URL + "/timeTable/search/dateAndScreen",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: this.formatDate(date),
            sid: screen,
          }),
        }
      );
      if (response.status === 202) {
        const responseBody = await response.json();
        return [true, responseBody];
      } else return [false, (await response.json()).message];
    } catch (error) {
      console.log(error);
      return [false, error.toString()];
    }
  };

  formatDate = (date) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
}
