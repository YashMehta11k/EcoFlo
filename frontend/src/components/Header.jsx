//import React from 'react';
import {Navbar,Nav,Container} from 'react-bootstrap';
import { RiAccountPinBoxLine } from "react-icons/ri";
import {FaTimeline} from 'react-icons/fa6';
import logo from '../assets/logo2.png';
import { MdOutlineEnergySavingsLeaf } from "react-icons/md";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
  return (
    <header>
        <div className='headerdiv'>
            
            <Navbar bg="dark" variant='dark' expand="lg" fixed='top' collapseOnSelect>
                <img src={logo} alt="EcoFlo LOGO"></img>
                <Container>
                    
                    <Navbar.Brand href="/">
                            EcoFlo
                    </Navbar.Brand>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav class="ms-auto">
                            <Nav.Link href="/history" ><FaTimeline className='navbar-icons'/><br/><p>Travel Log</p></Nav.Link>
                            <Nav.Link href="/user" ><RiAccountPinBoxLine className='navbar-icons'/><br/><p>Sign In</p></Nav.Link>
                            
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
