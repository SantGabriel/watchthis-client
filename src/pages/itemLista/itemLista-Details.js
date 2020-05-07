import React from 'react';
import { Container, Button, Col, Row, Jumbotron, Badge, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import SubmitDialogComponent from '../../components/itemLista/itemLista-SubmitDialog';
import service from '../../services';

export default class ItemListaDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemLista: undefined,
            error: undefined,
            toUpdate: false,
        };
    }

    componentDidMount() {
        service.user
            .getItemLista(this.props.match.params.id)
            .then(value => this.setState({ itemLista: value }))
            .catch(err => this.setState({ error: err }));
    }

    removeItemLista() {
        service.user.removeItemLista(this.props.obraId).then(() => {
            this.props.removed();
        });
    }

    render() {
        const { itemLista, error, toUpdate } = this.state;

        return (
            <Container>
                <Button
                    variant="outline-primary"
                    style={{ margin: '10px 0' }}
                    onClick={() => this.props.history.goBack()} >
                    <FontAwesomeIcon icon={faArrowLeft} />&nbsp;Back to list
                </Button>
                {error !== undefined &&
                    <Alert variant="danger">
                        {error}
                    </Alert>}
                {itemLista !== undefined
                    ? <div>
                        <Jumbotron>
                            <h1>{itemLista.obra.nome}</h1>
                            <h3>Sua avaliação: {itemLista.nota > 0 ? itemLista.nota : "none"}</h3>
                            <h3>Situação da obra: {itemLista.statusItem}</h3>
                            <Row>
                                <Col xs={4} md={3} lg={2}>
                                    <Badge variant="secondary">Tipo de obra</Badge>
                                </Col>
                                <Col xs={8} md={9} lg={10}>{itemLista.obra.tipo}</Col>
                            </Row>
                            <Row>
                                <Col xs={4} md={3} lg={2}>
                                    <Badge variant="secondary">Data de Lançamento</Badge>
                                </Col>
                                <Col xs={8} md={9} lg={10}>{itemLista.obra.dataInicio}</Col>
                            </Row>
                            {
                                (itemLista.obra.tipo !== "filme") &&
                                <Row>
                                    <Col xs={4} md={3} lg={2}>
                                        <Badge variant="secondary">Data Fim</Badge>
                                    </Col>
                                    <Col xs={8} md={9} lg={10}>{itemLista.obra.dataFim}</Col>
                                </Row>
                            }
                            <Row>
                                <Col xs={4} md={3} lg={2}>
                                    <Badge variant="secondary">Avaliacao do público</Badge>
                                </Col>
                                <Col xs={8} md={9} lg={10}>{itemLista.obra.avaliacao}</Col>
                            </Row>
                            <Row>
                                <Col xs={4} md={3} lg={2}>
                                    <Badge variant="secondary">Nº de Votos</Badge>
                                </Col>
                                <Col xs={8} md={9} lg={10}>{itemLista.obra.nVotos}</Col>
                            </Row>
                            <Row>
                                <Col xs={4} md={3} lg={2}>
                                    <Badge variant="secondary">Nº de Lista</Badge>
                                </Col>
                                <Col xs={8} md={9} lg={10}>{itemLista.obra.nListas}</Col>
                            </Row>
                            <Row>
                                <Col xs={4} md={3} lg={2}>
                                    <Badge variant="secondary">Duracao</Badge>
                                </Col>

                                <Col xs={8} md={9} lg={10}>
                                    {//filme: minutos / serie: temporadas / anime: nº de episódios
                                        itemLista.obra.duracao +
                                        (
                                            (itemLista.obra.tipo === "filme") ? " minutos" :
                                                (itemLista.obra.tipo === "serie") ? " temporadas" :
                                                    " episódios"
                                        )
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4} md={3} lg={2}>
                                    <Badge variant="secondary">Descrição</Badge>
                                </Col>
                                <Col xs={8} md={9} lg={10}>{itemLista.obra.descricao}</Col>
                            </Row>
                            <br />
                            <p>
                                <Button
                                    variant="dark"
                                    onClick={() => this.setState({ toUpdate: true })}>
                                    Update
                                </Button>&nbsp;
                                <Button
                                    variant="danger"
                                    onClick={() => this.removeItemLista(itemLista.obra._id)}>
                                    Remove
                                </Button>
                            </p>
                        </Jumbotron>

                        <SubmitDialogComponent
                            itemLista={itemLista}
                            show={toUpdate}
                            handleClose={() => this.setState({ toUpdate: false })}
                            submited={updatedObra =>
                                this.setState({ obra: updatedObra, toUpdate: false })}
                        />
                    </div>
                    : <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>}
            </Container>
        );
    }
}
