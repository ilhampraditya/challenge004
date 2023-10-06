import { Container, Form, Button, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../style/style.css";

function NavbarComponents() {
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();
    const query = event.target.elements.query.value;
    navigate("/search", { state: { query } });
  };
  return (
    <Navbar bg="transparent navbar-expand-lg fixed-top p-2">
      <Container fluid>
        <div>
          <Navbar.Brand
            className="text-danger fs-2 Navbar-logo"
            as={Link}
            to={"/"}
          >
            Movielist
          </Navbar.Brand>
        </div>
        <div>
          <Form onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="What do you want to watch?"
              name="query"
              className="Navbar-search"
            />
          </Form>
        </div>
        <div className="me-3">
          <Button variant="outline-danger" className="Navbar-button">
            Login
          </Button>
          <Button variant="danger" className="Navbar-button">
            Register
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavbarComponents;
