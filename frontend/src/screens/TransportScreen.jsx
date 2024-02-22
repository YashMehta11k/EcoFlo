import { useParams,useNavigate} from "react-router-dom";
import {useState,useEffect} from "react";
import React from 'react';
import {Link} from 'react-router-dom';
import {Row,Col,Image,ListGroup,Card,Button, ListGroupItem,Form} from 'react-bootstrap';
import { useDispatch ,useSelector} from "react-redux";
//import axios from 'axios';
import Rating from '../components/Rating';
import { TbArrowBadgeLeft } from "react-icons/tb";
import { useGetTransportDetailsQuery,useCreateReviewMutation} from "../slices/transportsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addtoRecentTrip } from "../slices/recentTripSlice";
import TripSteps from "../components/TripSteps";
import {toast} from 'react-toastify';

const TransportScreen = () => {

  const [confirmationMade, setConfirmationMade] = useState(false);
  const [showContent,setShowContent]=useState(false);
  const [rating,setRating]=useState(0);
  const [comment,setComment]=useState('');
  const locData = JSON.parse(localStorage.getItem('locData'));
  const{userInfo}=useSelector((state)=>state.auth);   
  const distance=4;

    useEffect(()=>{
    const timer=setTimeout(()=>{
      setShowContent(true);
    },2500);
    return()=>clearTimeout(timer);
    },[]);

    useEffect(()=>{
      if(showContent){
        window.scrollTo(0,0);
      }
    },[showContent])

  const{id: transportId }=useParams();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const handleConfirmRide = () => {
    setConfirmationMade(true);
  };
  
  const {data:transport,isLoading,refetch,error}=useGetTransportDetailsQuery(transportId);

  const [createReview,{isLoading:isReviewLoading}]=useCreateReviewMutation();

  const addtoRecentTripHandler=()=>{
    dispatch(addtoRecentTrip({...transport,distance,user: userInfo._id}));
    navigate("/trips");
  };

  const submitReviewHandler=async(e)=>{
    e.preventDefault();
    try {
      await createReview({
        transportId,
        rating,
        comment
      }).unwrap();
      refetch();
      toast.success("Review Submitted");
      setRating(0);
      setComment('');
    } catch (error) {
      toast.error(error?.data?.message);
    }
  }
  
  return(
  <>
    <Link className="prev-page" to='/'><TbArrowBadgeLeft  id="arrow-icon"/> Go Back</Link>
    <TripSteps step1 step2/>

    {isLoading||!showContent?(
      <Loader/>
    ):error?(
      <Message variant='danger'>{error?.data?.message || error.error}</Message>
    ):(
      <>
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
          {!confirmationMade &&(
            <Card id="transport-confirm">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col><strong>₹{locData?(transport.COST_PER_KM*locData.distance).toFixed(0):transport.COST_PER_KM}</strong></Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Time Taken:</Col>
                    <Col><strong>{locData && (locData.distance/transport.AVG_SPEED*100).toFixed(0)} mins</strong></Col>
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
                    <Col>Distance</Col>
                    <Col>{locData?locData.distance:distance} Kms</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Sustainability:</Col>
                    <Col><strong>{transport.CARBON_INDEX_PER_KM<=50?'Yes, it is very environmental friendly, we prefer you to use this transport':'No, it pollutes out environment ,we prefer you to not use this transport'}</strong></Col>
                  </Row>
                </ListGroup.Item>
                <Button id="confirm-transport" type="button" onClick={handleConfirmRide}>Book Transport</Button>
              </ListGroup>
            </Card>   
          )}  
          {confirmationMade &&(
              <Link to={transport.LINK} target="_blank">
              <Button type="button" id="book-transport" onClick={addtoRecentTripHandler}>
                Book Transport
                <ul>
                  <li>This will take you to the website to book your ride</li>
                  <li>You will get a span of 20 hours to upload the proof of your travel (can include bill invoice or a selfie in the transport)</li>
                  <li>Have a safe and green travel to your destination</li>
                </ul>
              </Button>
              
            </Link>
          )}
        </Col>

    </Row>
    <Row className="review">
      <Col md={6} style={{marginTop:"5rem"}}>
        <h2 className="screen-head" style={{background:"white",border:"none",width:"100%"}}>Reviews</h2>
        {transport.REVIEWS.length===0 &&(<Message style={{padding:"2rem",fontSize:"2.5rem"}}>No Reviews</Message>)}
        <ListGroup variant="flush">
          {transport.REVIEWS.map(review=>(
            <ListGroup.Item key={review._id}>
              <strong style={{fontFamily:"Unica One",color:"blue",fontSize:"1.5rem",marginBottom:"0.5rem"}}>{review.APPS}</strong>
              <Rating value={review.RATINGS}/>
              <p style={{fontFamily:"Bebas Neue",color:"black"}}>{review.createdAt.substring(0,10)}</p>
              <p>{review.COMMENTS}</p> 
            </ListGroup.Item>
          ))} 
        </ListGroup>
      </Col>    
      <Col md={6} style={{marginTop:"5rem"}}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2 className="screen-head" style={{background:"white",border:"none",marginTop:"2rem"}}>Write a Travellor Review</h2>
            {isReviewLoading && <Loader/>}
            {userInfo ?(
              <Form onSubmit={submitReviewHandler}>
                <Form.Group controlId="rating" className="my-2">
                        <Form.Label style={{fontFamily:"Bebas Neue",fontSize:"1.35rem",color:"#6262ff",margin:"0 0 -1rem 1rem"}}>Rating</Form.Label>
                        <Form.Control as='select' value={rating} onChange={(e)=>setRating(Number(e.target.value))} style={{fontFamily:"Kanit",backgroundColor:"#40e0ca6e",boxShadow:"#21a687 5px 5px 0px",border:0,borderRadius:"0.5rem",margin:"0.15rem 0",height:"4.4rem",marginBottom:"1rem"}}>
                          <option value=''>Select...</option>
                          <option value='1'>1-Poor</option>
                          <option value='2'>2-Fair</option>
                          <option value='3'>3-Good</option>
                          <option value='4'>4-Very Good</option>
                          <option value='5'>5-Excellent</option>
                        </Form.Control>
                    </Form.Group>
                
                
                    <Form.Group controlId="comment" className="my-2">
                        <Form.Label style={{fontFamily:"Bebas Neue",fontSize:"1.35rem",color:"#6262ff",margin:"0 0 -1rem 1rem"}}>Comment</Form.Label>
                        <Form.Control as='textarea' row='3' value={comment} onChange={(e)=>setComment(e.target.value)} style={{fontFamily:"Kanit",backgroundColor:"#40e0ca6e",boxShadow:"#21a687 5px 5px 0px",border:0,borderRadius:"0.5rem",margin:"0.15rem 0",height:"4.4rem",marginBottom:"1rem"}}></Form.Control>
                    </Form.Group>
                
                <Button type="submit" variant="primary" className="my2" id="confirm-transport" style={{marginLeft:"3.5rem"}}>SUBMIT REVIEW</Button>
              </Form>
            ):(<Message>Please <Link to='/login'>Sign In</Link> to write a review</Message>)}
          </ListGroup.Item>
        </ListGroup>
      </Col>

    </Row>
    </>
    )}
  </>)
      
}

export default TransportScreen
