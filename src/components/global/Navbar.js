import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Form, Button, FormControl } from "react-bootstrap";
import AuthContext from "../../configs/authContext";
import services from "../../services";
export default class NavbarComponent extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      obras: [],
    }
  }

  componentDidMount() {
    this.getList();
  }

  getList(searchText) {
    services.obra
      .getObras(searchText)
      .then((value) => this.setState({ obras: value }))
      .catch((err) => this.setState({ error: err }));
  }

  render() {
    const { user, logout } = this.context;

    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} exact to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} exact to="/obra/list/">
                Obras
                  </Nav.Link>
              {user && (
                <Nav.Link as={NavLink} to="/user/list">
                  Minha Lista
                </Nav.Link>
              )}
            </Nav>
            <Nav>
              {user ? (
                <NavDropdown title={user.username} alignRight>
                  <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                  <Nav.Link as={NavLink} to="/login">
                    Login
                  </Nav.Link>
                )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
