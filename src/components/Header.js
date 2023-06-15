import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: rgba(0, 0, 0, 0.5);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
`;

const LogoutButton = styled.button`
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  margin-right: 30px;
  margin-left: 1290px;
  cursor: pointer;
`;

const Header = ({ onLogout }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout functionality
    localStorage.removeItem('token');
    navigate('/login');
    // You can call the onLogout prop or any logout function you have implemented
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <HeaderContainer>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </HeaderContainer>
  );
};

export default Header;
