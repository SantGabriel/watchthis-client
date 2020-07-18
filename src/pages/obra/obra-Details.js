import React from 'react';
import { Container, Button, Col, Row, Jumbotron, Badge, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import service from '../../services';
import RemoveDialogComponent from '../../components/obra/RemoveDialog';
import SubmitDialogComponent from '../../components/obra/SubmitDialog';

export default class ObraDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            obra: undefined,
            error: undefined,
            toRemove: false,
            toUpdate: false,
        };
    }

    componentDidMount() {
        service.obra
            .getObra(this.props.match.params.id)
            .then(value => this.setState({ obra: value }))
            .catch(err => this.setState({ error: err }));
    }

    render() {
        const { obra, error, toRemove, toUpdate } = this.state;

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
                {obra !== undefined
                    ? <div>
                        <Jumbotron>
                            <div className="row col-sm-12">
                                <div className="col-sm-6">
                                <h1>{obra.nome}
                                        </h1>
                                        </div>
                                    <div className="col-sm-6" style={{ paddingLeft:"200px"}}>
                                    <img style={{ height: "274px", width: "200px", border: "1px solid white", }} className="card-img-top" alt={obra.nome} src={obra.url} />
                                    </div>
                                
                                
                            </div>



                            <Row>
                                <Col xs={4} md={3} lg={2}>
                                    <Badge variant="secondary">Tipo de obra</Badge>
                                </Col>
                                <Col xs={8} md={9} lg={10}>{obra.tipo}</Col>
                            </Row>
                            <Row>
                                <Col xs={4} md={3} lg={2}>
                                    <Badge variant="secondary">Data de Lançamento</Badge>
                                </Col>
                                <Col xs={8} md={9} lg={10}>{obra.dataInicio}</Col>
                            </Row>
                            {
                                (obra.tipo !== "filme") &&
                                <Row>
                                    <Col xs={4} md={3} lg={2}>
                                        <Badge variant="secondary">Data Fim</Badge>
                                    </Col>
                                    <Col xs={8} md={9} lg={10}>{obra.dataFim}</Col>
                                </Row>
                            }
                            <Row>
                                <Col xs={4} md={3} lg={2}>
                                    <Badge variant="secondary">Avaliacao</Badge>
                                </Col>
                                <Col xs={8} md={9} lg={10}>{obra.avaliacao}</Col>
                            </Row>
                            <Row>
                                <Col xs={4} md={3} lg={2}>
                                    <Badge variant="secondary">Duracao</Badge>
                                </Col>

                                <Col xs={8} md={9} lg={10}>
                                    {//filme: minutos / serie: temporadas / anime: nº de episódios
                                        obra.duracao +
                                        (
                                            (obra.tipo === "filme") ? " minutos" :
                                                (obra.tipo === "serie") ? " temporadas" :
                                                    " episódios"
                                        )
                                    }
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={4} md={3} lg={2}>
                                    <Badge variant="secondary">Nº de Votos</Badge>
                                </Col>
                                <Col xs={8} md={9} lg={10}>{obra.nVotos}</Col>
                            </Row>
                            <Row>
                                <Col xs={4} md={3} lg={2}>
                                    <Badge variant="secondary">Nº de Lista</Badge>
                                </Col>
                                <Col xs={8} md={9} lg={10}>{obra.nListas}</Col>
                            </Row>
                            <Row>
                                <Col xs={4} md={3} lg={2}>
                                    <Badge variant="secondary">Descrição</Badge>
                                </Col>
                                <Col xs={8} md={9} lg={10}>{obra.descricao}</Col>
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
                                    onClick={() => this.setState({ toRemove: true })}>
                                    Remove
                                </Button>
                            </p>
                        </Jumbotron>

                        <RemoveDialogComponent
                            obraId={obra._id}
                            show={toRemove}
                            handleClose={() => this.setState({ toRemove: false })}
                            removed={() => this.props.history.goBack()}
                        />
                        <SubmitDialogComponent
                            obra={obra}
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
