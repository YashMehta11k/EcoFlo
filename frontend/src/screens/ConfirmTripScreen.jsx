import { useState } from 'react';
import { Form, Button, Container, Col ,Image} from 'react-bootstrap';
import { useDispatch} from 'react-redux';
import { Link,useNavigate, useParams } from 'react-router-dom';
import { confirmTrip } from '../slices/recentTripSlice';
import { TiUpload } from "react-icons/ti";
import { TbArrowBadgeLeft } from "react-icons/tb";
import TripSteps from '../components/TripSteps';
import sideImage from '../assets/confirm-sideImage.jpg'

const ConfirmTripScreen = () => {
    const { tripId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [review, setReview] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(confirmTrip({ tripId, review }));
        navigate(`/upload-proof/${tripId}`);
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
                        </Form.Group>
                        <Button type='submit' id='sign-button' style={{marginTop:"2rem"}}><TiUpload/><br/>Confirm</Button>
                    </Form>
                </Col>
            </Col>
        </Container>
        </>
    );
}

export default ConfirmTripScreen;
