import { useState } from 'react';
import { Form, Button, Container, Col, Image } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { TbArrowBadgeLeft } from "react-icons/tb";
import {toast} from 'react-toastify';
import { useUploadTravelProofMutation } from '../slices/travelLogApiSlice';
import defaultImage from '../assets/upload-proof.png';
import Loader from '../components/Loader';
import TripSteps from '../components/TripSteps';

const UploadScreen = () => {
    const {id: tripId } = useParams();
    const navigate = useNavigate();
    const [file, setFile] = useState(null);

    const [uploadTravelProof,{isLoading}] = useUploadTravelProofMutation();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!file) {
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
            const { imageUrl } = data;
            const result = await uploadTravelProof({ tripId, details:{travelProof:imageUrl} });

            if (result) {
                toast.success('Upload Successfull');
                navigate(`/travelLog/${tripId}`);
            }
        } catch (err) {
            toast.error(err?.data?.message || err.message)
            // Handle error, e.g., show error message to the user
        }
    };

    return (
        <>
            <Link className="prev-page" to={`/travelLog/${tripId}`}><TbArrowBadgeLeft id="arrow-icon" /> Go Back</Link>
            <TripSteps step1 step2 step3 step4 />
            <Container>
                <Col style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", margin: "1rem", padding: 0, height: "70vh", boxShadow: "0 0 10px 4px rgb(0, 140, 107)", borderRadius: "10px" }}>
                    <Image src={defaultImage} alt="Selected Image" style={{ width: "50%", marginLeft: "-22px", borderRadius: "10px" }}></Image>
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
                            <Button type='submit' id='sign-button' disabled={isLoading}>Upload</Button>
                        </Form>
                    </Col>
                </Col>
            </Container>
        </>
    );
}

export default UploadScreen;
