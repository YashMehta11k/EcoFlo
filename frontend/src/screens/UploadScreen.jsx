import { useState, useEffect } from 'react';
import { Form, Button, Container, Col, Image } from 'react-bootstrap';
import defaultImage from '../assets/upload-proof.png';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { saveTravelProof } from '../slices/recentTripSlice';
import { TbArrowBadgeLeft } from "react-icons/tb";
import TripSteps from '../components/TripSteps';
import Loader from '../components/Loader';

const UploadScreen = () => {
    const { tripId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const recentTrip = useSelector(state => state.recentTrip);
    const { recentTrips } = recentTrip;
    const [file, setFile] = useState(null);

    const existingTrip = recentTrips.find(trip => trip._id === tripId);
    const proofUrl = existingTrip?.travelProof;

    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (showContent) {
            window.scrollTo(0, 0); // Scroll to the top of the page
        }
    }, [showContent]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!file && !proofUrl) {
            alert('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            const { imageUrl } = data; // Assuming the server returns the URL of the uploaded image

            dispatch(saveTravelProof({ tripId, proofUrl: imageUrl }));
            navigate('/');
        } catch (error) {
            console.error('Error uploading file:', error);
            // Handle error, e.g., show error message to the user
        }
    };

    const buttonText = proofUrl ? "Change Proof" : "Upload";

    return (
        <>
            {!showContent ? (
                <Loader />
            ) : (
                <>
                    <Link className="prev-page" to='/trips'><TbArrowBadgeLeft id="arrow-icon" /> Go Back</Link>
                    <TripSteps step1 step2 step3 step4 />
                    <Container>
                        <Col style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", margin: "1rem", padding: 0, height: "70vh", boxShadow: "0 0 10px 4px rgb(0, 140, 107)", borderRadius: "10px" }}>
                            <Image src={proofUrl || defaultImage} alt="Selected Image" style={{ width: "50%", marginLeft: "-22px", borderRadius: "10px" }}></Image>
                            <Col xs={12} md={6} style={{ padding: "3rem 0 0 5rem", marginLeft: "-2.75rem", fontFamily: "Unica One", color: "black", fontSize: "1.4rem", fontWeight: "400", paddingRight: "3rem" }}>
                                <h1 className="my-3" style={{ fontFamily: "Monoton", color: "#5e86ff" }}>Travel Proof</h1>

                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='inputTravelProof'>
                                        <Form.Label>Upload Your Travel Proof here</Form.Label><br />
                                        <Form.Control
                                            type='file'
                                            onChange={handleFileChange}
                                            style={{ fontFamily: "Kanit" }}
                                        ></Form.Control>
                                    </Form.Group>
                                    <Button type='submit' id='sign-button'>{buttonText}</Button>
                                </Form>
                            </Col>
                        </Col>
                    </Container>
                </>
            )}
        </>
    );
}

export default UploadScreen;
