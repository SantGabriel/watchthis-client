import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import service from '../../services';

export default class SubmitDialogObraComponent extends React.Component {

  static toEdit = false;
  static categorias = [];

  constructor(props) {
    super(props);
    this.toEdit = this.props.obra ? true : false;
    this.state = this.props.obra ?
      this.props.obra : {
        nome: '',
        tipo: '',
        dataInicio: '',
        dataFim: 0,
        categorias: [],
        avaliacao: 0,
        duracao: 0,
        nVotos: 0,
        nListas: 0,
        descricao: '',
      }
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if (this.toEdit) {
      service.obra
        .updateObra(this.props.obra._id, this.state)
        .then(() => this.props.submited(this.state));
    } else {
      service.obra
        .addObra(this.state)
        .then(obraId => this.props.submited({ ...this.state, _id: obraId }));
    }
  }

  /*listCategorias() {
    service.categoria.getCategorias()
      .then((value) => this.categorias = value)
      .catch((err) => this.setState({ error: err }));
      console.log(this.categorias);
  }*/

  handleCancel() {
    this.setState({
      nome: '',
      tipo: '',
      dataInicio: '',
      dataFim: 0,
      url: '',
      categorias: [],
      avaliacao: 0,
      duracao: 0,
      nVotos: 0,
      nListas: 0,
      descricao: '',
    });
    this.props.handleClose();
  }

  render() {
    const { show } = this.props;
    //this.listCategorias();
    return (
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>{this.toEdit ? 'Editar Obra' : 'Criar Obra'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={evt => this.handleSubmit(evt)}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                value={this.state.nome}
                onChange={evt => this.setState({ nome: evt.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Tipo</Form.Label>
              <Form.Control as="select"
                value={this.state.tipo}
                OnChange={evt => this.setState({ tipo: evt.target.value })}
              >
                <option value="anime">anime</option>
                <option value="filme">filme</option>
                <option value="serie">serie</option>
              </Form.Control>
            </Form.Group>

            {/*<Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>Categorias</Form.Label>
              <Form.Control as="select" multiple value={this.state.categorias}>
                <Select options={this.categorias} />
              </Form.Control>
            </Form.Group> */}

            <Form.Group>
              <Form.Label>Data de Inicio</Form.Label>
              <Form.Control
                value={this.state.dataInicio}
                onChange={evt => this.setState({ dataInicio: evt.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Data de Fim</Form.Label>
              <Form.Control
                value={this.state.dataFim}
                onChange={evt => this.setState({ dataFim: evt.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Duracao</Form.Label>
              <Form.Control
                type="number"
                value={this.state.duracao}
                onChange={evt => this.setState({ duracao: evt.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Descricao</Form.Label>
              <Form.Control
                value={this.state.descricao}
                onChange={evt => this.setState({ descricao: evt.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>URL da Imagem</Form.Label>
              <Form.Control
                value={this.state.url}
                onChange={evt => this.setState({ url: evt.target.value })}
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
