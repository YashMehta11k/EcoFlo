import {LinkContainer} from 'react-router-bootstrap';
import {Table,Button} from 'react-bootstrap';
import {FaTimes} from 'react-icons/fa';
import Message from '../components/Message';
import Loader from  '../components/Loader';
import { useGetTravelLogListQuery} from '../slices/travelLogApiSlice';
import {Link} from 'react-router-dom';

const TripListScreen = () => {
    const {data:trips,isLoading,error}=useGetTravelLogListQuery();

    const calculateTimeDifference = (startTime, endTime) => {
        const difference = new Date(endTime) - new Date(startTime);
        const hours = Math.floor(difference / (1000 * 60 * 60));
        return `${hours} hours`;
    };
    
    return (
      <>
        <h1 className='screen-head' style={{fontSize:"2.5rem"}}>TRIPS VERIFICATION</h1>
        {isLoading?<Loader/>: error?<Message variant='danger'>{error.message}</Message>:(
            <Table hover responsive className="user-trips" variant='light'>
            <thead>
                <th className="my-trips">ID</th>
                <th className="my-trips">TRANSPORT</th>
                <th className="my-trips">USER</th>
                <th className="my-trips">POINTS</th>
                <th className="my-trips">PROOF</th>
                <th className="my-trips">VERIFIED</th>
                <th className="my-trips">APPROVAL</th>
                <th className="my-trips"></th>
            </thead>
            <tbody>
                {trips.map((trip)=>(
                    <tr key={trip._id}>
                        <td>{trip._id.substring(15,25)}</td>
                        <td>{trip.APPS}</td>
                        <td>{trip.user &&  trip.user.name}</td>
                        <td><strong>{trip.REWARD_POINTS}</strong></td>
                        <td>{trip.proofStatus==='Uploaded'?(
                          <>
                            <p>in {calculateTimeDifference(trip.confirmedAt, trip.proofUploadTime)}</p>
                            [ <Link to={trip.travelProof} style={{color:"turquoise",fontFamily:"Unica One",fontSize:"1.7rem",fontWeight:"900"}}>Proof LINK</Link> ]
                          </>
                        ):(
                            <p><FaTimes style={{color:"red",fontSize:"1.25rem"}}/></p>
                        )}</td>
                        <td>{trip.verifyStatus==='Verified'?(
                            <p style={{color:"turquoise",fontFamily:"Unica One",fontSize:"1.5rem",fontWeight:"600"}}>Verified</p>
                        ):(
                            <FaTimes style={{color:"red",fontSize:"1.25rem"}}/>
                        )}</td>
                        <td>{trip.approveStatus==='pending'?(
                            <p style={{color:"mustardyellow",fontFamily:"Unica One",fontSize:"1.5rem",fontWeight:"600"}}>Pending</p>
                        ):trip.approveStatus==='Rejected'?(
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
      </>
    )
}

export default TripListScreen
