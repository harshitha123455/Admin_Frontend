import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import styled from "styled-components";
import AdminService from "../services/admin-services";

const PaymentForm = () => {
  const adminService = new AdminService();
  const [paymentData, setPaymentData] = useState([]);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const data = await adminService.getAllPayment();
        setPaymentData(data);
      } catch (error) {
        console.log(error);
        // Handle error
      }
    };

    fetchPaymentData();
  }, []);

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  return (
    <FormContainer>
      <TopText>PAYMENT</TopText>
      <Table columns={columns} dataSource={paymentData} />
    </FormContainer>
  );
};

const TopText = styled.h1`
  font-size: 30px;
  margin-top: 20px;
  margin-left: 50px;
  margin-right: 1280px;
  color: #32a6f3; /* Set the desired font color */
  text-align: center; /* Center-align the text */
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default PaymentForm;
