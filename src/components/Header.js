import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/BookFastLogo.png";
import "../css/Header.css";
function Header() {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("user-info"));
  console.log(JSON.parse(localStorage.getItem("user-info")));
  const redirectToAdminPanel = () => {
    window.location.href = "http://localhost:8000";
  };

  function logOut() {
    localStorage.clear();
    navigate("/register", { replace: true });
  }

  return (
    <div>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand to="/home">
            <img
              src={logo}
              width="70px"
              height="70px"
              className="d-inline-block align-top"
              alt="BookFast Logo"
            />
          </Navbar.Brand>
          <Nav className="me-auto navbar_wrapper">
            <Link to="/home" className="nav-link active">
              Home
            </Link>

            {localStorage.getItem("user-info") && (
              <>
                <Link to="/venues" className="nav-link active">
                  Venues
                </Link>
                <Link to="/bookings" className="nav-link active">
                  Bookings
                </Link>
              </>
            )}
            <Link to="/contact" className="nav-link active">
              Contact
            </Link>
            <Link to="/about" className="nav-link active">
              About Us
            </Link>
          </Nav>
          <Nav className="ms-auto navbar_wrapper">
            {!localStorage.getItem("user-info") && (
              <>
                <Link to="/login" className="nav-link active">
                  Login
                </Link>
                <Link to="/register" className="nav-link active">
                  Register
                </Link>
                <button
                  onClick={redirectToAdminPanel}
                  className="btn btn-primary"
                >
                  Admin
                </button>
              </>
            )}
          </Nav>
          <Nav>
            {user && (
              <NavDropdown title={user ? user.name : "Empty"}>
                <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
export default Header;
