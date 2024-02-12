import {useState} from 'react';
import {Form,Button,Container,Col} from 'react-bootstrap';
import sideImage from '../assets/upload-proof.png';
import { useDispatch} from 'react-redux';
import { useNavigate ,useParams} from 'react-router-dom';
import {saveTravelProof} from '../slices/recentTripSlice';

const UploadScreen = () => {
    const { tripId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [proof, setProof] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveTravelProof({ tripId, proofUrl: proof }));
        navigate('/');
    };
  return (
    <Container>
        <Col style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly", margin:"1rem",padding:0,height:"80vh",boxShadow:"0 0 10px 4px rgb(0, 140, 107)",borderRadius:"10px"}}>
            <img alt="" src={sideImage} style={{width: "50%",marginLeft:"-22px" ,borderRadius:"10px"}}></img>
            <Col xs={12} md={6} style={{padding:"3rem 0 0 5rem",marginLeft:"-2.75rem",fontFamily:"Unica One",color:"black",fontSize:"1.4rem",fontWeight:"400",paddingRight:"3rem"}}>
                <h1 className="my-3" style={{fontFamily:"Monoton",color:"#5e86ff"}}>Travel Proof</h1>

                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='inputTravelProof'>
                        <Form.Label>Upload Your Travel Proof here</Form.Label><br/>
                        <Form.Control 
                            type='file'
                            placeholder='image system url'
                            value={proof}
                            onChange={(e)=>setProof(e.target.value)}
                        ></Form.Control>    
                    </Form.Group>
                    <Button type='submit' id='sign-button'>Upload</Button>
                </Form>
            </Col>
        </Col>
    </Container>
  )
}

export default UploadScreen
