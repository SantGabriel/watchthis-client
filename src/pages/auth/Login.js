import React from "react";
import services from "../../services";
import { Form, Button, Card, Alert } from "react-bootstrap";
import AuthContext from "../../configs/authContext";
import "./Auth.css";

export default class LoginPage extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMsg: "" // Mensagem de erro para usar em alerts
     
    };

  }

  handleSubmit(evt) {
    evt.preventDefault();
    services.user
      .login(this.state)
      .then((data) => {
        this.context.login({ username: this.state.username, ...data });
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({
          errorMsg: "Ocorreu um erro, verifique os dados novamente."
        });
      });
  }

  render() {
    const { username, password } = this.state;
    return (
      <div id="auth-board">
        <Card style={{ width: "18rem" }}>
          <Form onSubmit={(evt) => this.handleSubmit(evt)}>
            <Card.Body>
              <Card.Title>Login</Card.Title>

              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control value={username} onChange={(evt) => this.setState({ username: evt.target.value })} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(evt) => this.setState({ password: evt.target.value })}
                />
              </Form.Group>

              <Button variant="primary" type="submit" block>
                Login
              </Button>
              <Button variant="outline-secondary" size="sm" onClick={() => this.props.history.push("/register")} block>
                Register
              </Button>
            </Card.Body>
          </Form>
        </Card>
        <div style={{paddingTop:"10px"}}>
        {this.state.errorMsg !== "" ? (
                <Alert variant="danger">{this.state.errorMsg}</Alert>
              ) : null}
        </div>
      </div>

    );
  }
}
