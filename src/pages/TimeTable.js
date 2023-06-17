import React, { useState } from "react";
import { Form, DatePicker, Select, Button, Row, Col, message } from "antd";
import styled from "styled-components";
import moment from "moment";
import AdminService from "../services/admin-services";

const { Option } = Select;

const TimeTable = () => {
  const [form] = Form.useForm();
  const [showTimeTable, setShowTimeTable] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);
  const adminService = new AdminService();

  const handleFormSubmit = async (values) => {
    console.log("Form submitted:", values);
    setShowTimeTable(true);
  };

  const handleShowButtonClick = async (show) => {
    setSelectedShow(show);

    // Example usage of AdminService
    const response = await adminService.getShowTimings(show);
    if (response[0]) {
      message.success(`Fetched show timings for ${show}`);
      console.log(response[1]); // Show timings data
    } else {
      message.error(response[1]);
    }
  };

  return (
    <MainContainer>
      <TopText>TIME TABLE</TopText>
      {!showTimeTable && (
        <Box>
          <Form form={form} onFinish={handleFormSubmit}>
            <Form.Item name="date" label="Date" rules={[{ required: true }]}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="screen" label="Screen" rules={[{ required: true }]}>
              <Select style={{ width: "100%" }}>
                <Option value="screen1">Screen 1</Option>
                <Option value="screen2">Screen 2</Option>
                <Option value="screen3">Screen 3</Option>
                <Option value="screen4">Screen 4</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <ButtonContainer>
                <Button type="primary" htmlType="submit">
                  SHOW TIME TABLE
                </Button>
              </ButtonContainer>
            </Form.Item>
          </Form>
        </Box>
      )}
      {showTimeTable && (
        <>
          <h2>Time Table</h2>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <ShowButton
                onClick={() => handleShowButtonClick("morning")}
                selected={selectedShow === "morning"}
              >
                Morning Show
              </ShowButton>
            </Col>
            <Col span={6}>
              <ShowButton
                onClick={() => handleShowButtonClick("afternoon")}
                selected={selectedShow === "afternoon"}
              >
                Afternoon Show
              </ShowButton>
            </Col>
            <Col span={6}>
              <ShowButton
                onClick={() => handleShowButtonClick("evening")}
                selected={selectedShow === "evening"}
              >
                Evening Show
              </ShowButton>
            </Col>
            <Col span={6}>
              <ShowButton
                onClick={() => handleShowButtonClick("night")}
                selected={selectedShow === "night"}
              >
                Night Show
              </ShowButton>
            </Col>
          </Row>
          <ButtonContainer>
                <Button type="primary" htmlType="submit">
                  ADD TIMETABLE
                </Button>
              </ButtonContainer>
        </>
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

const ShowButton = styled(Button)`
  width: 100%;
  height: 200px;
  background-color: ${(props) =>
    props.selected ? "#32a6f3" : "rgba(255, 255, 255, 0.5)"};
  color: ${(props) => (props.selected ? "#ffffff" : "#000000")};
  border: none;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${(props) =>
      props.selected ? "#32a6f3" : "rgba(255, 255, 255, 0.7)"};
  }
`;

export default TimeTable;
