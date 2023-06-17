import React, { useState } from "react";
import styled from "styled-components";
import { Button, Form, Input, DatePicker, message, TimePicker, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import AdminService from "../services/admin-services";
import moment from "moment";

const Screen = () => {
    const [showForm, setShowForm] = useState(true);
    const adminService = new AdminService();

    const handleFormSubmit = async (values) => {
        console.log("Form submitted:", values);

    const newScreen = {
            name: values.name,
            totalSeats: values.totalSeats,
            normalSeats: values.normalSeats,
            premiumSeats: values.premiumSeats,
            executiveSeats: values.executiveSeats,
          };    
          var response = await adminService.addScreen(newScreen);
          if (response[0]) {
            setShowForm(false);
            message.success("Screen added successfully!");
          } else {
            message.error(response[1]);
          }
        };

        return (
            <MainContainer>
              <TopText>ADD SCREEN</TopText>
              {showForm && (
                <Box>
                  <Form onFinish={handleFormSubmit}>
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                      <StyledInput style={{ width: "168px", marginLeft: "75px", height: "40px" }} />
                    </Form.Item>
                    <Form.Item name="totalSeats" label="Total Seats" rules={[{ required: true }]}>
                      <StyledInput style={{ width: "168px", marginLeft: "48px", height: "40px" }} />
                    </Form.Item>
                    <Form.Item name="normalSeats" label="Normal Seats" rules={[{ required: true }]}>
                      <StyledInput style={{ width: "168px", marginLeft: "35px", height: "40px" }} />
                    </Form.Item>
                    <Form.Item name="premiumSeats" label="Premium Seats" rules={[{ required: true }]}>
                      <StyledInput style={{ width: "168px", marginLeft: "25px", height: "40px" }} />
                    </Form.Item>
                    <Form.Item name="executiveSeats" label="Executive Seats" rules={[{ required: true }]}>
                      <StyledInput style={{ width: "168px", marginLeft: "25px", height: "40px" }} />
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

export default Screen;
