import {LinkContainer} from 'react-router-bootstrap';
import {Table,Button,Row,Col} from 'react-bootstrap';
import {FaEdit,FaTrash} from 'react-icons/fa';
import Message from '../components/Message';
import Loader from  '../components/Loader';
import { useGetTransportsQuery,useAddTransportMutation,useDeleteTransportMutation} from '../slices/transportsApiSlice';
import {Link,useParams} from 'react-router-dom';
import {toast} from 'react-toastify';

const TransportListScreen = () => {
    const { keyword } = useParams();
    const { data: transports, isLoading, error,refetch } = useGetTransportsQuery({ keyword });
    console.log(transports);
    const [addTransport,{isLoading:loadingAdd}]=useAddTransportMutation();
    const addTransportHandler=async()=>{
        if(window.confirm('Are you sure you want to add a Transport?')){
            try{
                await addTransport();
                refetch();
            }catch(error){
                toast.error("Error Adding the transport");
            }
        }    
    }

    const [deleteTransport,{isLoading:loadingDel}]=useDeleteTransportMutation();
    const deleteHandler=async(id)=>{
        if(window.confirm('Are you sure to delete this transport?')){
            try{
                await deleteTransport(id);
                refetch();
                toast.success( "Transport Deleted Successfully");
            }catch(error){
                toast.error(error?.message || "Error deleting the transport")
            }
        }
    }
    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1 className='screen-head' style={{fontSize:"2.5rem",marginLeft:"10rem"}}>Transports in Bengaluru</h1>
                </Col>
                <Col className='text-end'>
                    <Button className='m-3' id='edit-transport' onClick={addTransportHandler}><FaEdit  style={{marginRight:"0.5rem"}}/>Add Latest Transport</Button>
                </Col>
            </Row>
            {loadingAdd && <Loader/>}
            {loadingDel && <Loader/>}
            {isLoading?<Loader/>:error?<Message variant='danger'>{error.message}</Message>:(
                <>
                <Table hover responsive className="user-trips" variant='light' style={{fontSize:"0.75"}}>
                <thead>
                    <th className="my-trips">ID</th>
                    <th className="my-trips">APP</th>
                    <th className="my-trips">IMAGE</th>
                    <th className="my-trips">TYPE</th>
                    <th className="my-trips">AVG_SPEED</th>
                    <th className="my-trips">POINTS</th>
                    <th className="my-trips">SEATS</th>
                    <th className="my-trips">COST/km</th>
                    <th className="my-trips">C02/km</th>
                    <th className="my-trips">LINK</th>
                    <th className="my-trips"></th>
                    
                </thead>
                <tbody>
                    {transports.map((transport)=>(
                        <tr key={transport._id}>
                            <td>{transport._id.substring(21,25)}</td>
                            <td>{transport.APPS}</td>
                            <td><img src={transport.IMAGES} alt=' ' style={{width:"4.5rem",height:"4.5rem"}}/></td>
                            <td>{transport.MODE_OF_TRANSPORT}</td>
                            <td>{transport.AVG_SPEED}</td>
                            <td>{transport.REWARD_POINTS}</td>
                            <td>{transport.NUMBER_OF_SEATS}</td>
                            <td>₹ {transport.COST_PER_KM}</td>
                            <td>{transport.CARBON_INDEX_PER_KM} g</td>
                            <td>[ <Link to={transport.LINK} style={{color:"turquoise",fontFamily:"Unica One",fontSize:"1.2rem",fontWeight:"900"}}>website</Link> ]</td>
                            <td>
                                <LinkContainer to={`/admin/transport/${transport._id}/edit`}>
                                    <Button variant="dark"><FaEdit style={{color:"lavender"}}/></Button>
                                </LinkContainer>
                                <Button variant='danger' onClick={()=>deleteHandler(transport._id)} style={{marginLeft:"0.5rem"}}><FaTrash/></Button> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </>
            )}
        </>
    )
}

export default TransportListScreen
