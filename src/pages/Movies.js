import React, { useState } from "react";
import styled from "styled-components";
import { Button, Form, Input, DatePicker, message, TimePicker } from "antd";
import MoviesContainer from "../components/MovieContainer";
import AdminService from "../services/admin-services";
import moment from "moment";

const Movie = () => {
  const [showForm, setShowForm] = useState(true);
  const adminService = new AdminService();

  const handleFormSubmit = async (values) => {
    console.log("Form submitted:", values);

    const newMovie = {
      name: values.name,
      genre: values.genre.split(",").map((genre) => genre.trim()),
      description: values.description,
      releaseDate: moment(values.releaseDate).format("YYYY-MM-DD"),
      duration: values.duration.format("HH:mm"),
      cast: values.cast.split(",").map((cast) => cast.trim()),
    };
    var response = await adminService.addMovie(newMovie);
    if (response[0]) {
      setShowForm(false);
      message.success("Movie added successfully!");
    } else {
      message.error(response[1]);
    }
  };
  
  return (
    <MainContainer>
      <TopText>ADD MOVIES</TopText>
      {showForm && (
        <Box>
          <Form onFinish={handleFormSubmit}>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <StyledInput style={{ width: '168px', marginLeft: '20px' , height: '40px' }} />
            </Form.Item>
            <Form.Item
              name="duration"
              label="Duration"
              rules={[{ required: true }]}
            >
              <TimePicker format="HH:mm:ss"  style={{ width: '168px', marginLeft: '10px' , height: '40px'}}/>
            </Form.Item>
            <Form.Item name="genre" label="Genre" rules={[{ required: true }]}>
              <StyledInput style={{ width: '168px', marginLeft: '28px' , height: '40px'}}/>
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <StyledInput style={{ width: '168px', marginLeft: '0px' , height: '40px'}} />
            </Form.Item>
            <Form.Item
              name="releaseDate"
              label="Release Date"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: '168px', marginLeft: '10px' , height: '40px'}} />
            </Form.Item>
            <Form.Item name="cast" label="Cast" rules={[{ required: true }]}>
              <StyledTextArea style={{ width: '168px', marginLeft: '60px' , height: '40px'}}/>
            </Form.Item>
            <Form.Item>
              <ButtonContainer>
                <Button type="primary" htmlType="submit">
                  ADD
                </Button>
              </ButtonContainer>
            </Form.Item>
          </Form>
        </Box>
      )}
    </MainContainer>
  );
};

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
  margin-left: 50px;
  margin-right: 1280px;
  color: #32a6f3; /* Set the desired font color */
  text-align: center; /* Center-align the text */
`;

const Box = styled.div`
  background-color: rgba(255, 255, 255, 0.5); /* Transparent white background */
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledInput = styled(Input)`
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  border: none;
  border-radius: 4px;
  background-color: #fff;
  text-align: center;
  font-size: 16px;
`;

const StyledTextArea = styled(Input.TextArea)`
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  border: none;
  border-radius: 4px;
  background-color: #fff;
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export default Movie;
