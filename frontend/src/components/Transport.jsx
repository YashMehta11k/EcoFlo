import {Card} from 'react-bootstrap';
import React from 'react';
import {Link} from 'react-router-dom';
import Rating from './Rating';

const Transport = ({transport}) => {
  return (
    <Card>
        <Card.Body>
          <Link to={`/transport/${transport.APPS}`}>
            <Card.Title as="div">
              <Card.Img src={transport.IMAGES} variant='left'/>
              <h1>{transport.APPS}</h1>  
            </Card.Title>
          </Link>
          <h2>{transport.MODE_OF_TRANSPORT}</h2>
          <Rating value={transport.RATINGS} text={`${transport.NUM_REVIEWS} reviews` } />
          <Card.Text as="div">
              <h3>₹{transport.COST_PER_KM}</h3>
              <h3>{transport.AVG_SPEED}</h3>
              <h3>{transport.NUMBER_OF_SEATS} seats</h3>
              <h3>{transport.REWARD_POINTS} points</h3>
          </Card.Text>
          <Link to={transport.LINK}><h3 id="book-button">Book Service</h3></Link>
          <Link to="/"><h3 id="confirm-button">Confirm Ride</h3></Link>      
          <h3 className="contact-details">Contact: {transport.CONTACT_NUMBER}</h3>   
          <div className='emmision-saved'>
            <p>You save</p>
            <h1>{transport.CARBON_INDEX_PER_KM}g CO2</h1>
            <p>in this Ride</p>
          </div>
        </Card.Body>
    </Card>
  )
}

export default Transport
