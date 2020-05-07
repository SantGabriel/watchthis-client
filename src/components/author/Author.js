import React from 'react';
import {Card, Button, Badge, ListGroup} from 'react-bootstrap';
import niceguy from '../../assets/niceguy.jpg';

class AuthorComponent extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      date: new Date (),
      isAvailable: true,
      skills: ['Javascript', 'NodeJS', 'React'],
    };
  }

  componentDidMount () {
    this.timer = setInterval (this.thick, 1000);
  }

  componentWillUnmount () {
    clearInterval (this.timer);
  }

  thick = () => {
    this.setState ({date: new Date ()});
  };

  handleClick = e => {
    this.setState (state => ({isAvailable: !state.isAvailable}));
  };

  render () {
    return (
      <Card style={{width: '13rem'}}>
        <Card.Img variant="top" src={niceguy} />
        <Card.Body>
          <Card.Title>{this.props.name}</Card.Title>
          <Card.Subtitle>{this.props.info.work}</Card.Subtitle>
          <Card.Text>
            {this.state.date.toLocaleTimeString ()}
            <br />
            {this.props.info.description}
          </Card.Text>
          <Button variant="primary" onClick={this.handleClick}>
            Switch availability
          </Button>
          {this.state.isAvailable
            ? <Badge variant="success">Available</Badge>
            : <Badge variant="danger">Unavailable</Badge>}
          <ListGroup>
            {this.state.skills.map ((skill, index) => (
              <ListGroup.Item key={'skill' + index.toString ()}>
                {skill}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    );
  }
}

export const Author = AuthorComponent;