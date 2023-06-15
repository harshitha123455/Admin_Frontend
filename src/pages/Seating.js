import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';

const SeatingArrangement = () => {
  const [seatingArrangement, setSeatingArrangement] = useState(null);

  useEffect(() => {
    // Fetch seating arrangement data from the backend
    const fetchSeatingArrangement = async () => {
      try {
        // Make an API request to fetch seating arrangement data
        const response = await fetch('/api/seating-arrangement');
        const data = await response.json();
        setSeatingArrangement(data);
      } catch (error) {
        console.error('Error fetching seating arrangement:', error);
      }
    };

    fetchSeatingArrangement();
  }, []);

  const handleFormSubmit = (values) => {
    // Handle form submission to update seating arrangement
    // Make an API request to update the seating arrangement data
    fetch('/api/seating-arrangement', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response accordingly
        message.success('Seating arrangement updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating seating arrangement:', error);
        message.error('Failed to update seating arrangement.');
      });
  };

  if (!seatingArrangement) {
    // Show a loading state or placeholder while data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Seating Arrangement</h2>
      <Form onFinish={handleFormSubmit} initialValues={seatingArrangement}>
        <Form.Item name="totalSeats" label="Total Seats" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="availableSeats" label="Available Seats" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="availableNormalSeats"
          label="Available Normal Seats"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="availablePremiumSeats"
          label="Available Premium Seats"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="availableExecutiveSeats"
          label="Available Executive Seats"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Seating Arrangement
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SeatingArrangement;
