import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import services from '../../services';

export default class SubmitDialogComponent extends React.Component {
  toEdit = false;

  constructor(props) {
    super(props);
    this.state = this.props.itemLista;
  }

  handleSubmit(evt) {
    evt.preventDefault();
    services.user
      .updateItemLista(this.props.itemLista.obra._id, this.state)
      .then(() => this.props.submited(this.state));
  }

  handleCancel() {
    this.setState(this.props.itemLista);
    this.props.handleClose();
  }

  render() {
    const { show } = this.props;
    const { nota, statusItem } = this.state;

    return (
      <Modal show={show} onHide={this.handleCancel}>
        <Modal.Header>
          <Modal.Title>{this.toEdit ? 'Edit obra' : 'Create obra'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={evt => this.handleSubmit(evt)}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Nota</Form.Label>
              <Form.Control
                value={nota > 0 ? nota : 0}
                type="number"
                onChange={evt => this.setState({ nota: parseInt(evt.target.value,10) })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Status do item</Form.Label>
              <Form.Control
                value={statusItem}
                onChange={evt => this.setState({ statusItem: evt.target.value })}
              />
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleCancel()}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">Save</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
