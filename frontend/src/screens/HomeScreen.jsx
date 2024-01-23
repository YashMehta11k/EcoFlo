import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Transport from '../components/Transport';
import transports from '../transports';
import { useParams } from 'react-router-dom';

const HomeScreen = () => {
  
  const { city } = useParams(); // Default city is Bangalore

  return (
    <>
      <h1 id="home-head">Sustainable transports on your way in {city}</h1>
      <Row>
        {transports.map((transport) => (
          <Col key={transport.APPS} sm={5} md={5} lg={5} xl={5}>
            <Transport transport={transport} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen