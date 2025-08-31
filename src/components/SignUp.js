import { useState} from "react";
import { Container, Form, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import Spinner from "react-bootstrap/Spinner";
import {handleSignUp} from "../RestApis"

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  function handleSubmit() {
    setLoading(true)
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
        console.log(error);
        if (error.response) {
          if (error.response.status === 404) {
            toast.error("User not found");
          } else if (error.response.status === 401) {
            toast.error("Invalid credentials");
          }else if (error.response.status === 400) {
            toast.error("A user with that username already exists.");
          }
           else {
            toast.error("Something went wrong");
          }
        } else {
          toast.error("Network error or server down");
        }
      }).finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      
      <Header/>  
      <Container className="mt-5 col-lg-6">
        <h1 className="mb-4">Sign Up </h1>
        <Form>
        <Form.Group className="mb-3" controlId="">
            <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e)=>(setName(e.target.value))} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e)=>(setEmail(e.target.value))} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Control type="text" placeholder="Enter your username" value={username} onChange={(e)=>(setUsername(e.target.value))} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e)=>(setPassword(e.target.value))} />
          </Form.Group>
          
          {loading ? (
            <Button variant="info" disabled type="submit" onClick={handleSubmit}>
               <Spinner animation="border" variant="dark" />
               </Button>
          ) : (
            <Button variant="info" onClick={handleSubmit}>Sign Up</Button>
          )}
        </Form>
      </Container>
    </>
  );
}

export default SignUp;
