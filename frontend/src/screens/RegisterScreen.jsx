import { useState ,useEffect} from "react";
import {Link,useLocation,useNavigate} from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import {Form , Button} from 'react-bootstrap';
import FormContainer from "../components/FormContainer"; 
import Loader from '../components/Loader';
import {useRegisterMutation} from '../slices/usersApiSlice';
import { setCredentials } from "../slices/authSlice";
import {toast} from 'react-toastify';

const RegisterScreen = () => {
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[confirmPassword,setConfirmPassword]=useState("")
    const[name,setName]=useState("")

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [register,{isLoading}]=useRegisterMutation();

    const {userInfo}=useSelector((state)=>state.auth);

    const {search}=useLocation();
    const sp=new URLSearchParams(search);
    const redirect=sp.get('redirect') || '/';

    useEffect(()=>{
        if(userInfo){
            navigate(redirect);
        }
    },[userInfo,redirect,navigate]);



    const submitHandler=async(e)=>{
        e.preventDefault();
        if(password!==confirmPassword){
            toast.error('Password do not match');
        }else{try{
            const res=await register({name,email,password}).unwrap();
            dispatch(setCredentials({...res,}));
            navigate(redirect);
        }catch(err){
            toast.error(err?.data?.message || err.error);
        }}
    }

    return (
        <FormContainer style={{height:"100vh"}}>
            <h1 style={{fontFamily:"Monoton",color:"#77f",fontWeight:"1000",marginLeft:"3.35rem",marginTop:"0rem",marginBottom:"1rem",fontSize:"2.25rem"}}>REGISTER</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name" className="my-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        className="sign-body"
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="email" className="my-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className="sign-body"
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="password" className="my-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className="sign-body"
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword" className="my-3">
                    <Form.Label>setConfirmPassword</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter confirm password"
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        className="sign-body"
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' id='sign-button' disabled={isLoading}>Register</Button>
                {isLoading && <Loader/>}
                <h2 style={{color:"#2292d6",fontSize:"1.35rem",marginTop:"5rem",textAlign:"center"}}>Evenryday Traveller? Login and keep on travelling greener with us</h2>
            </Form>
            <Link to={redirect?`/login?redirect=${redirect}`:'/login'} id="sign-change">\ Sign In</Link>
        </FormContainer>
    )
}

export default RegisterScreen;
 