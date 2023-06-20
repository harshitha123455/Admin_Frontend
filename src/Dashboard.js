import React, { useState } from 'react';
import "./App.css";
import styled from 'styled-components';
import Header from './components/Header';
import { Card} from 'antd';
import { Link } from 'react-router-dom';
import { BiMovie, BiFilm, BiTimeFive, BiShow, BiMoney, BiTable, BiCalendar, BiCreditCard, BiDesktop } from 'react-icons/bi';
import { DownOutlined, UserOutlined, PlusCircleOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message } from 'antd';
import { keyframes } from 'styled-components';

const Dashboard = () => {
  const [showMoviesDropdown, setShowMoviesDropdown] = useState(false);
  const [showScreensDropdown, setShowScreensDropdown] = useState(false);
  const [showTimetableDropdown, setShowTimetableDropdown] = useState(false);
  const [showShowsDropdown, setShowShowsDropdown] = useState(false);
  const [showPaymentsDropdown, setShowPaymentsDropdown] = useState(false);
  const [isHeadingVisible, setIsHeadingVisible] = useState(false);


  const toggleMoviesDropdown = () => {
    setShowMoviesDropdown(!showMoviesDropdown);
  };
  const toggleScreensDropdown = () => {
    setShowScreensDropdown(!showScreensDropdown);
  };
  const toggleTimetableDropdown = () => {
    setShowTimetableDropdown(!showTimetableDropdown);
  };
  const toggleShowsDropdown = () => {
    setShowShowsDropdown(!showShowsDropdown);
  };
  const togglePaymentsDropdown = () => {
    setShowPaymentsDropdown(!showPaymentsDropdown);
  };
  
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

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const AnimatedHeading = styled.h1`
  font-weight: bold;
  text-align: center;
  font-family: YourChosenFont, sans-serif;
  color: lightblue;
  font-size: 55px;
  margin-top: 0px;
  margin-bottom: 400px;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  animation: ${fadeIn} 1s ease-in forwards;
`;
const AnimatedCard = styled(Card)`
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const DropdownMenu = styled(Menu)`
  padding-left: 20px;
`;
const handleMenuClick = (e) => {
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
    <Menu.Item key="3" icon={<PlusCircleOutlined />}>
      <Link to="/AddHighlightMovies">ADD HIGHLIGHT MOVIES</Link>
    </Menu.Item>
    <Menu.Item key="3" icon={<PlusCircleOutlined />}>
      <Link to="/ViewHighlightMovies">VIEW HIGHLIGHT MOVIES</Link>
    </Menu.Item>
  </DropdownMenu>
);
const screensMenu = (
  <DropdownMenu onClick={handleMenuClick}>
    <Menu.Item key="1" icon={<PlusCircleOutlined />}>
      <Link to="/screens">ADD SCREENS</Link>
    </Menu.Item>
    <Menu.Item key="2" icon={<EyeOutlined />}>
      <Link to="/ViewScreens">VIEW SCREENS</Link>
    </Menu.Item>
    <Menu.Item key="3" icon={<EditOutlined />}>
      <Link to="/UpdateScreens">UPDATE SCREENS</Link>
    </Menu.Item>
  </DropdownMenu>
);
const timetableMenu = (
  <DropdownMenu onClick={handleMenuClick}>
    <Menu.Item key="1" icon={<PlusCircleOutlined />}>
      <Link to="/TimeTable">ADD TIMETABLE</Link>
    </Menu.Item>
    <Menu.Item key="2" icon={<EyeOutlined />}>
      <Link to="/ViewTimeTable">VIEW TIMETABLE</Link>
    </Menu.Item>
  </DropdownMenu>
);
const showsMenu = (
  <DropdownMenu onClick={handleMenuClick}>
    <Menu.Item key="1" icon={<UserOutlined />}>
      <Link to="/ViewShows">VIEW SHOWS</Link>
    </Menu.Item>
    <Menu.Item key="2" icon={<UserOutlined />}>
      <Link to="/ViewBookings">VIEW BOOKINGS</Link>
    </Menu.Item>
  </DropdownMenu>
);
const paymentsMenu = (
  <Menu.Item key="1" icon={<UserOutlined />}>
    <Link to="/Payment">PAYMENT</Link>
  </Menu.Item>
);

  return (
    <div>
      <Header width="1000px">
      </Header>
      <div style={{ position: 'relative' }}>
        <h1 
        style={{ fontWeight: 'bold', textAlign: 'center', fontFamily: 'YourChosenFont, sans-serif', color: "lightblue", fontSize: '55px', marginTop: "0px", marginBottom: '400px' }}>
          <AnimatedHeading isVisible={isHeadingVisible}>
          WELCOME TO ADMIN DASHBOARD
          </AnimatedHeading>
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', position: 'absolute', top: '300%', left: '50%',right: '30%', transform: 'translate(-50%, -50%)' }}>
          <AnimatedCard style={{ width: '300px' , marginRight: "600px" , backgroundColor: 'rgba(160, 72, 236, 0.52)' }}>
            <ButtonWithDropdown onClick={toggleMoviesDropdown} icon={<BiMovie />} size="large" style={{ backgroundColor: '#5610757D', color: '#fff' }}>
              MOVIES <DownOutlined />
            </ButtonWithDropdown>
            {showMoviesDropdown && (
              <Dropdown overlay={moviesMenu} trigger={['click']} visible={showMoviesDropdown}>
                <div />
              </Dropdown>
            )}
          </AnimatedCard>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', position: 'absolute', top: '300%', left: '83%',right: '30%', transform: 'translate(-50%, -50%)' }}>
          <AnimatedCard style={{ width: '300px' , marginRight: "600px", backgroundColor: 'rgba(252, 88, 152, 0.42)' }}>
          <ButtonWithDropdown onClick={toggleScreensDropdown} icon={<BiDesktop />} size="large" style={{ backgroundColor: '#5610757D', color: '#fff' }}>
          SCREENS <DownOutlined />
        </ButtonWithDropdown>
        {showScreensDropdown && (
          <Dropdown overlay={screensMenu} trigger={['click']} visible={showScreensDropdown}>
            <div />
          </Dropdown>
        )}
          </AnimatedCard>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', position: 'absolute', top: '300%', left: '115%',right: '30%', transform: 'translate(-50%, -50%)' }}>
          <AnimatedCard style={{ width: '300px' , marginRight: "600px" , backgroundColor: 'rgba(105, 186, 246, 0.42)'}}>
          <ButtonWithDropdown onClick={toggleTimetableDropdown} icon={<BiCalendar />} size="large" style={{ backgroundColor: '#5610757D', color: '#fff' }}>
          TIMETABLE <DownOutlined />
        </ButtonWithDropdown>
        {showTimetableDropdown && (
          <Dropdown overlay={timetableMenu} trigger={['click']} visible={showTimetableDropdown}>
            <div />
          </Dropdown>
        )}
          </AnimatedCard>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', position: 'absolute', top: '600%', left: '65%',right: '90%', transform: 'translate(-50%, -50%)' }}>
          <AnimatedCard style={{ width: '300px' , marginRight: "600px" , backgroundColor : 'rgba(246, 83, 40, 0.59)'}}>
          <ButtonWithDropdown onClick={toggleShowsDropdown} icon={<BiTable />} size="large" style={{ backgroundColor: '#5610757D', color: '#fff' }}>
          SHOWS <DownOutlined />
        </ButtonWithDropdown>
        {showShowsDropdown && (
          <Dropdown overlay={showsMenu} trigger={['click']} visible={showShowsDropdown}>
            <div />
          </Dropdown>
        )}
          </AnimatedCard>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', position: 'absolute', top: '600%', left: '105%',right: '90%', transform: 'translate(-50%, -50%)' }}>
          <AnimatedCard style={{ width: '300px' , marginRight: "600px" , backgroundColor: 'rgba(250, 31, 31, 0.41)' }}>
          <Button icon={<BiCreditCard />} size="large" style={{ backgroundColor: '#5610757D', color: '#fff' }}>
          <Link to="/Payment">PAYMENTS</Link>
        </Button>
          </AnimatedCard>
    </div>
    </div>
    </div>
  );
            }   

export default Dashboard;
