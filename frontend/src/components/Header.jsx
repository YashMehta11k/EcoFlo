//import React from 'react';
import {Navbar,Nav,Container} from 'react-bootstrap';
import { RiAccountPinBoxLine } from "react-icons/ri";
import {FaTimeline} from 'react-icons/fa6';
import logo from '../assets/logo2.png';
import { MdOutlineEnergySavingsLeaf } from "react-icons/md";
import { LiaSearchLocationSolid } from "react-icons/lia";
import {LinkContainer} from 'react-router-bootstrap';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
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
                            <LinkContainer to="/city"><Nav.Link><b><LiaSearchLocationSolid className='navbar-icons'/>CITY<br/><p>Bengaluru</p></b></Nav.Link></LinkContainer>
                            <LinkContainer to="/history"><Nav.Link><b><FaTimeline className='navbar-icons'/><br/><p>Travel Log</p></b></Nav.Link></LinkContainer>
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
