import {Card} from 'react-bootstrap';
import React from 'react';
import {Link} from 'react-router-dom';
import Rating from './Rating';

const Transport = ({transport}) => {
  const locData = JSON.parse(localStorage.getItem('locData'));
  const distance = locData && locData.distance ? locData.distance : null;
  const timeTaken = distance ? (distance / transport.AVG_SPEED * 100).toFixed(0) : null;
  return (
    <Card>
        <Card.Body>
          <Link to={`/transport/${transport._id}`}>
            <Card.Title as="div">
              <Card.Img src={transport.IMAGES} variant='left'/>
              <h1>{transport.APPS}</h1>  
            </Card.Title>
            <h3 id="confirm-button">Choose me to your Destination</h3> 
          </Link>
          <h2>{transport.MODE_OF_TRANSPORT}</h2>
          <Rating value={transport.RATINGS} text={`${transport.NUM_REVIEWS} reviews` } />
          <Card.Text as="div">
              <h3>₹{distance?(transport.COST_PER_KM*distance).toFixed(1):transport.COST_PER_KM} {distance?'':"per/km"}</h3>
              <h3>{distance?timeTaken:transport.AVG_SPEED} {distance?'mins':'km/h'}</h3>
              <h3>{transport.NUMBER_OF_SEATS} seats</h3>
              <h3>{transport.REWARD_POINTS} points</h3>
          </Card.Text>     
          <h3 className="contact-details">Contact: {transport.CONTACT_NUMBER}</h3>   
          <div className='emmision-saved'>
            <p>You save</p>
            <h1>{distance?((100-transport.CARBON_INDEX_PER_KM)*distance).toFixed(0):transport.CARBON_INDEX_PER_KM}g CO2</h1>
            <p>in this Ride</p>
          </div>
        </Card.Body>
    </Card>
  )
}

export default Transport;
