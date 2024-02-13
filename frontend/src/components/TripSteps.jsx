import {Nav} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const TripSteps = ({step1,step2,step3,step4,step5,step6}) => {
  return (
    <Nav className='justify-content-center mb-4' style={{fontFamily:"Kanit",background:"white",borderRadius:"2rem",paddingBottom:"0.7rem"}}>
        <Nav.Item>
            {step1?(
                <LinkContainer to='/login'>
                    <Nav.Link>Sign In</Nav.Link>
                </LinkContainer>
            ):(
                <Nav.Link as='div' disabled>Sign In</Nav.Link>
            )}
        </Nav.Item>
        <Nav.Item>
            {step2?(
                <LinkContainer to='/cities'>
                    <Nav.Link>Choose City</Nav.Link>
                </LinkContainer>
            ):(
                <Nav.Link as='div' disabled>Choose City</Nav.Link>
            )}
        </Nav.Item>
        <Nav.Item>
            {step3?(
                <LinkContainer to='/'>
                    <Nav.Link>Book Tansport</Nav.Link>
                </LinkContainer>
            ):(
                <Nav.Link as='div' disabled>Book Transport</Nav.Link>
            )}
        </Nav.Item>
        <Nav.Item>
            {step4?(
                <LinkContainer to='/trips'>
                    <Nav.Link>Confim Trip</Nav.Link>
                </LinkContainer>
            ):(
                <Nav.Link as='div' disabled>Confirm Trip</Nav.Link>
            )}
        </Nav.Item>
        <Nav.Item>
            {step5?(
                <LinkContainer to='/trips'>
                    <Nav.Link>Upload Proof</Nav.Link>
                </LinkContainer>
            ):(
                <Nav.Link as='div' disabled>Upload Proof</Nav.Link>
            )}
        </Nav.Item>
        <Nav.Item>
            {step6?(
                <LinkContainer to='/profile'>
                    <Nav.Link>Get Rewards</Nav.Link>
                </LinkContainer>
            ):(
                <Nav.Link as='div' disabled>Get Rewards</Nav.Link>
            )}
        </Nav.Item>
    </Nav>
  )
}

export default TripSteps
