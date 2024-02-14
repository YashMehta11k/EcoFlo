//import { Spinner } from "react-bootstrap";
import React from 'react';

const Loader = ({message}) => {

    
  return (
    <div class="loading">
        <div class="dash uno"></div>
        <div class="dash dos"></div>
        <div class="dash tres"></div>
        <div class="dash cuatro"></div>
        <div id='load-text'>{message?message:"Bringing transport your way"}</div>
    </div>
  )
}

export default Loader
