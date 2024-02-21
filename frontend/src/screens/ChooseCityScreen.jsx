import React, { useState } from 'react';
import {Link} from 'react-router-dom';

import city1Image from '../assets/Bengaluru.jpg'; // Adjust the path based on your project structure
import city2Image from '../assets/Dehli.avif';
import city3Image from '../assets/Hamburg.jpeg';
import city4Image from '../assets/Frankfurt.jpg';
//import defImg from '../assets/def_city.png'

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
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: selectedCity ? `url(${selectedCity.imageUrl})`:"black", backgroundSize: '80%',marginLeft:"0.5rem",backgroundRepeat:"no-repeat",backgroundPositionX:"103%",backgroundPositionY:"118%"}}>
          <h1 id='choose-city-head'>{selectedCity?' ': "Choose Your City" }</h1>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90%',fontFamily:'Barriecito',position:"absolute",fontWeight:900,fontSize:"2rem",flexDirection:"column",top:"9%"}}>
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
                  opacity: selectedCity === city ? 0.5 : 1,
                  border: 'none',
                  borderRadius:"0.4rem",
                  color:'black',
                  outline: 'none',
                  cursor: 'pointer',
                  boxShadow: 'rgb(255, 255, 255) -2px -2px 0px 7.5px',
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
