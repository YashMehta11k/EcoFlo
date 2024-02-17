import {Link,useParams} from 'react-router-dom';
import { useState } from 'react';
import {Row,Col,ListGroup,Card,Button} from 'react-bootstrap';
import Message from '../components/Message';
import  Loader from '../components/Loader';
import { useGetTravelLogDetailsQuery,useVerifyTripMutation} from '../slices/travelLogApiSlice';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify';

const TripScreen = () => {
    const {id:tripId} = useParams();
    
    const {data:trip,refetch,isLoading, error} = useGetTravelLogDetailsQuery(tripId);
    const {userInfo}=useSelector((state)=>state.auth);
    const [verifyTrip]=useVerifyTripMutation();

    const calculateTimeDifference = (startTime, endTime) => {
        const difference = new Date(endTime) - new Date(startTime);
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours} hours ${minutes} minutes`;
    };
    const [approvalStatus, setApprovalStatus] = useState('');
    const [adminReview, setAdminReview] = useState('');
    var co2saved = (200 - trip?.CARBON_INDEX_PER_KM) * trip?.tripDistance;

    const verifySubmitHandler = async () => {
        try{
            await verifyTrip({ tripId, details:{approveStatus:approvalStatus,adminReview:adminReview,userid:trip.user._id,points:trip.REWARD_POINTS,co2saved:co2saved} });
            refetch();
            toast.success('Trip Verified Succesfully');
        }catch(error){
            toast.error(error.message);
        }
    };

    return isLoading?<Loader/>:error?<Message variant='danger'/>
    :(
        <>
            <h1 className="screen-head">Trip: {trip._id}</h1>
            {userInfo && userInfo.isAdmin &&(
                <>
                    <Row style={{backgroundColor:'lavender',borderRadius:"1.5rem",margin:"4rem",padding:"2rem",paddingBottom:"0"}}>
                    <Col id='trip-details'>
                        <Row md={3} style={{ color: "teal",fontSize:"1.95rem",fontWeight:"600",marginBottom:"3.5rem"}} className='trip-detail-heading'>Approval Status</Row>
                        <Row md={8}>
                            <div style={{marginTop:"-2.5rem"}}>
                                <strong><input type="radio" id="approved" name="approvalStatus" value="Approved" onChange={(e) => setApprovalStatus(e.target.value)}/></strong>
                                <strong><label htmlFor="approved" style={{ marginRight: '1rem',fontSize:"1.7rem" }}>Approve</label></strong>
                                <strong><input type="radio" id="rejected" name="approvalStatus" value="Rejected" onChange={(e) => setApprovalStatus(e.target.value)} /></strong>
                                <strong><label htmlFor="rejected" style={{ marginRight: '1rem',fontSize:"1.7rem" }}>Reject</label></strong>
                            </div>
                        </Row>
                    </Col>
                    <Col id='trip-details'>
                        <Row md={3} style={{ color: "teal",fontSize:"1.95rem",fontWeight:"600" }} className='trip-detail-heading'>Admin Review</Row>
                        <strong><Row md={8}>
                            <textarea
                                rows="3"
                                cols="60"
                                value={adminReview}
                                onChange={(e) => setAdminReview(e.target.value)}
                                style={{fontFamily:"Kanit"}}
                            ></textarea>
                        </Row></strong>
                    </Col>
                    <Row>
                     <Button onClick={verifySubmitHandler} disabled={!approvalStatus} id='book-transport' style={{width:"20%",fontSize:"2.7rem",position:"absolute",top:"50%",left:"19%"}}>Verify Trip</Button>
                    </Row>
                </Row>
                </>
            )}
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
                                    <Col md={3} style={{color:"black"}}>Points </Col>
                                    <Col md={8}>{trip.REWARD_POINTS}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={3} style={{color:"black"}}>Confirm Status</Col>
                                    <Col md={8}>{trip.confirmStatus==='Confirmed'?(
                                        <Message variant='success'>The trip is already confirmed</Message>
                                    ):(
                                        <Message variant='danger'>The trip is not confirmed yet.<Link to={`/trips`}> Please go back to the Recent trips</Link></Message>
                                    )}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={3} style={{color:"black"}}>Proof Uploaded Status</Col>
                                    <Col md={8}>{trip.proofStatus==='Uploaded'?(
                                        <Message variant='success'>Already uploaded the proof for verification</Message>
                                    ):(
                                        <Message variant='danger'>Proof not uploaded.</Message>
                                    )}</Col>
                                </Row>
                                <Row style={{marginTop:"0.55rem",marginBottom:"2rem"}}>
                                    <Col md={12}>{trip.proofStatus!=='Uploaded'?(
                                        <Link to={`/travelLog/${tripId}/upload`} style={{padding:"0.25rem",backgroundColor:"turquoise",color:"black",width:"150%",fontSize:"1.5rem",marginLeft:"2rem"}}>Upload Proof</Link>
                                    ):(
                                        <Link to={`/travelLog/${tripId}/upload`} style={{padding:"0.25rem",backgroundColor:"turquoise",color:"black",width:"150%",fontSize:"1.5rem",marginLeft:"2rem"}}>Change Proof</Link>
                                    )}</Col>
                                </Row>
                                <Row>
                                    <Col md={2} style={{color:"black"}} >Proof Link</Col>
                                    <Col md={4} >{trip.travelProof!=='url'?(
                                        <Link to={trip.travelProof} style={{color:"greenyellow",fontFamily:"Unica One",fontSize:"1.5rem",fontWeight:"600"}}>Click me</Link>
                                    ):(
                                        <p>-</p>
                                    )}</Col>
                                    <Col md={2} style={{color:"black"}}>Uploaded At</Col>
                                    <Col md={4}>{trip.proofStatus==='Uploaded'?(
                                        <p>{calculateTimeDifference(trip.confirmedAt, trip.proofUploadTime)}</p>
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
                                        <Col md={3} style={{color:"black"}}>Traveller's Review</Col>
                                        <Col md={8}>{trip.review}</Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <Row>
                                    <Col md={3} style={{color:"black"}}>Verification</Col>
                                    <Col md={8}>{trip.verifyStatus==='Verified'?(
                                        <Message variant='success'>The admins have verified the trip details and uploaded proofs.</Message>
                                    ):(
                                        <Message variant='danger'>Verification of trip details and proof is being processed by the admin team. Please check the approvals after sometime</Message>
                                    )}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={3} style={{color:"black"}} >Rewards Approval</Col>
                                    <Col md={8}>{trip.approveStatus==='pending'?(
                                        <Message>Trip is in a verification Stage</Message>
                                    ):trip.approveStatus==='Rejected'? (
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
                                        <Col md={3} style={{color:"black"}}>Verifier's message</Col>
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