import {Link,useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import{Row , Col,ListGroup,Image,Button} from 'react-bootstrap';
//import { TbMapPinCancel } from "react-icons/tb";
import { TbArrowBadgeLeft } from "react-icons/tb";
import Message from '../components/Message';
import { useEffect,useState } from 'react';
import Loader from '../components/Loader';
import { FaTrash } from 'react-icons/fa';
import { removefromRecentTrip } from '../slices/recentTripSlice';
import { GiConfirmed } from "react-icons/gi";
import TripSteps from '../components/TripSteps';

const RecentTripsScreen = () => {

  const navigate=useNavigate();  
  const dispatch=useDispatch();

  const [showContent,setShowContent]=useState(false);
  
  useEffect(()=>{
    const timer=setTimeout(()=>{
      setShowContent(true);
    },1500);

    return()=>clearTimeout(timer);
  },[]);


  const recentTrip=useSelector((state)=>state.recentTrip);
  const {recentTrips}=recentTrip;

  const removefromRecentTripHandler=async(id)=>{
    dispatch(removefromRecentTrip(id));
  }

  const getColorBasedOnSustainability = (carbonIndex) => {
    if (carbonIndex < 15) {
      return 'greenyellow';
    } else if (carbonIndex < 50) {
      return 'lightgreen';
    } else if (carbonIndex < 100) {
      return 'lightsalmon'; 
    } else {
      return 'lightcoral';
    }
  };

  const proofHandler=(tripId)=>{
    navigate(`/login?redirect=/confirm-trip/${tripId}`);
  }
  return (
    <>
      {!showContent?(
        <Loader/>
      ):(
        <>
        <img alt='' id="background-container"></img>
        <Row>
          <Col md={12}>
            <Link className="prev-page" to='/'><TbArrowBadgeLeft  id="arrow-icon"/> Go Back</Link>
            <TripSteps step1 step2 step3/>
            <h1 className='screen-head'>Your Recent trips</h1>
            {recentTrips.length===0?(
              <Message>
                You have no recent trips. Please Go Back and choose your trip
              </Message>
            ):(
              <ListGroup>
                {recentTrips.map((item)=>(
                  <ListGroup.Item id='recent-trip-container' key={item._id}>
                    <Image src={item.IMAGES} alt={item.APPS} id='trips-img' fluid rounded/>
                    <Button type='button' variant='light' id='rem-trip' onClick={()=>removefromRecentTripHandler(item._id)}><FaTrash/></Button>
                    <Row  id='recent-trip-row'>
                      <Col className='trip-name'>
                        <Link to={`/transport/${item._id}`}><h3 id='trips-app'>{item.APPS}</h3></Link>
                        Transport Type:
                        <h5 id='recent-mode'>{item.MODE_OF_TRANSPORT}</h5>
                      </Col>
                      <Col className='trip-details'>
                        Booking Details<br/>
                        <h4>Date:</h4><h5>{item.bookDate}</h5>
                        <h4>Time:</h4><h5>{item.bookTime}</h5>
                      </Col>
                      <Col className='trip-details'>
                        Trip Tariff:<br/>
                        <h4>Distance:</h4><h5>{item.tripDistance}  KMs</h5>
                        <h4>Travel Fee:</h4><h5>Rs. {(item.tripDistance*item.COST_PER_KM).toFixed(0)}</h5>
                      </Col>
                      <Col className='trip-details'>
                        <h4>Sustainability:</h4>
                        <h5 style={{ backgroundColor: getColorBasedOnSustainability(item.CARBON_INDEX_PER_KM) }}>
                          {item.CARBON_INDEX_PER_KM < 15 && (
                            <>
                              Very good
                              <h6>Congratulations! You've chosen a very sustainable mode of transportation.</h6>
                            </>
                          )}
                          {item.CARBON_INDEX_PER_KM >= 15 && item.CARBON_INDEX_PER_KM < 50 && (
                            <>
                              Good
                              <h6>Well done! Your transportation choice is environmentally friendly.</h6>
                            </>
                          )}
                          {item.CARBON_INDEX_PER_KM >= 50 && item.CARBON_INDEX_PER_KM < 100 && (
                            <>
                              Bad
                              <h6>Consider alternative eco-friendly options for a more sustainable choice.</h6>
                            </>
                          )}
                          {item.CARBON_INDEX_PER_KM >= 100 && (
                            <>
                              Very bad
                              <h6>Your transport has a significant environmental impact.Consider greener alternatives.</h6>
                            </>
                          )}
                        </h5>
                      </Col>
                      <Col className='trip-details'>
                        <h4>Emmision:</h4><h5>You Saved<br/><h6>{((200-item.CARBON_INDEX_PER_KM)*item.tripDistance).toFixed(0)} g</h6>CO2 emmision</h5>
                      </Col>
                      <Col className='trip-details'>
                        <h4>Points:</h4><h5><h6>{item.REWARD_POINTS} pts</h6>after we verify your ride</h5>
                        <Button type='button' id='upload-proof' onClick={() => proofHandler(item._id)}><GiConfirmed/><br/>Confirm Trip<br/></Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  
                ))}
              </ListGroup>
            )}
          </Col>
        </Row>
      </>
      )}
      </>
  )
}

export default RecentTripsScreen;
