import {Link,useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import{Row , Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap';
import { TbMapPinCancel } from "react-icons/tb";
import { TbArrowBadgeLeft } from "react-icons/tb";
import Message from '../components/Message';

const RecentTripsScreen = () => {

  const navigate=useNavigate();  
  const dispatch=useDispatch();

  const recentTrip=useSelector((state)=>state.recentTrip);
  const {recentTrips}=recentTrip;
  return (

    
    <Row>
      <Col md={8}>
        <Link className="prev-page" to='/'><TbArrowBadgeLeft  id="arrow-icon"/> Go Back</Link>
        <h1 className='screen-head'>Your Recent trips</h1>
        {recentTrips.length===0?(
          <Message>
            You have no recent trips. Please Go Back and choose your trip
          </Message>
        ):(
          <ListGroup variant='flush'>
            {recentTrips.map((item)=>(
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={3}>
                    <Image src={item.IMAGES} alt={item.APPS} id='trips-img' fluid rounded/>
                  </Col>
                  <Col md={2}>
                    <Link to={`/transport/${item._id}`}><h3 id='trips-app'>{item.APPS}</h3></Link>
                    
                  </Col>
                  <Col md={2}>{item.COST_PER_KM}</Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    </Row>
  )
}

export default RecentTripsScreen;
