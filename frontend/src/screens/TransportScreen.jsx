import { useParams } from "react-router-dom";
import React from 'react';
import {Link} from 'react-router-dom';
import {Row,Col,Image,ListGroup,Card,Button, ListGroupItem} from 'react-bootstrap';
import transports from "../transports";
import Rating from '../components/Rating';
import { TbArrowBadgeLeft } from "react-icons/tb";

const TransportScreen = () => {
  const{id: transportId }=useParams();  
  const transport=transports.find((p)=>p.APPS===transportId);
  
  return<>
    <Link className="prev-page" to='/'>
      <TbArrowBadgeLeft  id="arrow-icon"/> Go Back
    </Link>
    <Row id="Transport-desc">
        <Col md={5}>
            <Image src={transport.IMAGES} alt={transport.APPS} fluid />  
        </Col>
        <Col md={4}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h3>{transport.APPS}</h3>
              <Rating value={transport.RATINGS} text={`${transport.NUM_REVIEWS} reviews`}/>
            </ListGroupItem>
            
            <ListGroupItem>
                <b>MODE:</b>{transport.MODE_OF_TRANSPORT}<br/>
                <b>PRICE/KM:</b>₹{transport.COST_PER_KM}<br/>
                <b>SPEED:</b>{transport.AVG_SPEED}km/h<br/>
                <b>CO2 EMMISION:</b>{transport.CARBON_INDEX_PER_KM}g/km<br/>
                <b>HELPLINE:</b>{transport.CONTACT_NUMBER}<br/>
                <b>SEATS:</b>{transport.NUMBER_OF_SEATS}<br/>
                <b>RAIN COMPATIBLE:</b>{transport.WEATHER===1?"Yes":"No"}<br/>
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card id="transport-confirm">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col><strong>${transport.COST_PER_KM}</strong></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Time Taken:</Col>
                  <Col><strong>Distance/speed</strong></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Points you recieve:</Col>
                  <Col><strong>{transport.REWARD_POINTS}<br/>after the proof uploaded is scanned by us</strong></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Sustainability:</Col>
                  <Col><strong>{transport.CARBON_INDEX_PER_KM<=50?'Yes, it is very environmental friendly, we prefer you to use this transport':'No, it pollutes out environment ,we prefer you to not use this transport'}</strong></Col>
                </Row>
              </ListGroup.Item>
              
              <Button id="confirm-transport" type="button">Comfirm Ride</Button>
              
            </ListGroup>
          </Card>
        </Col>

    </Row>
  </>
      
}

export default TransportScreen
