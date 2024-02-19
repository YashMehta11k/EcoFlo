import {Table,Button} from 'react-bootstrap';
import {FaTimes,FaTrash,FaCheck} from 'react-icons/fa';
import Message from '../components/Message';
import Loader from  '../components/Loader';
import { useGetAllUsersQuery,useDeleteUserMutation} from '../slices/usersApiSlice';
import {toast} from 'react-toastify';

const UserListScreen = () => {
    const {data:users,isLoading,refetch,error}=useGetAllUsersQuery();
    const [deleteUser,{isLoading:loadingdelete}]=useDeleteUserMutation();
    const deleteHandler=async(id)=>{
        if(window.confirm('Are you sure?')){
            try {
                await deleteUser(id);
                refetch();
                toast.success('User Deleted Successfully');
            } catch (error) {
                toast.error(error?.message);
            }
        }
    };

    return (
        <>
            <h1 className='screen-head' style={{fontSize:"2.5rem"}}>ACTIVE USERS</h1>
            {loadingdelete && <Loader/>}
            {isLoading?<Loader/>: error?<Message variant='danger'>{error.message}</Message>:(
                <Table hover responsive className="user-trips" variant='light'>
                <thead>
                    <th className="my-trips">ID</th>
                    <th className="my-trips">NAME</th>
                    <th className="my-trips">EMAIL</th>
                    <th className="my-trips">POINTS_EARNED</th>
                    <th className="my-trips">CO2_SAVED</th>
                    <th className="my-trips">ADMIN</th>
                    <th className="my-trips"></th>
                </thead>
                <tbody>
                    {users.map((user)=>(
                        <tr key={user._id}>
                            <td>{user._id.substring(15,25)}</td>
                            <td>{user.name}</td>
                            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td>{user.points}</td>
                            <td>{user.co2saved}</td>
                            <td>{user.isAdmin?(
                                <p><FaCheck style={{color:"green",fontSize:"1.25rem"}}/></p>
                            ):(
                                <p><FaTimes style={{color:"red",fontSize:"1.25rem"}}/></p>
                            )}</td>
                            
                            <td><Button variant='danger' onClick={()=>deleteHandler(user._id)} style={{marginLeft:"0.5rem"}}><FaTrash/></Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            )}
        </>
    )
}

export default UserListScreen
 