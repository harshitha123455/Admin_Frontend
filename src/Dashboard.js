import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BiMovie, BiFilm, BiTimeFive, BiShow, BiMoney, BiTable, BiCalendar, BiCreditCard, BiDesktop } from 'react-icons/bi';
import { DownOutlined, UserOutlined , PlusCircleOutlined , DeleteOutlined , EditOutlined , EyeOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message } from 'antd';
import Header from './components/Header';
import LogoImage from './images/Logo.png';
import ViewMovies from './pages/ViewMovies';

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: transparent black;
  margin-right: 1285px;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: rgba(0, 0, 0, 0.5); /* Black color with opacity */
  color: #fff;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  backdrop-filter: blur(10px); /* Apply blur effect */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3); /* Apply box shadow effect */
`;

const LogoContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  padding: 20px;
`;

const Logo = styled.img`
  width: 200%; /* Make the logo occupy the entire width of the container */
  height: 260%; /* Make the logo occupy the entire height of the container */
`;

const ButtonWithDropdown = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  margin-bottom: 30px;

  && {
    color: #000;
    font-weight: bold;
    font-size: 16px; /* Adjust the font size as needed */
  }
`;


const DropdownMenu = styled(Menu)`
  padding-left: 20px;
`;

function Dashboard() {
  const [showMoviesDropdown, setShowMoviesDropdown] = useState(false);
  const [showShowsDropdown, setShowShowsDropdown] = useState(false);
  const [showPaymentsDropdown, setShowPaymentsDropdown] = useState(false);
  const [showScreensDropdown, setShowScreensDropdown] = useState(false);
  const [showTimetableDropdown, setShowTimetableDropdown] = useState(false);

  const toggleMoviesDropdown = () => {
    setShowMoviesDropdown(!showMoviesDropdown);
  };

  const toggleShowsDropdown = () => {
    setShowShowsDropdown(!showShowsDropdown);
  };

  const togglePaymentsDropdown = () => {
    setShowPaymentsDropdown(!showPaymentsDropdown);
  };

  const toggleScreensDropdown = () => {
    setShowScreensDropdown(!showScreensDropdown);
  };

  const toggleTimetableDropdown = () => {
    setShowTimetableDropdown(!showTimetableDropdown);
  };

  const handleButtonClick = (e) => {
    message.info('Click on left button.');
    console.log('click left button', e);
  };

  const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };

  const moviesMenu = (
    <DropdownMenu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<PlusCircleOutlined />}>
        <Link to="/movies">ADD MOVIES</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<EyeOutlined />}>
        <Link to="/ViewMovies">VIEW MOVIES</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<EditOutlined />}>
        <Link to="/UpdateMovies">UPDATE MOVIES</Link>
      </Menu.Item>
    </DropdownMenu>
  );

  const showsMenu = (
    <DropdownMenu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to="/shows">VIEW SHOWS</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        <Link to="/bookings">VIEW BOOKINGS</Link>
      </Menu.Item>
    </DropdownMenu>
  );

  const paymentsMenu = (
    <DropdownMenu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to="/payments">VIEW PAYMENTS</Link>
      </Menu.Item>
    </DropdownMenu>
  );

  const screensMenu = (
    <DropdownMenu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<PlusCircleOutlined />}>
        <Link to="/screens">ADD SCREENS</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<EyeOutlined  />}>
        <Link to="/ViewScreens">VIEW SCREENS</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={< EditOutlined/>}>
        <Link to="/UpdateScreens">UPDATE SCREENS</Link>
      </Menu.Item>
    </DropdownMenu>
  );

  const timetableMenu = (
    <DropdownMenu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={< PlusCircleOutlined/>}>
        <Link to="/TimeTable">ADD TIMETABLE</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<EyeOutlined />}>
        <Link to="/timetable">VIEW TIMETABLE</Link>
      </Menu.Item>
    </DropdownMenu>
  );

  return (
    <Container>
      <Sidebar>
        <LogoContainer>
          <Logo src={LogoImage} alt="Logo" />
        </LogoContainer>
        <ButtonWithDropdown onClick={toggleMoviesDropdown} icon={<BiMovie />} size="large">
          MOVIES <DownOutlined />
        </ButtonWithDropdown>
        {showMoviesDropdown && (
          <Dropdown overlay={moviesMenu} trigger={['click']} visible={showMoviesDropdown}>
            <div />
          </Dropdown>
        )}
        <ButtonWithDropdown onClick={toggleScreensDropdown} icon={<BiDesktop />} size="large">
          SCREENS <DownOutlined />
        </ButtonWithDropdown>
        {showScreensDropdown && (
          <Dropdown overlay={screensMenu} trigger={['click']} visible={showScreensDropdown}>
            <div />
          </Dropdown>
        )}
        
        <ButtonWithDropdown onClick={toggleTimetableDropdown} icon={<BiCalendar />} size="large">
          TIMETABLE <DownOutlined />
        </ButtonWithDropdown>
        {showTimetableDropdown && (
          <Dropdown overlay={timetableMenu} trigger={['click']} visible={showTimetableDropdown}>
            <div />
          </Dropdown>
        )}
        <ButtonWithDropdown onClick={toggleShowsDropdown} icon={<BiTable />} size="large">
          SHOWS <DownOutlined />
        </ButtonWithDropdown>
        {showShowsDropdown && (
          <Dropdown overlay={showsMenu} trigger={['click']} visible={showShowsDropdown}>
            <div />
          </Dropdown>
        )}
        <ButtonWithDropdown onClick={togglePaymentsDropdown} icon={<BiCreditCard />} size="large">
          PAYMENTS <DownOutlined />
        </ButtonWithDropdown>
        {showPaymentsDropdown && (
          <Dropdown overlay={paymentsMenu} trigger={['click']} visible={showPaymentsDropdown}>
            <div />
          </Dropdown>
        )}
        
        
      </Sidebar>
      <Header />
    </Container>
  );
}

export default Dashboard;
