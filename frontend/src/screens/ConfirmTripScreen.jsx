import { useState} from 'react';
import { Form, Button, Container, Col ,Image} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import { Link,useNavigate, useParams } from 'react-router-dom';
import { TiUpload } from "react-icons/ti";
import { TbArrowBadgeLeft } from "react-icons/tb";
import TripSteps from '../components/TripSteps';
import { removeConfirmedTrip } from '../slices/recentTripSlice';
import sideImage from '../assets/confirm-sideImage.jpg'
import { useCreateTravelLogMutation } from '../slices/travelLogApiSlice';
import Loader from '../components/Loader';
import {toast} from 'react-toastify';
import Message from '../components/Message';
import moment from "moment-timezone";

moment.tz.setDefault("Asia/Kolkata");

const ConfirmTripScreen = () => {
    const { tripId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [review, setReview] = useState('');
    const recentTrip = useSelector(state => state.recentTrip);
    const { recentTrips } = recentTrip;
    const existingTrip = recentTrips.find(trip => trip._id === tripId);

    const [createTravelLog,{isLoading,error}]=useCreateTravelLogMutation();

    const handleSubmit = async(e) => {
        try{
            e.preventDefault();
            const res=await createTravelLog({
                transport:existingTrip._id,
                user:existingTrip.user,
                APPS:existingTrip.APPS,
                CARBON_INDEX_PER_KM:existingTrip.CARBON_INDEX_PER_KM,
                GREEN_POWER:existingTrip.GREEN_POWER,
                MODE_OF_TRANSPORT:existingTrip.MODE_OF_TRANSPORT,
                REWARD_POINTS:existingTrip.REWARD_POINTS,
                locPoints:existingTrip.locPoints,
                bookTime:existingTrip.bookTime,
                bookDate:existingTrip.bookDate,
                tripDistance:existingTrip.tripDistance,
                confirmStatus:'Confirmed',
                proofStatus:'Not uploaded',
                review:review,
                travelProof:existingTrip.travelProof,
                proofUploadTime :existingTrip.proofUploadTime,
                verifyStatus:existingTrip.verifyStatus,
                approveStatus:existingTrip.approveStatus,
                confirmedAt:moment(),
                adminProofReview:existingTrip.adminProofReview
            }).unwrap();
            dispatch(removeConfirmedTrip({ tripId: existingTrip._id }));
            navigate(`/travelLog/${res._id}`);
        }catch(error){
            toast.error(error);
        }
    };

    return (
        <>
        <Link className="prev-page" to='/trips'><TbArrowBadgeLeft  id="arrow-icon"/> Go Back</Link>
        <TripSteps step1 step2 step3/>
        <Container>
            <Col style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", margin: "1rem", padding: 0, height: "65vh", boxShadow: "0 0 10px 4px rgb(0, 140, 107)", borderRadius: "10px" }}>
                <Image src={sideImage} alt="Selected Image" style={{ width: "50%", marginLeft: "-22px", borderRadius: "10px" }}></Image>
                <Col xs={12} md={6} style={{ padding: "3rem 0 0 5rem", marginLeft: "-2.75rem", fontFamily: "Unica One", color: "black", fontSize: "1.4rem", fontWeight: "400", paddingRight: "3rem" }}>
                    <h1 className="my-3" style={{ fontFamily: "Monoton", color: "#5e86ff" }}>Confirm Trip</h1>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='inputReview'>
                            <Form.Label>Write a review about your trip:</Form.Label><br />
                            <Form.Control
                                as='textarea'
                                rows={4}
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                style={{fontFamily:"Kanit"}}
                            ></Form.Control>
                            {error && <Message variant='danger'>{error}</Message>}
                        </Form.Group>
                        <Button type='submit' id='sign-button' style={{marginTop:"2rem"}}><TiUpload/><br/>Confirm</Button>
                        {isLoading && <Loader/>}
                    </Form>
                </Col>
            </Col>
        </Container>
        </>
    );
}

export default ConfirmTripScreen;
