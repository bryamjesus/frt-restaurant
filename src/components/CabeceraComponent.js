import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AppContext } from "../context/AppContext";

function CabeceraComponent() {
  const { nombre, rol, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const handleLogut = () => {
    logout();
    navigate("/");
  };
  return (
    nombre && (
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Link className="navbar-brand" to="/principal">
            CodiGo Restaurante
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavLink className="nav-link" to="/principal">
                Inicio
              </NavLink>
              {rol === "A" && (
                <>
                  <NavLink className="nav-link" to="/categorias">
                    Categorías
                  </NavLink>
                  <NavLink className="nav-link" to="/platos">
                    Platos
                  </NavLink>
                </>
              )}
              {rol === "M" && (
                <NavLink className="nav-link" to="/pedidos">
                  Pedidos
                </NavLink>
              )}
              {rol === "C" && (
                <NavLink className="nav-link" to="/cocina">
                  Cocina
                </NavLink>
              )}
            </Nav>
            <NavDropdown title={nombre} id="navbarScrollingDropdown">
              <NavDropdown.Item href="#">Cuenta</NavDropdown.Item>
              <NavDropdown.Item href="#">Configuración</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogut}>Salir</NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  );
}

export default CabeceraComponent;
