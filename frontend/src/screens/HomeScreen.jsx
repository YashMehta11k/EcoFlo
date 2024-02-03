import { Row, Col } from 'react-bootstrap';
import { useEffect,useState } from 'react';
import Transport from '../components/Transport';
import { useGetTransportsQuery } from '../slices/transportsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
  
  const{data:transports,isLoading,error}=useGetTransportsQuery();
  const [showContent,setShowContent]=useState(false);

  useEffect(()=>{
    const timer=setTimeout(()=>{
      setShowContent(true);
    },750);

    return()=>clearTimeout(timer);
  },[]);

  return (
    <>
      {isLoading||!showContent?(
        <Loader/>
      ):error ?(
        <Message variant='danger'>{error.data?.message || error.error}</Message>
      ):(
        <>
          <h1 className="screen-head">Sustainable transports on your way</h1>
          <Row>
            {transports.map((transport) => (
              <Col key={transport._id} sm={5} md={5} lg={5} xl={5}>
                <Transport transport={transport} />
              </Col>
            ))}
          </Row>
        </>
      )}
      
    </>
  );
};

export default HomeScreen