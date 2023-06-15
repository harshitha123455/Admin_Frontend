import React, { useState } from 'react';
import styled from 'styled-components';
import App from './App';
import { useNavigate } from 'react-router-dom';

import AdminService from './services/admin-services';


function Login({ history }) {

  const navigate = useNavigate();
  const adminService = new AdminService();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleLogin = async () => {

    // Authenticating the admin
    if (await adminService.authenticate(email, password)) {
        setIsLoggedIn(true);
        navigate('/dashboard');
      } else {
        setLoginError(true);
      }
    };

  return (
    <MainContainer>
      <Box>
        <WelcomeText>Welcome</WelcomeText>
        {loginError && <ErrorMessage>Invalid email or password</ErrorMessage>}
        <InputContainer>
          <TransparentInput
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TransparentInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputContainer>
        <ButtonContainer>
          <LoginButton onClick={handleLogin}>Login</LoginButton>
        </ButtonContainer>
      </Box>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Box = styled.div`
  background-color: rgba(255, 255, 255, 0.5); /* Transparent white background */
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const WelcomeText = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const TransparentInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  width: 300px;
  border: none;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.05);
  text-align: center;
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-bottom: 10px;
`;

export default Login;
