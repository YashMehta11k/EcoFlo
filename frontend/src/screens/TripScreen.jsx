import {Link,useParams} from 'react-router-dom';
import {Row,Col,ListGroup,Form,Button,Cart, Card} from 'react-bootstrap';
import Message from '../components/Message';
import  Loader from '../components/Loader';
import { useGetTravelLogDetailsQuery } from '../slices/travelLogApiSlice';

const TripScreen = () => {
    const {id:tripId} = useParams();
    const {data:trip,refetch,isLoading, error} = useGetTravelLogDetailsQuery(tripId);

    return isLoading?<Loader/>:error?<Message variant='danger'/>
    :(
        <>
            <h1 className="screen-head">Trip: {trip._id}</h1>
            <Row>
                <Col md={5} id='trip-details'>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2 className='trip-detail-heading'>Confirmed By</h2>
                            <p><strong>Name: </strong>{trip.user.name}</p>
                            <p><strong>Email: </strong>{trip.user.email}</p>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2 className='trip-detail-heading'>On</h2>
                            <p><strong>Date: </strong>{trip.bookDate}</p>
                            <p><strong>Time: </strong>{trip.bookTime}</p>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2 className='trip-detail-heading'>Transport Details</h2>
                            <p><strong>App: </strong>{trip.APPS}</p>
                            <p><strong>Type: </strong>{trip.MODE_OF_TRANSPORT}</p>
                            <p><strong>Electric: </strong>{trip.GREEN_POWER?"Yes":"No"}</p>
                            <p><strong>CO2 saved: </strong>{(200-trip.CARBON_INDEX_PER_KM)*trip.tripDistance} g</p>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2 className='trip-detail-heading'>Location</h2>
                            <p><strong>Origin: </strong>{trip.locPoints.start}</p>
                            <p><strong>Destination: </strong>{trip.locPoints.end}</p>
                            <p><strong>Distance: </strong>{trip.tripDistance}</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={7} id='trip-summary'>
                    <h2 className='trip-detail-heading' style={{marginBottom:"2.75rem"}}>Summary</h2>
                    <Card style={{boxShadow:"0 0 0 0 white",background:"white"}}>
                        <ListGroup variant='flush'>
                        <ListGroup.Item>
                                <Row>
                                    <Col md={3}>Points </Col>
                                    <Col md={8}>{trip.REWARD_POINTS}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={3}>Confirm Status</Col>
                                    <Col md={8}>{trip.confirmStatus==='Confirmed'?(
                                        <Message variant='success'>The trip is already confirmed</Message>
                                    ):(
                                        <Message variant='danger'>The trip is not confirmed yet.<Link to={`/trips`}> Please go back to the Recent trips</Link></Message>
                                    )}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={3}>Proof Uploaded Status</Col>
                                    <Col md={8}>{trip.uploadStatus==='Uploaded'?(
                                        <Message variant='success'>Already uploaded the proof for verification</Message>
                                    ):(
                                        <Message variant='danger'>Proof not uploaded.<Link to={`/trips`}> Please upload the proof</Link></Message>
                                    )}</Col>
                                </Row>
                                <Row>
                                    <Col md={2}>Proof Link</Col>
                                    <Col md={4}>{trip.travelProof!=='url'?(
                                        <Link to={trip.travelProof}>Click me to see the proof</Link>
                                    ):(
                                        <p>-</p>
                                    )}</Col>
                                    <Col md={2}>Uploaded At</Col>
                                    <Col md={4}>{trip.uploadStatus==='Uploaded'?(
                                        <p>{trip.proofUploadTime}</p>
                                    ):(
                                        <p>-</p>
                                    )}</Col>
                                </Row>
                            </ListGroup.Item>
                            {trip.review===''?(
                                <></>
                            ):(
                                <ListGroup.Item>
                                    <Row>
                                        <Col md={3}>Traveller's Review</Col>
                                        <Col md={8}>{trip.review}</Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <Row>
                                    <Col md={3}>Verification</Col>
                                    <Col md={8}>{trip.verifyStatus==='Verified'?(
                                        <Message variant='success'>The admins have verified the trip details and uploaded proofs.</Message>
                                    ):(
                                        <Message>Verification of trip details and proof is being processed by the admin team. Please check the approvals after sometime</Message>
                                    )}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={3}>Rewards Approval</Col>
                                    <Col md={8}>{trip.approveStatus==='pending'?(
                                        <Message>Trip is in a verification Stage</Message>
                                    ):trip.approveStatus==='rejected'? (
                                        <Message variant='danger'>Travel Proof Rejected. No points given , please try better next time.</Message>
                                    ):(
                                        <Message variant='success'>Travel Proof Accepted. Points given , keep going and earn big rewards</Message>
                                    )}</Col>
                                </Row>
                            </ListGroup.Item>
                            {trip.adminProofreview!==''?(
                                <></>
                            ):(
                                <ListGroup.Item>
                                    <Row>
                                        <Col md={3}>Verifier's message</Col>
                                        <Col md={8}>{trip.adminProofReview}</Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default TripScreen
