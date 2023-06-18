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
    const selectedDate = moment(values.date).format("YYYY-MM-DD");
    console.log("Selected Date:", selectedDate);
    console.log("Form submitted:", values);

    // For testing purposes, provide a static timetable data
    const staticTimetable = [
      { id: 1, date: selectedDate, screen: "Screen 1", slot1: "9:00 AM", slot2: "12:00 PM", slot3: "3:00 PM", slot4: "6:00 PM" },
      { id: 2, date: selectedDate, screen: "Screen 2", slot1: "10:00 AM", slot2: "1:00 PM", slot3: "4:00 PM", slot4: "7:00 PM" },
      { id: 3, date: selectedDate, screen: "Screen 3", slot1: "11:00 AM", slot2: "2:00 PM", slot3: "5:00 PM", slot4: "8:00 PM" },
    ];

    setTimetable(staticTimetable);
    message.success("Timetable retrieved");
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
                  <th>Slot 1</th>
                  <th>Slot 2</th>
                  <th>Slot 3</th>
                  <th>Slot 4</th>
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
