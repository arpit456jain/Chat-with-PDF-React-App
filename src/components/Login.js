import { useState} from "react";
import { Container, Form, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import {handleLogin} from "../RestApis"
function Login({setUserID}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate(); // React Router's useNavigate hook
  function handleSubmit(event) {
     event.preventDefault();
    const payload = {
      "username": username,
      "password": password
    };
      handleLogin(payload).then(response => {
        console.log(response)
        if (response.status === 200) {
          // localStorage.setItem('user',JSON.stringify(response.data));
          // Save user details separately
          const data = response.data;
            sessionStorage.setItem("user", JSON.stringify({
              user_id: data.user_id,
              username: data.username,
              name: data.name
            }));

            // Save access token and refresh token
            sessionStorage.setItem("access_token", data.access);
            sessionStorage.setItem("refresh_token", data.refresh);
          toast.success("Login Successfully")
          navigate('/');
        }
        else if(response.status === 404)
        {
          toast.error("user not found")
        }
      })
      .catch(error => {
       if (error.response) {
      if (error.response.status === 404) {
        toast.error("User not found");
      } else if (error.response.status === 401) {
        toast.error("Invalid credentials");
      } else {
        toast.error("Something went wrong");
      }
    } else {
      toast.error("Network error or server down");
    }
      });
  }

  return (
    <>
     
      <Header/>  
      <Container className="mt-5 col-lg-6">
        <h1 className="mb-4">Login </h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="text" placeholder="Enter your username" value={username} onChange={(e)=>(setUsername(e.target.value))} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e)=>(setPassword(e.target.value))} />
          </Form.Group>
          <Button variant="info" type="submit">Login</Button>
        </Form>
      </Container>
    </>
  );
}

export default Login;
