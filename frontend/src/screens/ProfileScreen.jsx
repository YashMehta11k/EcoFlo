import { useState,useEffect } from "react";
import {Table,Form,Button,Row,Col} from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {toast} from 'react-toastify';
import { useProfileMutation } from "../slices/usersApiSlice";
import {setCredentials} from '../slices/authSlice';
import profileImage from '../assets/profile1.png';
import { useGetMyTripsQuery } from "../slices/travelLogApiSlice";
import {FaTimes} from 'react-icons/fa';
import {Link} from 'react-router-dom';

const ProfileScreen = () => {

    const [name,setName]=useState("");
    const [email, setEmail] = useState("");
    const[password,setPassword]=useState("")
    const [confirmPassword, setConfirmPassword] = useState("");


    const dispatch=useDispatch();
    const {userInfo}=useSelector((state)=>state.auth);

    const [updateProfile,{isLoading:loadingUpdateProfile}]=useProfileMutation();

    const {data:trips,isLoading,error}=useGetMyTripsQuery();

    useEffect(()=>{
        if(userInfo){
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo,userInfo.name , userInfo.email]);

    const submitHandler=async(e)=>{
        e.preventDefault();
        if(password!==confirmPassword){
            toast.error('Passwords do not match');
        }else{
            try{
                const res=await updateProfile({_id:userInfo._id, name, email, password}).unwrap();
                dispatch(setCredentials({...res}));
                toast.success("Profile updated successfully!");
            }catch(error){
                toast.error(error.message); 
            }
        }
    }


    return (
        <>
        <h2 className='screen-head' style={{width:"initial",fontSize:"2.5rem",margin:"0.5rem 0"}}>User Profile</h2>
        <Row>
            <Col md={4} style={{paddingTop:"3rem"}}>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name" className="my-2">
                        <Form.Label style={{fontFamily:"Bebas Neue",fontSize:"1.35rem",color:"#6262ff",margin:"0 0 -1rem 1rem"}}>Name</Form.Label>
                        <Form.Control type='name' placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)} style={{fontFamily:"Kanit",backgroundColor:"#40e0ca6e",boxShadow:"#21a687 5px 5px 0px",border:0,borderRadius:"0.5rem",margin:"0.15rem 0",height:"4.4rem",marginBottom:"1rem"}}></Form.Control>
                    </Form.Group>
                
                
                    <Form.Group controlId="email" className="my-2">
                        <Form.Label style={{fontFamily:"Bebas Neue",fontSize:"1.35rem",color:"#6262ff",margin:"0 0 -1rem 1rem"}}>Email</Form.Label>
                        <Form.Control type='email' placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} style={{fontFamily:"Kanit",backgroundColor:"#40e0ca6e",boxShadow:"#21a687 5px 5px 0px",border:0,borderRadius:"0.5rem",margin:"0.15rem 0",height:"4.4rem",marginBottom:"1rem"}}></Form.Control>
                    </Form.Group>
                
                
                    <Form.Group controlId="password" className="my-2">
                        <Form.Label style={{fontFamily:"Bebas Neue",fontSize:"1.35rem",color:"#6262ff",margin:"0 0 -1rem 1rem"}}>Password</Form.Label>
                        <Form.Control type='password' placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} style={{fontFamily:"Kanit",backgroundColor:"#40e0ca6e",boxShadow:"#21a687 5px 5px 0px",border:0,borderRadius:"0.5rem",margin:"0.15rem 0",height:"4.4rem",marginBottom:"1rem"}}></Form.Control>
                    </Form.Group>
                
                    <Form.Group controlId="confirmPassword" className="my-2">
                        <Form.Label style={{fontFamily:"Bebas Neue",fontSize:"1.35rem",color:"#6262ff",margin:"0 0 -1rem 1rem"}}>Confirm Password</Form.Label>
                        <Form.Control type='confirmPassword' placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} style={{fontFamily:"Kanit",backgroundColor:"#40e0ca6e",boxShadow:"#21a687 5px 5px 0px",border:0,borderRadius:"0.5rem",margin:"0.15rem 0",height:"4.4rem",marginBottom:"1rem"}}></Form.Control>
                    </Form.Group>
                
                <Button type="submit" variant="primary" className="my2" id="confirm-transport" style={{marginLeft:"3.5rem"}}>UPDATE PROFILE</Button>
                {loadingUpdateProfile && <Loader/>}
                </Form> 
            </Col>
            <Col md={4}>
                <img src={profileImage} alt=" " id="profile-side-image"></img>
            </Col>
            <Col md={4} style={{margin:"2rem 0 0 8rem"}}>
                <Row id="profile-head">Points_you_earned</Row>
                <Row id="profile-data">{userInfo.points}</Row>
                <Row id="profile-head">CO2_you_saved</Row>
                <Row id="profile-data">{userInfo.co2saved}<p style={{fontFamily:"Bebas Neue",fontSize:"2rem",color:"gray",textShadow:"0 0 0 white"}}>grams</p></Row>
            </Col>  
        </Row>
        <h2 className='screen-head' style={{width:"initial",fontSize:"2.5rem",margin:"0.5rem 0",marginBottom:"3rem"}}>My Travel Log</h2>
        <Row>
            {isLoading?(
                <Loader/>
            ):error?(<Message variant='danger'>{error?.data?.message || error.error}</Message>):(
                <Table hover responsive className="user-trips">
                    <thead>
                        <th className="my-trips">ID</th>
                        <th className="my-trips">TRANSPORT</th>
                        <th className="my-trips">DETAILS</th>
                        <th className="my-trips">CO2 SAVED</th>
                        <th className="my-trips">DISTANCE</th>
                        <th className="my-trips">LOCATION</th>
                        <th className="my-trips">CONFIRMED</th>
                        <th className="my-trips">PROOF UPLOAD</th>
                        <th className="my-trips">VERIFIED</th>
                        <th className="my-trips">APPROVED</th>
                        <th className="my-trips"></th>
                    </thead>
                    <tbody>
                        {trips.map((trip)=>(
                            <tr key={trip._id}>
                                <td>{trip._id.substring(15,25)}</td>
                                <td>{trip.APPS}</td>
                                <td>{trip.bookDate}<br/>{trip.bookTime}</td>
                                <td>{(200-trip.CARBON_INDEX_PER_KM)*trip.tripDistance}g</td>
                                <td>{trip.tripDistance} kms</td>
                                <td>From: {trip.locPoints.start}<br/>To: {trip.locPoints.end}</td>
                                <td>{trip.confirmStatus==='Confirmed'?(
                                    trip.confirmedAt.substring(0,10)
                                ):(
                                    <FaTimes style={{color:"red",fontSize:"1.25rem"}}/>
                                )}</td>
                                <td>{trip.proofStatus==='Uploaded'?(
                                    <Link to={trip.travelProof} style={{color:"turquoise",fontFamily:"Unica One",fontSize:"1.5rem",fontWeight:"600"}}>Proof LINK</Link>
                                ):(
                                    <FaTimes style={{color:"red",fontSize:"1.25rem"}}/>
                                )}</td>
                                <td>{trip.verifyStatus==='Verified'?(
                                    <p style={{color:"turquoise",fontFamily:"Unica One",fontSize:"1.5rem",fontWeight:"600"}}>Verified</p>
                                ):(
                                    <FaTimes style={{color:"red",fontSize:"1.25rem"}}/>
                                )}</td>
                                <td>{trip.approveStatus==='pending'?(
                                    <p style={{color:"mustardyellow",fontFamily:"Unica One",fontSize:"1.5rem",fontWeight:"600"}}>Pending</p>
                                ):trip.approveStatus==='rejected'?(
                                    <p style={{color:"red",fontFamily:"Unica One",fontSize:"1.5rem",fontWeight:"600"}}>Rejected</p>
                                ):(
                                    <p style={{color:"lightgreen",fontFamily:"Unica One",fontSize:"1.5rem",fontWeight:"600"}}>Accepted</p>
                                )}</td>
                                <td><LinkContainer to={`/travelLog/${trip._id}`}>
                                    <Button variant="light" id="more-details">More..</Button>
                                </LinkContainer></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Row>
        </>
    )
}

export default ProfileScreen
