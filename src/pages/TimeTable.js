import React, { useState, useEffect } from "react";
import { Form, DatePicker, Select, Button, Row, Col, message, Modal, InputNumber } from "antd";
import styled from "styled-components";
import moment from "moment";
import AdminService from "../services/admin-services";

const TimeTable = () => {
  const [form] = Form.useForm();
  const [showTimeTable, setShowTimeTable] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAfternoonModalVisible, setIsAfternoonModalVisible] = useState(false);
  const [isEveningModalVisible, setIsEveningModalVisible] = useState(false);
  const [isNightModalVisible, setIsNightModalVisible] = useState(false);
  const [screens, setScreens] = useState([]);
  const [movies, setMovies] = useState([]);
  const [morningShow, setMorningShow] = useState([]);
  const [afternoonShow, setAfternoonShow] = useState([]);
  const [eveningShow, setEveningShow] = useState([]);
  const [nightShow, setNightShow] = useState([]);
  const [dateShow, setDateShow] = useState(null);

  const adminService = new AdminService();

  useEffect(() => {
    adminService.getAllScreens().then((data) => {
      setScreens(data);
      console.log(data);
    });
    adminService.getAllMovies().then((data) => {
      setMovies(data);
    });
  }, []);

  const handleFormSubmit = async (values) => {
    console.log("Form submitted:", values);
    setDateShow({
      date: values.date,
      screen: values.screen,
    });
    setShowTimeTable(true);
  };

  const handleTimeTableSubmit = async (values) => {
    const timeTableDetails = {
      date:moment(dateShow.date).format("YYYY-MM-DD"),
      screen: dateShow.screen,
      slot1: morningShow,
      slot2: afternoonShow,
      slot3: eveningShow,
      slot4: nightShow,
    };
    console.log("Time table submitted:", timeTableDetails);
    const response = await adminService.createTimeTable(timeTableDetails);
    if (response[0]) {
      message.success("Time table created successfully");
    } else {
      message.error(response[1]);
    }
  }


  const handleShowButtonClick = async (show) => {
    setSelectedShow(show);

    if (show === "morning") {
      setIsModalVisible(true);
    } else if (show === "afternoon") {
      setIsAfternoonModalVisible(true);
    } else if (show === "evening") {
      setIsEveningModalVisible(true);
    } else if (show === "night") {
      setIsNightModalVisible(true);
    } else {
      const response = await adminService.getShowTimings(show);
      if (response[0]) {
        message.success(`Fetched show timings for ${show}`);
        console.log(response[1]); // Show timings data
      } else {
        message.error(response[1]);
      }
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleModalSubmit = (values) => {
    console.log("Modal form submitted:", values);
    setIsModalVisible(false);

    // Update the morning show button column with the submitted values
    const morningShowButton = document.querySelector("#morning-show-button");
    morningShowButton.innerHTML = `
      Morning Show<br>
      Movie: ${values.movie}<br>
      Normal Rate: ${values.normalRate}<br>
      Executive Rate: ${values.executiveRate}<br>
      Premium Rate: ${values.premiumRate}
    `;
    setMorningShow(values);
  };

  const handleAfternoonModalCancel = () => {
    setIsAfternoonModalVisible(false);
  };

  const handleAfternoonModalSubmit = (values) => {
    console.log("Afternoon modal form submitted:", values);
    setIsAfternoonModalVisible(false);

    // Update the afternoon show button column with the submitted values
    const afternoonShowButton = document.querySelector("#afternoon-show-button");
    afternoonShowButton.innerHTML = `
      Afternoon Show<br>
      Movie: ${values.movie}<br>
      Normal Rate: ${values.normalRate}<br>
      Executive Rate: ${values.executiveRate}<br>
      Premium Rate: ${values.premiumRate}
    `;
    setAfternoonShow(values);
  };

  const handleEveningModalCancel = () => {
    setIsEveningModalVisible(false);
  };

  const handleEveningModalSubmit = (values) => {
    console.log("Evening modal form submitted:", values);
    setIsEveningModalVisible(false);

    // Update the evening show button column with the submitted values
    const eveningShowButton = document.querySelector("#evening-show-button");
    eveningShowButton.innerHTML = `
      Evening Show<br>
      Movie: ${values.movie}<br>
      Normal Rate: ${values.normalRate}<br>
      Executive Rate: ${values.executiveRate}<br>
      Premium Rate: ${values.premiumRate}
    `;
    setEveningShow(values);
  };

  const handleNightModalCancel = () => {
    setIsNightModalVisible(false);
  };

  const handleNightModalSubmit = (values) => {
    console.log("Night modal form submitted:", values);
    setIsNightModalVisible(false);

    // Update the night show button column with the submitted values
    const nightShowButton = document.querySelector("#night-show-button");
    nightShowButton.innerHTML = `
      Night Show<br>
      Movie: ${values.movie}<br>
      Normal Rate: ${values.normalRate}<br>
      Executive Rate: ${values.executiveRate}<br>
      Premium Rate: ${values.premiumRate}
    `;
    setNightShow(values);
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
                {screens.map((screen) => (
                  <Select.Option key={screen.id} value={screen.id}>
                    {screen.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <ButtonContainer>
              <Button type="primary" htmlType="submit">
                SHOWS
              </Button>
            </ButtonContainer>
          </Form>
        </Box>
      )}
      {showTimeTable && (
        <>
          <h2>Time Table</h2>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <ShowButton
                id="morning-show-button"
                onClick={() => handleShowButtonClick("morning")}
                selected={selectedShow === "morning"}
              >
                Morning Show
              </ShowButton>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <ShowButton
                id="afternoon-show-button"
                onClick={() => handleShowButtonClick("afternoon")}
                selected={selectedShow === "afternoon"}
              >
                Afternoon Show
              </ShowButton>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <ShowButton
                id="evening-show-button"
                onClick={() => handleShowButtonClick("evening")}
                selected={selectedShow === "evening"}
              >
                Evening Show
              </ShowButton>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <ShowButton
                id="night-show-button"
                onClick={() => handleShowButtonClick("night")}
                selected={selectedShow === "night"}
              >
                Night Show
              </ShowButton>
            </Col>
          </Row>
          <ButtonContainer>
            <Button type="primary" htmlType="submit" onClick={() => handleTimeTableSubmit()}>
              ADD TIMETABLE
            </Button>
          </ButtonContainer>
          <Modal
            title="Add Morning Show"
            visible={isModalVisible}
            onCancel={handleModalCancel}
            footer={[
              <Button key="cancel" onClick={handleModalCancel}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={form.submit}>
                Submit
              </Button>,
            ]}
          >
            <Form form={form} onFinish={handleModalSubmit}>
              <Form.Item name="movie" label="Movie" rules={[{ required: true }]}>
                <Select style={{ width: "100%" }}>
                  {movies.map((movie) => (
                    <Select.Option key={movie.name} value={movie.name}>
                      {movie.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="normalRate"
                label="Normal Rate"
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name="executiveRate"
                label="Executive Rate"
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name="premiumRate"
                label="Premium Rate"
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            title="Add Afternoon Show"
            visible={isAfternoonModalVisible}
            onCancel={handleAfternoonModalCancel}
            footer={[
              <Button key="cancel" onClick={handleAfternoonModalCancel}>
                Cancel
              </Button>,
              <Button
                key="submit"
                type="primary"
                onClick={form.submit}
              >
                Submit
              </Button>,
            ]}
          >
            <Form form={form} onFinish={handleAfternoonModalSubmit}>
              <Form.Item name="movie" label="Movie" rules={[{ required: true }]}>
                <Select style={{ width: "100%" }}>
                  {movies.map((movie) => (
                    <Select.Option key={movie.name} value={movie.name}>
                      {movie.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="normalRate"
                label="Normal Rate"
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name="executiveRate"
                label="Executive Rate"
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name="premiumRate"
                label="Premium Rate"
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            title="Add Evening Show"
            visible={isEveningModalVisible}
            onCancel={handleEveningModalCancel}
            footer={[
              <Button key="cancel" onClick={handleEveningModalCancel}>
                Cancel
              </Button>,
              <Button
                key="submit"
                type="primary"
                onClick={form.submit}
              >
                Submit
              </Button>,
            ]}
          >
            <Form form={form} onFinish={handleEveningModalSubmit}>
              <Form.Item name="movie" label="Movie" rules={[{ required: true }]}>
                <Select style={{ width: "100%" }}>
                  {movies.map((movie) => (
                    <Select.Option key={movie.name} value={movie.name}>
                      {movie.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="normalRate"
                label="Normal Rate"
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name="executiveRate"
                label="Executive Rate"
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name="premiumRate"
                label="Premium Rate"
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            title="Add Night Show"
            visible={isNightModalVisible}
            onCancel={handleNightModalCancel}
            footer={[
              <Button key="cancel" onClick={handleNightModalCancel}>
                Cancel
              </Button>,
              <Button
                key="submit"
                type="primary"
                onClick={form.submit}
              >
                Submit
              </Button>,
            ]}
          >
            <Form form={form} onFinish={handleNightModalSubmit}>
              <Form.Item name="movie" label="Movie" rules={[{ required: true }]}>
                <Select style={{ width: "100%" }}>
                  {movies.map((movie) => (
                    <Select.Option key={movie.name} value={movie.name}>
                      {movie.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="normalRate"
                label="Normal Rate"
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name="executiveRate"
                label="Executive Rate"
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name="premiumRate"
                label="Premium Rate"
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Form>
          </Modal>
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
