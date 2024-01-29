import { Row, Col } from 'react-bootstrap';
import Transport from '../components/Transport';
import { useEffect ,useState} from 'react';
import axios from 'axios';

const HomeScreen = () => {
  
  const [transports,setTransports]=useState([]);

  useEffect(()=>{
    const fetchTransports= async() =>{
      const {data}= await axios.get('/api/transports');
      setTransports(data);
    };
    fetchTransports();
  },[]);

  return (
    <>
      <h1 id="home-head">Sustainable transports on your way</h1>
      <Row>
        {transports.map((transport) => (
          <Col key={transport._id} sm={5} md={5} lg={5} xl={5}>
            <Transport transport={transport} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen