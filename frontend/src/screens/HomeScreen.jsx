import { Row, Col, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Transport from '../components/Transport';
import { useGetTransportsQuery } from '../slices/transportsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';
import SearchBox from '../components/SearchBox';

import {toast} from 'react-toastify';

const HomeScreen = () => {
  const { keyword } = useParams();
  const { data: transports, isLoading, error } = useGetTransportsQuery({ keyword });
  const locData = JSON.parse(localStorage.getItem('locData'));
  const [showContent, setShowContent] = useState(false);
  const [weatherCompatible, setWeatherCompatible] = useState(false);
  const [singleTravellor, setSingleTraveller] = useState(false);
  const [family, setFamily] = useState(false);
  const [electric, setElectric] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [origin, setOrigin] = useState(locData?locData.origin:'');
  const [destination, setDestination] = useState(locData?locData.destination:'');
  var [distance, setDistance] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 750);

    return () => clearTimeout(timer);
  }, []);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/distance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ origin, destination })
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch distance.');
      }
  
      const data = await response.json();
      const distanceText = data.rows[0].elements[0].distance.text;
      distance = parseFloat(distanceText.replace(' km', ''));
  
      // Update the state or local storage with origin, destination, and distance
      setOrigin(origin);
      setDestination(destination);
      setDistance(distance);

      const existingData=JSON.parse(localStorage.getItem('locData'))||{};
      const newData={origin,destination,distance};
      localStorage.setItem('locData',JSON.stringify({...existingData, ...newData}));
      
      toast.success("Location entered successfully!");
    } catch (error) {
      console.error('Error:', error.message);
      toast.error("There was an issue entering your location.");
    }
  };
  

  const filteredTransports = transports?.filter((transport) => {
    if (weatherCompatible && !transport.WEATHER) {
      return false;
    } else if (singleTravellor && transport.NUMBER_OF_SEATS > 2) {
      return false;
    } else if (family && transport.NUMBER_OF_SEATS <= 2) {
      return false;
    } else if (electric && !transport.GREEN_POWER) {
      return false;
    }
    return true;
  });

  if (sortBy === 'cost') {
    filteredTransports.sort((a, b) => a.COST_PER_KM - b.COST_PER_KM);
  } else if (sortBy === 'emission') {
    filteredTransports.sort((a, b) => a.CARBON_INDEX_PER_KM - b.CARBON_INDEX_PER_KM);
  } else if (sortBy === 'points') {
    filteredTransports.sort((a, b) => b.REWARD_POINTS - a.REWARD_POINTS);
  } else if (sortBy === 'speed') {
    filteredTransports.sort((a, b) => b.AVG_SPEED - a.AVG_SPEED);
  } else if (sortBy === 'rating') {
    filteredTransports.sort((a, b) => b.RATINGS - a.RATINGS);
  }

  return (
    <>
      {isLoading || !showContent ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.data?.message || error.error}</Message>
      ) : (
        <>
          <h1 className="screen-head" style={{ width: "50%", marginLeft: "9rem", fontSize: "2.35rem" }}>Sustainable transports on your way</h1>
          <SearchBox />
          <Form onSubmit={handleSubmit}>
            <Row style={{display:"flex",flexDirection:"row",justifyContent:"flex-start",marginTop:"-1rem",marginBottom:"1.5rem"}}>
              <Col>
                <Form.Group controlId='origin'>
                  <Form.Label style={{fontFamily:"Bebas Neue",color:"teal",fontSize:"1.25rem"}}>Origin</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter origin'
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    style={{width:"75%",fontFamily:"Kanit"}}
                  />
                </Form.Group>
              </Col>
              <Col style={{marginLeft:"-6rem"}}>
                <Form.Group controlId='destination'>
                  <Form.Label style={{fontFamily:"Bebas Neue",color:"teal",fontSize:"1.25rem"}}>Destination</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter destination'
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    style={{width:"75%",fontFamily:"Kanit"}}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Button type='submit' id='add-loc'>Add Location</Button>
              </Col>
            </Row>
          </Form>
          <Row>
            {filteredTransports.map((transport) => (
              <Col key={transport._id} sm={5} md={5} lg={5} xl={5}>
                <Transport transport={transport} />
              </Col>
            ))}
            <Col className='filter-box'>
              <h2 style={{ fontFamily: "Monoton", color: "blue" }}>Filters</h2>
              <Form.Group className='filter-option'>
                <Form.Label><strong style={{ color: "black" }}>Sort By:</strong></Form.Label>
                <Form.Control as="select" value={sortBy} onChange={handleSortChange} >
                  <option value="">Select</option>
                  <option value="cost">Cheapest</option>
                  <option value="emission">Least Emission</option>
                  <option value="points">Most Points</option>
                  <option value="speed">Fastest</option>
                  <option value="rating">Highest Ratings</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className='filter-option'>
                <Form.Check
                  type="checkbox"
                  label="Rain Compatible"
                  checked={weatherCompatible}
                  onChange={(e) => setWeatherCompatible(e.target.checked)}
                />
              </Form.Group>
              <Form.Group className='filter-option'>
                <Form.Check
                  type="checkbox"
                  label="Single traveller"
                  checked={singleTravellor}
                  onChange={(e) => setSingleTraveller(e.target.checked)}
                />
              </Form.Group >
              <Form.Group className='filter-option'>
                <Form.Check
                  type="checkbox"
                  label="Family"
                  checked={family}
                  onChange={(e) => setFamily(e.target.checked)}
                />
              </Form.Group>
              <Form.Group className='filter-option'>
                <Form.Check
                  type="checkbox"
                  label="Electric"
                  checked={electric}
                  onChange={(e) => setElectric(e.target.checked)}
                />
              </Form.Group>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
