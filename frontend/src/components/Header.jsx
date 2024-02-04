import {Badge,Navbar,Nav,Container} from 'react-bootstrap';
import { RiAccountPinBoxLine } from "react-icons/ri";
import {FaTimeline} from 'react-icons/fa6';
import logo from '../assets/Favicon.gif';
import { MdOutlineEnergySavingsLeaf } from "react-icons/md";
import { TbMapSearch } from "react-icons/tb";
import {LinkContainer} from 'react-router-bootstrap';
import { TbInfoHexagon } from "react-icons/tb";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

const Header = () => {

  const{recentTrips}=useSelector((state)=>state.recentTrip); 
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
                            <LinkContainer to="/about"><Nav.Link ><b><TbInfoHexagon className='navbar-icons'/><br/><p>About Us</p></b></Nav.Link></LinkContainer>
                            <LinkContainer to="/login"><Nav.Link href="/user" ><b><RiAccountPinBoxLine className='navbar-icons'/><br/><p>Sign In</p></b></Nav.Link></LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                    <div class="navbar-points"><MdOutlineEnergySavingsLeaf className='navbar-point-icon'/><h2>0</h2></div>
                </Container>
            </Navbar>
        </div>    
    </header>
  ) 
}

export default Header
