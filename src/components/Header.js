
import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Header({loginstatus}) {
  const navigate = useNavigate();

  const handleLogout=()=>{
    sessionStorage.clear(); 
    navigate("/login")
    toast.success("Logout Successfully")
  }
  return (
    <>
      <Navbar className="navbar navbar-expand-lg navbar-dark">
        <Container>
          <Navbar.Brand href="#home">Chat With PDF</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            
            <Nav className="me-auto">
            {!loginstatus ? (
                <>
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/signup">Sign Up</Nav.Link>
                </>
              ) : (
                <>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="#" onClick={handleLogout}>LogOut</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </>
  );
}

export default Header;
