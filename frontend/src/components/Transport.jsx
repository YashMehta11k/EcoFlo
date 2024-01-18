import {Card} from 'react-bootstrap';
import React from 'react'

const Transport = ({transport}) => {
  return (
    <Card>
        <Card.Body>
          <a href={`/transport/${transport.APPS}`}>
            <Card.Title as="div">
              <Card.Img src={transport.IMAGES} variant='left'/>
              <h1>{transport.APPS}</h1>
              <a href={transport.LINK}><h3 className="book-button">Book Service</h3></a>   
              <h3 className="contact-details">Contact:<br/>{transport.CONTACT_NUMBER}</h3>     
            </Card.Title>
          </a>
          <h2>{transport.MODE_OF_TRANSPORT}</h2>
          <Card.Text as="div">
              <h3>₹{transport.COST_PER_KM}</h3>
              <h3>{transport.AVG_SPEED}</h3>
              <h3>{transport.NUMBER_OF_SEATS} seats</h3>
              <h3>{transport.REWARD_POINTS} points</h3>
          </Card.Text>
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
