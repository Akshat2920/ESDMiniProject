import { Container, Navbar as BootstrapNavbar, Nav, Button } from 'react-bootstrap';

function Navbar({ loggedIn, handleLogout}) {
  const handleClick = handleLogout
  
    return (
      <BootstrapNavbar bg="light" expand="lg" className="mb-4 sticky-top">
        <Container>
          <BootstrapNavbar.Brand href="#">ESD Mini Project - 5.2</BootstrapNavbar.Brand>
          <Nav className="ml-auto">
            {loggedIn ? 
            ( 
              <Button className="btn btn-danger" onClick={handleClick}>
                Logout
              </Button>
              
            ) 
            : 
            (
              <span className="navbar-text">ERP Student Specialization</span>
            )}
          </Nav>
        </Container>
      </BootstrapNavbar>
    );
  }
  
  export default Navbar;