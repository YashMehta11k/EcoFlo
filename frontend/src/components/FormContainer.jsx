import { Container,Col} from "react-bootstrap";
import sideImage from '../assets/login.jpg';

const FormContainer = ({children}) => {
  return (
    <Container>
        <Col style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly", margin:"1rem",padding:0,height:"100vh",boxShadow:"0 0 10px 4px rgb(0, 140, 107)",borderRadius:"10px"}}>
            <img alt="" src={sideImage} style={{width: "50%",marginLeft:"-22px" ,borderRadius:"10px"}}></img>
            <Col xs={12} md={6} style={{padding:"3rem 0 0 5rem",marginLeft:"-2.75rem",fontFamily:"Unica One",color:"black",fontSize:"1.4rem",fontWeight:"400",paddingRight:"3rem"}}>
                {children}
            </Col>
        </Col>
    </Container>
  )
}

export default FormContainer;
