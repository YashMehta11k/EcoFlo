import React from 'react';

const AboutScreen = () => {
    
  return (
    <div>
      <style>
    {`
      body {
        font-family: 'Didot', serif;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        position: relative;
      }
      
      .content {
        text-align: center;
        padding: 50px 0;
      }
      
      .text-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #ffffff;
        z-index: 2;
        font-size: 40px;
        text-align: center;
      }
      
      .additional-content {
        display: none;
      }
      
      .additional-content.active {
        display: block;
      }
      
      
      .right-side p {
        font-size: 22px;
        line-height: 1.6;
        font-family: 'Montserrat', sans-serif;
      }
      
      .additional-text {
        float: left;
        width: 33%;
        margin-left: 20px;
      }
      
      .additional-text h3 {
        font-size: 30px;
        text-align: center;
      }
      
      .additional-text p {
        font-size: 18px;
        text-align: justify;
      }
    `}
  </style>

    <section className="content">
    <div className="blur-image" style={{borderRadius:"2rem"}}>
      <div className="text-overlay">
        <h2 style={{fontFamily:"Monoton",fontSize:"4rem",color:"black",fontWeight:"600",textShadow:"0.5rem 1rem 1rem lavender"}}>Moving Forward Leaving No Footprint</h2>
      </div>
    </div>
    </section>

  <div id="additionalContent">
    <div className="right-side">
      <h2 style={{marginLeft:0,fontFamily:"Bungee",fontSize:"3rem",color:"teal",marginTop:"5rem"}}>WHY CHOOSE EFLO?</h2>
      <p style={{textAlign:"center",fontFamily:"Kanit",fontSize:"1.5rem",backgroundColor:"lavender",color:"blue",padding:"3.5rem",width:"125%",marginLeft:"-7.5rem",borderRadius:"2rem",marginBottom:"7.5rem"}}>
        Select our app for a seamless experience in navigating sustainable transport options with real-time insights into carbon emissions and fuel savings. Our personalized recommendation system considers your preferences and environmental concerns, while integrated weather and air quality data ensure safer and healthier journeys. With robust security measures in place, trust in us for both eco-conscious commuting and data protection.
      </p>
      <img alt="Description" style={{marginLeft:"-5rem",marginBottom:"10rem",borderRadius:"1.25rem"}}/>
      <div className="additional-text">
        <h3 style={{fontFamily:"Bungee",fontSize:"1.75rem",color:"blue",marginLeft:"5rem"}}>REDUCE POLLUTION</h3>
        <p style={{ fontFamily: "Kanit",background:"teal",padding:"2.25rem",width:"25rem",borderRadius:"2.5rem",color:"greenyellow"}}>
          Our initiative promotes eco-friendly transportation options, guiding users towards modes such as cycling, walking, or public transit, which reduces the volume of cars on roads. Through data-driven insights, users can prioritize routes and modes with lower eco impact, leading to less vehicle emissions. Increased adoption of sustainable transport facilitated by our platform directly mitigates traffic, ensuring smoother traffic flow. By fostering a culture of sustainable urban living, we reduced reliance on private vehicles.
        </p>
      </div>
      </div>
      </div>

  <div style={{ clear: 'both', marginTop: '50px' }}></div>
  <img alt="" style={{ width: '45%', float: 'right',marginTop:"5rem",borderRadius:"1.5rem"}} id='last-about' />
  <div className="right-side" style={{ marginTop: '30px', textAlign: 'left' }}>
    <h2 style={{fontFamily:"Bungee",fontSize:"1.75rem",color:"blue"}}>TRANSPORTION</h2>
    <p style={{ fontSize: '20px' ,marginTop: "50px",marginLeft: "-11rem",textAlign: "center",marginBottom: "15rem",fontFamily: "Kanit",background:"teal",padding:"2.25rem",width:"35rem",borderRadius:"2.5rem",color:"greenyellow"}}>
      Public transport plays a vital role in addressing urban mobility challenges and promoting sustainable transportation practices. With the increasing emphasis on reducing carbon emissions and alleviating traffic congestion, public transport serves as a convenient and eco-friendly alternative for commuters. By offering reliable and affordable transportation options, such as buses, trains, and trams, public transit systems help alleviate the reliance on private vehicles, thus reducing traffic volume and emissions. Moreover, public transport networks often integrate seamlessly with other modes of transportation, providing commuters with comprehensive mobility solutions for their daily travels.
    </p>
    </div>

  <div style={{ textAlign: 'center', marginTop: '20px' }}>
    <h1 style={{fontFamily:"Monoton",fontSize:"4rem",color:"teal",fontWeight:"600",textShadow:"0.5rem 1rem 1rem pink",marginBottom:"5rem"}}>HOW_E-FLO_WORKS?</h1>
    <p style={{ fontSize: '30px',fontFamily:"Unica One",color:"black",marginBottom:"5rem"}}>
      The Sustainable Transport Database Management System (STDBMS) stands as a groundbreaking tool, strategically designed to cater to the needs of both travelers and urban residents seeking eco-friendly transportation options. By amalgamating user-friendly interface, dynamic database, and sophisticated algorithms, the platform offers comprehensive insights into sustainable transport modes and their environmental impact. Leveraging real-time data from diverse sources, STDBMS aims to encourage the adoption of sustainable transportation methods while empowering users to make informed choices for a greener future.
    </p>
    <p style={{ fontSize: '30px',fontFamily:"Unica One",color:"black",marginBottom:"1rem"}}>
      In comparison to existing systems like Tummoc, Uber, and Ola, which often lack comprehensive sustainability information and fail to consider crucial factors such as weather conditions and charging points, STDBMS aims to bridge these gaps. Through functionalities such as factual information provision, price/time comparison, personalized recommendation system, favorite points management, weather and air quality database, security measures, and transport contacts accessibility, the app strives to empower users to make informed, environmentally conscious transportation choices.
    </p>
    </div>
</div>
  )
}

export default AboutScreen
