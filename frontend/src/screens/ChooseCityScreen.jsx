import React, { useState } from 'react';
import {Link} from 'react-router-dom';

import city1Image from '../assets/Bengaluru.jpg'; // Adjust the path based on your project structure
import city2Image from '../assets/Dehli.avif';
import city3Image from '../assets/Hamburg.jpeg';
import city4Image from '../assets/Frankfurt.jpg';

const cities = [
  { name: 'Bengaluru', imageUrl: city1Image },
  { name: 'Dehli', imageUrl: city2Image },
  { name: 'Hamburg', imageUrl: city3Image },
  { name: 'Frankfurt', imageUrl: city4Image },
];

const ChooseCityScreen = () => {
    const [selectedCity, setSelectedCity] = useState(null);
    const [,setShowModal] = useState(false);
  
    const handleCityClick = (city) => {
      setSelectedCity(city);
      setShowModal(true);
    };
  
    return (
      <div style={{ height: '90vh'}}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: selectedCity ? `url(${selectedCity.imageUrl})` : 'black', backgroundSize: 'cover'}}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '97%',fontFamily:'Luckiest Guy',fontWeight:700,fontSize:"2rem",marginTop:"4.5rem"}}>
            {cities.map((city, index) => (
              <button className='city-buttons'
                key={index}
                onClick={() => handleCityClick(city)}
                style={{
                  backgroundImage: `url(${city.imageUrl})`,
                  backgroundSize: 'cover',
                  width: '300px',
                  height: '250px',
                  marginRight: '15px',
                  opacity: selectedCity === city ? 0.25 : 0.75,
                  border: 'none',
                  borderRadius:"0.4rem",
                  color:'black',
                  outline: 'none',
                  cursor: 'pointer',
                  boxShadow: '0px 2px 25px 15px rgba(0, 0, 0, 1)',
                  textShadow: '2px 2px 6px white'
                }}
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>

          
        {selectedCity && (
          <div style={{ position: 'fixed', bottom: '52px', right: '30px', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', textAlign: 'center' }}>
            <p>Are you sure you want to choose {selectedCity.name}?</p>
            <Link to='/' style={{ margin: '0 10px',backgroundColor:'black',color:'white',fontFamily:'Bebas Neue',fontSize:'2rem'}} id='city-confirm'>Confirm</Link>
          </div>
        )}
      </div>
    );
  };
  
  export default ChooseCityScreen;
