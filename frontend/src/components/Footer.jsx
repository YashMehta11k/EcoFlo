import {Container,Row,Col} from 'react-bootstrap';

const Footer = () => {
  const currentYear=new Date().getFullYear();
    
  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-centre py-3'>
                    <p>EcoFlo &copy; {currentYear}</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer
