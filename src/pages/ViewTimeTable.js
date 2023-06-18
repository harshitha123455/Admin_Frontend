import React, { useState, useEffect } from "react";
import { Form, DatePicker, Select, Button, message } from "antd";
import styled from "styled-components";
import AdminService from "../services/admin-services";

const ViewTable = () => {
  const [form] = Form.useForm();
  const [screens, setScreens] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const adminService = new AdminService();

  useEffect(() => {
    adminService.getAllScreens().then((data) => {
      setScreens(data);
      console.log(data);
    });
  }, []);

  const handleFormSubmit = async (values) => {
    console.log("Form submitted:", values);
    const response = await adminService.getTimeTable(values.date, values.screen);
    console.log(response);
    if(response[0])
      setTimetable(response[1])
    else
      message.error(response[1]);
    console.log(timetable);
  };

  return (
    <MainContainer>
      <TopText>VIEW TABLE</TopText>
      <Box>
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="screen" label="Screen" rules={[{ required: true }]}>
            <Select style={{ width: "100%" }}>
              {screens.map((screen) => (
                <Select.Option key={screen.id} value={screen.id}>
                  {screen.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <ButtonContainer>
            <Button type="primary" htmlType="submit">
              SEARCH
            </Button>
          </ButtonContainer>
        </Form>

        {timetable && timetable.length > 0 && (
  <TimetableContainer>
    <h2>Entire Timetable</h2>
    <Table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Screen</th>
          <th>Time</th>
          <th>Event</th>
        </tr>
      </thead>
      <tbody>
        {timetable.map((entry) => (
          <tr key={entry.id}>
            <td>{entry.date}</td>
            <td>{entry.screen}</td>
            <td>{entry.slot1}</td>
            <td>{entry.slot2}</td>
            <td>{entry.slot3}</td>
            <td>{entry.slot4}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </TimetableContainer>
)}

      </Box>
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

const TimetableContainer = styled.div`
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
    text-align: left;
  }
`;

export default ViewTable;
