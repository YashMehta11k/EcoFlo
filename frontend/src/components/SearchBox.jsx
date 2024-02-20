import { useState } from "react";
import {Form,Button} from 'react-bootstrap';
import { useParams,useNavigate } from "react-router-dom";
import { TbListSearch } from "react-icons/tb";

const SearchBox = () => {
    const navigate=useNavigate();
    const {keyword:urlKeyword}=useParams();
    const [keyword,setKeyword]=useState(urlKeyword || '');

    const submitHandler=(e)=>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/search/${keyword}`);
        }else{
            navigate('/');
        }
    }

    return (
        <Form onSubmit={submitHandler} style={{display:"flex",flexDirection:"column",position:"fixed",top:"13%",width:"24.5%",left:"73%",}}>
            <Form.Control type="text" name='q' value={keyword} onChange={(e)=>setKeyword(e.target.value)} placeholder="Search Transports..." style={{width:"100%",background:"black",color:"lavender",fontFamily:"Kanit",marginRight:"0.4rem",height:"6rem",borderRadius:"0.5rem",marginBottom:"0.5rem"}}></Form.Control>
            <Button type="submit" variant="outline-success" style={{background:"lavender",height:"3rem"}}><TbListSearch style={{fontSize:"1.75rem"}}/></Button> 
        </Form>
    )
}

export default SearchBox
