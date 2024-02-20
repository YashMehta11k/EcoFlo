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
        <Form onSubmit={submitHandler} style={{display:"flex",flexDirection:"row",position:"absolute",top:"16%",width:"33%",left:"65%"}}>
            <Form.Control type="text" name='q' value={keyword} onChange={(e)=>setKeyword(e.target.value)} placeholder="Search Transports..." style={{width:"85%",background:"black",color:"lavender",fontFamily:"Kanit",marginRight:"0.25rem"}}></Form.Control>
            <Button type="submit" variant="outline-success"><TbListSearch style={{fontSize:"1.5rem"}}/></Button> 
        </Form>
    )
}

export default SearchBox
