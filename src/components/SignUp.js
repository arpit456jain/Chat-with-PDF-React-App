import { useState} from "react";
import { Container, Form, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import {handleSignUp} from "../RestApis"

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); 

  function handleSubmit() {
    const payload ={
      "name": name,
      "email":email,
      "username": username,
      "password": password
    }
      handleSignUp(payload).then(response => {
       
          toast.success("Signed Up in successfully!")
          navigate(`/login`); // Redirect to the desired path
          
      })
      .catch(error => {
        toast.error("Some Error Occured")
      });
  }

  return (
    <>
      
      <Header/>  
      <Container className="mt-5 col-lg-6">
        <h1 className="mb-4">Sign Up </h1>
        <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e)=>(setName(e.target.value))} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e)=>(setEmail(e.target.value))} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="text" placeholder="Enter your username" value={username} onChange={(e)=>(setUsername(e.target.value))} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e)=>(setPassword(e.target.value))} />
          </Form.Group>
          <Button variant="info" onClick={handleSubmit}>Sign Up</Button>
        </Form>
      </Container>
    </>
  );
}

export default SignUp;
