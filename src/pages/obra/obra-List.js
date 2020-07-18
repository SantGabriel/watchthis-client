import React from "react";
import { Container, Button, Table, Alert, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import services from "../../services";
import SubmitDialogComponent from "../../components/obra/SubmitDialog";
import SearchFormComponent from "../../components/obra/SearchForm";
import AuthContext from "../../configs/authContext";
import "./obra.css";

export default class ObraListPage extends React.Component {

    static contextType = AuthContext; //contexto do utilizador

    constructor(props) {
        super(props);
        this.state = {
            obras: [],
            itensLista: [],
            error: undefined,
            toCreate: false,
            role: []
        };
    }

    componentDidMount() {
        this.getList("");
    }

    //Obtem lista de todas as obras
    getList(searchText) {
        services.obra
            .getObras(searchText)
            .then((value) => this.setState({ obras: value }))
            .catch((err) => this.setState({ error: err }));
    }

    //Obtem minha lista de obras
    getMyList(searchText) {
        services.user
            .getItensListas(searchText)
            .then((value) => this.setState({ itensLista: value, myList: true }))
            .catch((err) => this.setState({ error: err }));
    }

    verifyIsInTheList(obra) { //verifica se a Obra está ou não na lista do User        
        return this.state.itensLista.find(itemLista => obra._id === itemLista.obra._id) ? true : false
    }

    addToMyList(obraId) {   //Adiciona uma obra à lista de obras do User
        services.user
            .addItemLista(obraId)
            .then(() => this.getList())
            .catch((err) => this.setState({ error: err }));
    }

    removeFromMyList(obraId) {
        services.user
            .removeItemLista(obraId)
            .then(() => this.getList())
            .catch((err) => this.setState({ error: err }));
    }

    render() {
        const { user } = this.context;
        const { obras, error, toCreate } = this.state;
        if (user) this.getMyList(); //obtem a lista de favoritos apenas de utilizadores autenticados
        return (
            <Container style={{ display: "grid" }}>
                {error !== undefined && <Alert variant="danger">{error}</Alert>}



                <SubmitDialogComponent
                    show={toCreate}
                    handleClose={() => this.setState({ toCreate: false })}
                    submited={(createdObra) => this.setState({ obras: [...obras, createdObra], toCreate: false })}
                />

                <Container>
                    <Row>
                        <Col xs={3}></Col>
                        <Col xs={6}>
                            <SearchFormComponent search={(text) => this.getList(text)} />
                        </Col>
                        <Col xs={3}>
                            <div className="buttons-container" > {/*Se estiver nos favoritos, não permite adicionar obras*/}
                                {user && user.role === 1 && (
                                    <Button
                                        variant="outline-primary"
                                        style={{ alignSelf: "flex-start" }}
                                        onClick={() => this.setState({ toCreate: true })}>

                                        <span role="img" aria-label="Adicionar">🖊️ </span>
                                    &nbsp;Adicionar Obra
                                    </Button>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>

                <Table responsive>
                    <thead>
                        <tr>
                            <th>Imagem</th>
                            <th>Nome</th>
                            <th>Tipo</th>
                            <th>Avaliacao</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {
                            obras.map((obra, index) => (
                                <tr key={`obra${index}`} >
                                    <td style={{ cursor: "pointer" }}
                                        onClick={() => this.props.history.push(`/obra/details/${obra._id}`)}>
                                        <img style={{ height: "100px", width: "75px", border: "1px solid white" }} src={obra.url} />
                                    </td>
                                    <td style={{ cursor: "pointer" }}
                                        onClick={() => this.props.history.push(`/obra/details/${obra._id}`)}>
                                        {obra.nome}</td>

                                    <td style={{ cursor: "pointer" }}
                                        onClick={() => this.props.history.push(`/obra/details/${obra._id}`)}>
                                        {obra.tipo}</td>

                                    <td style={{ cursor: "pointer" }}
                                        onClick={() => this.props.history.push(`/obra/details/${obra._id}`)}>
                                        {obra.avaliacao.toFixed(1)}</td>

                                    <td style={{ textAlign: "right" }}>
                                        {
                                            user ? //Se não estiver autenticado, não possui a opção de adicionar ao favoritos                                         
                                                (this.verifyIsInTheList(obra) ?
                                                    ( //se estiver na lista, aparece a opção de remover
                                                        <Button variant="outline-danger" onClick={() => this.removeFromMyList(obra._id)}>
                                                            <span role="img" aria-label="Remover dos favoritos">➖</span>
                                                        </Button>
                                                    )
                                                    :
                                                    ( //se a obra não estiver na lista, aparece a opção de adicionar 
                                                        <Button variant="success" onClick={() => this.addToMyList(obra._id)}>
                                                            <span role="img" aria-label="Adicionar aos favoritos">➕</span>
                                                        </Button>
                                                    )
                                                )
                                                :
                                                ""
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Container>
        );
    }
}
