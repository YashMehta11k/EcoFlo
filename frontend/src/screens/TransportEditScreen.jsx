import { useState,useEffect } from "react";
import {Link,useNavigate,useParams} from 'react-router-dom';
import {Form,Button} from 'react-bootstrap';
import Loader from "../components/Loader";
import Message from "../components/Message";
import {toast} from 'react-toastify';
import { TbArrowBadgeLeft } from "react-icons/tb";
import { useUpdateTransportMutation,useGetTransportDetailsQuery } from "../slices/transportsApiSlice";


const TransportEditScreen = () => {
    const {id:transportId}=useParams();
    const [APPS,setAPPS]=useState('');
    const [MODE_OF_TRANSPORT,setMODE_OF_TRANSPORT]=useState('');
    const [CONTACT_NUMBER,setCONTACT_NUMBER]=useState('');
    const [CARBON_INDEX_PER_KM,setCARBON_INDEX_PER_KM]=useState(0);
    const [REWARD_POINTS,setREWARD_POINTS]=useState(0);
    const [WEATHER,setWEATHER]=useState(false);
    const [AVG_SPEED,setAVG_SPEED]=useState(0);
    const [COST_PER_KM,setCOST_PER_KM]=useState(0);
    const [NUMBER_OF_SEATS,setNUMBER_OF_SEATS]=useState(0);
    const [LINK,setLINK]=useState('');
    const [IMAGES,setIMAGES]=useState('');
    const [GREEN_POWER,setGREEN_POWER]=useState(false);
    const [RATINGS,setRATINGS]=useState(0);
    const [NUM_REVIEWS,setNUM_REVIEWS]=useState(0);

    const {data:transport,isLoading,refetch,error}=useGetTransportDetailsQuery(transportId);
    const [updateTransport,{isLoading:isUpdating}]=useUpdateTransportMutation();

    const navigate=useNavigate();
    useEffect(()=>{
        if(transport){
            setAPPS(transport.APPS);
            setMODE_OF_TRANSPORT(transport.MODE_OF_TRANSPORT);
            setCONTACT_NUMBER(transport.CONTACT_NUMBER);
            setCARBON_INDEX_PER_KM(transport.CARBON_INDEX_PER_KM);
            setREWARD_POINTS(transport.REWARD_POINTS);
            setWEATHER(transport.WEATHER==='true');
            setAVG_SPEED(transport.AVG_SPEED);
            setCOST_PER_KM(transport.COST_PER_KM);
            setNUMBER_OF_SEATS(transport.NUMBER_OF_SEATS);
            setLINK(transport.LINK);
            setIMAGES(transport.IMAGES);
            setGREEN_POWER(transport.GREEN_POWER==='true');
            setRATINGS(transport.RATINGS);
            setNUM_REVIEWS(transport.NUM_REVIEWS);
        };
    },[transport]);
    
    const submitHandler=async(e)=>{
        e.preventDefault();
        const updatedTransport={
            _id:transportId,
            APPS,
            MODE_OF_TRANSPORT,
            CARBON_INDEX_PER_KM,
            REWARD_POINTS,
            WEATHER,
            AVG_SPEED,
            CONTACT_NUMBER,
            COST_PER_KM,
            NUMBER_OF_SEATS,
            LINK,
            IMAGES,
            GREEN_POWER,
            RATINGS,
            NUM_REVIEWS
        };
        const result=await updateTransport(updatedTransport);
        if(result.error) {
            toast.error(result.error);
        }else{
            toast.success('Transport Updated Successfully');
            refetch();
            navigate('/admin/transportlist');
        }
    };

    return (
        <>
            <Link className="prev-page" to={`/admin/transportlist`}><TbArrowBadgeLeft id="arrow-icon" /> Go Back</Link>
            <h2 className='screen-head' style={{width:"initial",fontSize:"2.2rem",margin:"1.25rem 0"}}>Edit Transport</h2>
            {isUpdating && <Loader/>}
            {isLoading?<Loader/>:error?<Message variant='danger'>{error.message}</Message>:(
                <Form onSubmit={submitHandler} style={{display:"flex",flexDirection: "row",flexWrap: 'wrap',justifyContent:'flex-start'}}>

                    <Form.Group controlId="App" className="my-2" style={{margin:"0 20rem 0 7rem"}}>
                        <Form.Label style={{fontFamily:"Bebas Neue",fontSize:"1.5rem",color:"#6262ff",margin:"0rem 0 -1rem 1rem"}}>App Name</Form.Label>
                        <Form.Control type='name' placeholder="Enter App name" value={APPS} onChange={(e)=>setAPPS(e.target.value)} style={{width:"140%",fontFamily:"Kanit",backgroundColor:"#40e0ca6e",boxShadow:"#21a687 5px 5px 0px",border:0,borderRadius:"0.5rem",margin:"0.15rem 0",height:"4.4rem",marginBottom:"1rem"}}></Form.Control>
                    </Form.Group>
                
                    <Form.Group controlId="MODE_OF_TRANSPORT" className="my-2">
                        <Form.Label style={{fontFamily:"Bebas Neue",fontSize:"1.5rem",color:"#6262ff",margin:"0 0 -1rem 1rem"}}>MODE_OF_TRANSPORT</Form.Label>
                        <Form.Control type='text' placeholder="Enter MODE OF TRANSPORT" value={MODE_OF_TRANSPORT} onChange={(e)=>setMODE_OF_TRANSPORT(e.target.value)} style={{width:"140%",fontFamily:"Kanit",backgroundColor:"#40e0ca6e",boxShadow:"#21a687 5px 5px 0px",border:0,borderRadius:"0.5rem",margin:"0.15rem 0",height:"4.4rem",marginBottom:"1rem"}}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="Contact Number" className="my-2" style={{margin:"0 20rem 0 7rem"}}>
                        <Form.Label style={{fontFamily:"Bebas Neue",fontSize:"1.5rem",color:"#6262ff",margin:"0 0 -1rem 1rem"}}>CONTACT_NUMBER</Form.Label>
                        <Form.Control type='text' placeholder="Enter CONTACT NUMBER" value={CONTACT_NUMBER} onChange={(e)=>setCONTACT_NUMBER(e.target.value)} style={{width:"140%",fontFamily:"Kanit",backgroundColor:"#40e0ca6e",boxShadow:"#21a687 5px 5px 0px",border:0,borderRadius:"0.5rem",margin:"0.15rem 0",height:"4.4rem",marginBottom:"1rem"}}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="CARBON EMMISION" className="my-2">
                        <Form.Label style={{fontFamily:"Bebas Neue",fontSize:"1.5rem",color:"#6262ff",margin:"0 0 -1rem 1rem"}}>CARBON_INDEX_PER_KM</Form.Label>
                        <Form.Control type='text' placeholder="Enter CARBON INDEX PER KM" value={CARBON_INDEX_PER_KM} onChange={(e)=>setCARBON_INDEX_PER_KM(e.target.value)} style={{width:"140%",fontFamily:"Kanit",backgroundColor:"#40e0ca6e",boxShadow:"#21a687 5px 5px 0px",border:0,borderRadius:"0.5rem",margin:"0.15rem 0",height:"4.4rem",marginBottom:"1rem"}}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="REWARDS" className="my-2" style={{margin:"0 20rem 0 7rem"}}>
                        <Form.Label style={{fontFamily:"Bebas Neue",fontSize:"1.5rem",color:"#6262ff",margin:"0 0 -1rem 1rem"}}>REWARD_POINTS</Form.Label>
                        <Form.Control type='text' placeholder="Enter REWARD POINTS" value={REWARD_POINTS} onChange={(e)=>setREWARD_POINTS(e.target.value)} style={{width:"140%",fontFamily:"Kanit",backgroundColor:"#40e0ca6e",boxShadow:"#21a687 5px 5px 0px",border:0,borderRadius:"0.5rem",margin:"0.15rem 0",height:"4.4rem",marginBottom:"1rem"}}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="WEATHER" className="my-2">
                        <Form.Label style={{fontFamily:"Bebas Neue",fontSize:"1.5rem",color:"#6262ff",margin:"0 0 -1rem 1rem"}}>WEATHER</Form.Label>
                        <Form.Control type='text' placeholder="Enter WEATHER COMPATIBILITY" value={WEATHER} onChange={(e)=>setWEATHER(e.target.value)} style={{width:"140%",fontFamily:"Kanit",backgroundColor:"#40e0ca6e",boxShadow:"#21a687 5px 5px 0px",border:0,borderRadius:"0.5rem",margin:"0.15rem 0",height:"4.4rem",marginBottom:"1rem"}}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="AVERAGE SPEED" className="my-2" style={{margin:"0 20rem 0 7rem"}}>
                        <Form.Label style={{fontFamily:"Bebas Neue",fontSize:"1.5rem",color:"#6262ff",margin:"0 0 -1rem 1rem"}}>AVG_SPEED</Form.Label>
                        <Form.Control type='text' placeholder="Enter AVERAGE SPEED" value={AVG_SPEED} onChange={(e)=>setAVG_SPEED(e.target.value)} style={{width:"140%",fontFamily:"Kanit",backgroundColor:"#40e0ca6e",boxShadow:"#21a687 5px 5px 0px",border:0,borderRadius:"0.5rem",margin:"0.15rem 0",height:"4.4rem",marginBottom:"1rem"}}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="COST PER KM" className="my-2">
                        <Form.Label style={{fontFamily:"Bebas Neue",fontSize:"1.5rem",color:"#6262ff",margin:"0 0 -1rem 1rem"}}>COST_PER_KM</Form.Label>
                        <Form.Control type='text' placeholder="Enter COST PER KM" value={COST_PER_KM} onChange={(e)=>setCOST_PER_KM(e.target.value)} style={{width:"140%",fontFamily:"Kanit",backgroundColor:"#40e0ca6e",boxShadow:"#21a687 5px 5px 0px",border:0,borderRadius:"0.5rem",margin:"0.15rem 0",height:"4.4rem",marginBottom:"1rem"}}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="IMAGES" className="my-2" style={{margin:"0 20rem 0 7rem"}}>
                        <Form.Label style={{fontFamily:"Bebas Neue",fontSize:"1.5rem",color:"#6262ff",margin:"0 0 -1rem 1rem"}}>IMAGES</Form.Label>
                        <Form.Control type='text' placeholder="Enter IMAGE S3 LINK" value={IMAGES} onChange={(e)=>setIMAGES(e.target.value)} style={{width:"140%",fontFamily:"Kanit",backgroundColor:"#40e0ca6e",boxShadow:"#21a687 5px 5px 0px",border:0,borderRadius:"0.5rem",margin:"0.15rem 0",height:"4.4rem",marginBottom:"1rem"}}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="LINK" className="my-2">
                        <Form.Label style={{fontFamily:"Bebas Neue",fontSize:"1.5rem",color:"#6262ff",margin:"0 0 -1rem 1rem"}}>LINK</Form.Label>
                        <Form.Control type='text' placeholder="Enter LINK" value={LINK} onChange={(e)=>setLINK(e.target.value)} style={{width:"140%",fontFamily:"Kanit",backgroundColor:"#40e0ca6e",boxShadow:"#21a687 5px 5px 0px",border:0,borderRadius:"0.5rem",margin:"0.15rem 0",height:"4.4rem",marginBottom:"1rem"}}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="NUMBER OF SEATS" className="my-2" style={{margin:"0 20rem 0 7rem"}}>
                        <Form.Label style={{fontFamily:"Bebas Neue",fontSize:"1.5rem",color:"#6262ff",margin:"0 0 -1rem 1rem"}}>NUMBER_OF_SEATS</Form.Label>
                        <Form.Control type='text' placeholder="Enter NUMBER OF SEATS" value={NUMBER_OF_SEATS} onChange={(e)=>setNUMBER_OF_SEATS(e.target.value)} style={{width:"140%",fontFamily:"Kanit",backgroundColor:"#40e0ca6e",boxShadow:"#21a687 5px 5px 0px",border:0,borderRadius:"0.5rem",margin:"0.15rem 0",height:"4.4rem",marginBottom:"1rem"}}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="GREEN POWER" className="my-2">
                        <Form.Label style={{fontFamily:"Bebas Neue",fontSize:"1.5rem",color:"#6262ff",margin:"0 0 -1rem 1rem"}}>GREEN_POWER</Form.Label>
                        <Form.Control type='text' placeholder="Enter GREEN POWER" value={GREEN_POWER} onChange={(e)=>setGREEN_POWER(e.target.value)} style={{width:"140%",fontFamily:"Kanit",backgroundColor:"#40e0ca6e",boxShadow:"#21a687 5px 5px 0px",border:0,borderRadius:"0.5rem",margin:"0.15rem 0",height:"4.4rem",marginBottom:"1rem"}}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="RATINGS" className="my-2" style={{margin:"0 20rem 0 7rem"}}>
                        <Form.Label style={{fontFamily:"Bebas Neue",fontSize:"1.5rem",color:"#6262ff",margin:"0 0 -1rem 1rem"}}>RATINGS</Form.Label>
                        <Form.Control type='text' placeholder="Enter RATINGS" value={RATINGS} onChange={(e)=>setRATINGS(e.target.value)} style={{width:"140%",fontFamily:"Kanit",backgroundColor:"#40e0ca6e",boxShadow:"#21a687 5px 5px 0px",border:0,borderRadius:"0.5rem",margin:"0.15rem 0",height:"4.4rem",marginBottom:"1rem"}}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="NUMBER OF REVIEWS" className="my-2">
                        <Form.Label style={{fontFamily:"Bebas Neue",fontSize:"1.5rem",color:"#6262ff",margin:"0 0 -1rem 1rem"}}>NUM_REVIEWS</Form.Label>
                        <Form.Control type='text' placeholder="Enter NUMBER OF REVIEWS" value={NUM_REVIEWS} onChange={(e)=>setNUM_REVIEWS(e.target.value)} style={{width:"140%",fontFamily:"Kanit",backgroundColor:"#40e0ca6e",boxShadow:"#21a687 5px 5px 0px",border:0,borderRadius:"0.5rem",margin:"0.15rem 0",height:"4.4rem",marginBottom:"1rem"}}></Form.Control>
                    </Form.Group>
            
            <Button type="submit" variant="primary" className="my2" id="confirm-transport" style={{marginLeft:"12rem"}}>UPDATE TRANSPORT</Button>
            </Form>
            )}
        </>
    )
}

export default TransportEditScreen
