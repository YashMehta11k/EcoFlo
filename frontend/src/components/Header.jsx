import {Badge,Navbar,Nav,Container, NavDropdown} from 'react-bootstrap';
import { RiAccountPinBoxLine } from "react-icons/ri";
import {FaTimeline} from 'react-icons/fa6';
import logo from '../assets/EFlo-logo.png';
import { MdOutlineEnergySavingsLeaf } from "react-icons/md";
import { TbMapSearch } from "react-icons/tb";
import {LinkContainer} from 'react-router-bootstrap';
import { TbInfoHexagon } from "react-icons/tb";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector,useDispatch } from 'react-redux';
import { TbListDetails } from "react-icons/tb";
import { useLogoutMutation } from '../slices/usersApiSlice';
import {logout} from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { TbLogout } from "react-icons/tb";
import { useEffect,useState } from 'react';
import { LuUserCheck } from "react-icons/lu";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { LuListChecks } from "react-icons/lu";
import { PiCarSimpleBold } from "react-icons/pi";
import { FaUsersLine } from "react-icons/fa6";
import { resetTrips } from '../slices/recentTripSlice';

const Header = () => {

    const{recentTrips}=useSelector((state)=>state.recentTrip); 
    const{userInfo}=useSelector((state)=>state.auth); 
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const[points,setPoints]=useState(0);

    useEffect(() => {
        if (userInfo) {
            const interval = setInterval(() => {
                if (points < userInfo.points) {
                    setPoints(prevPoints => prevPoints + 1);
                }
            }, 5);
            return () => clearInterval(interval);
        }
    }, [userInfo, points]);
    
    const [logoutApiCall]=useLogoutMutation();
    const logoutHandler=async()=>{
        try{
            await logoutApiCall().unwrap();
            dispatch(logout());
            dispatch(resetTrips());
            navigate('/login');
        }catch(err){
            console.log(err);
        }
    }

  return (
    <header>
        <div className='headerdiv'>
            
            <Navbar bg="dark" variant='dark' expand="lg" fixed='top' collapseOnSelect>
                <img src={logo} alt="EcoFlo LOGO"></img>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>

                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav class="ms-auto">
                            <LinkContainer to="/cities"><Nav.Link href='../City.html'><b><TbMapSearch className='navbar-icons'/><br/><p>Bengaluru</p></b></Nav.Link></LinkContainer>
                            <LinkContainer to="/trips"><Nav.Link><b><FaTimeline className='navbar-icons'/>{
                                recentTrips.length>0 && (
                                    <Badge id='trip-count' bg='black'>
                                        {recentTrips.length}
                                    </Badge>
                                )
                            }<br/><p>Recent Trips</p></b></Nav.Link></LinkContainer>
                            {userInfo && userInfo.isAdmin===false &&(<LinkContainer to="/about"><Nav.Link ><b><TbInfoHexagon className='navbar-icons'/><br/><p>About Us</p></b></Nav.Link></LinkContainer>)}
                            {!userInfo &&(<LinkContainer to="/about"><Nav.Link ><b><TbInfoHexagon className='navbar-icons'/><br/><p>About Us</p></b></Nav.Link></LinkContainer>)}
                            {userInfo?(
                                <b style={{textAlign:"center"}}><LuUserCheck className='navbar-icons' style={{marginTop:"13px"}}/>
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile<TbListDetails id='drop-icons'/></NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout<TbLogout id='drop-icons'/></NavDropdown.Item>
                                </NavDropdown>
                                </b>
                            ):(
                                <LinkContainer to="/login"><Nav.Link href="/user" ><b><RiAccountPinBoxLine className='navbar-icons'/><br/><p>Sign In</p></b></Nav.Link></LinkContainer>
                            )}
                            {userInfo && userInfo.isAdmin &&(
                                <b style={{textAlign:"center"}} id='admin-func'><MdOutlineAdminPanelSettings className='navbar-icons' id='admin-icon' style={{}}/>
                                <NavDropdown title='Admin' id='adminmenu'>
                                    <LinkContainer to='/admin/triplist'>
                                        <NavDropdown.Item>Travel Log<LuListChecks id='drop-icons'/></NavDropdown.Item> 
                                    </LinkContainer>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>EFlo Users<FaUsersLine id='drop-icons'/></NavDropdown.Item> 
                                    </LinkContainer>
                                    <LinkContainer to='/admin/transportlist'>
                                        <NavDropdown.Item>Transports<PiCarSimpleBold id='drop-icons'/></NavDropdown.Item> 
                                    </LinkContainer>
                                </NavDropdown>
                                </b>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                    <div class="navbar-points"><MdOutlineEnergySavingsLeaf className='navbar-point-icon'/>
                        {userInfo?(<h2 id='user-points'>{points}</h2>):(<h2 id='user-points'>-</h2>)}
                    </div>
                </Container>
            </Navbar>
        </div>    
    </header>
  ) 
}

export default Header
