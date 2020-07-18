import React from "react";
import { Container, Button, Table, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
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
        };
    }

    componentDidMount() {
        this.getList();
    }

    //Obtem lista de todas as obras
    getList(/*searchText*/) {
        services.obra
            .getObras(/*searchText*/)
            .then((value) => this.setState({ obras: value }))
            .catch((err) => this.setState({ error: err }));
    }

    //Obtem minha lista de obras
    getMyList(/*searchText*/) {
        services.user
            .getItensListas(/*searchText*/)
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
        if (user) this.getMyList();
        return (
            <Container>
                {error !== undefined && <Alert variant="danger">{error}</Alert>}

                <div className="buttons-container"> {/*Se estiver nos favoritos, não permite adicionar obras*/}
                    <Button
                        variant="outline-primary"
                        style={{ alignSelf: "flex-start" }}
                        onClick={() => this.setState({ toCreate: true })}>
                        <FontAwesomeIcon icon={faPlus} />
                        &nbsp;Adicionar nova obra
                    </Button>
                </div>


                <SubmitDialogComponent
                    show={toCreate}
                    handleClose={() => this.setState({ toCreate: false })}
                    submited={(createdObra) => this.setState({ obras: [...obras, createdObra], toCreate: false })}
                />

                <Table responsive>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Imagem</th>
                            <th>Tipo</th>
                            <th>Avaliacao</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {
                            obras.map((obra, index) => (
                                <tr key={`obra${index}`} >
                                    <td>{obra.nome}</td>
                                    <td>
                                    <img style={{ height: "100px", width: "75px", border:"1px solid white" }} src={obra.url} />
                                    </td>
                                    <td>{obra.tipo}</td>
                                    <td>{obra.avaliacao.toFixed(1)}</td>
                                    <td style={{ textAlign: "right" }}>
                                        <Button
                                            variant="outline-primary"
                                            onClick={() => this.props.history.push(`/obra/details/${obra._id}`)}>
                                            <FontAwesomeIcon icon={faInfo} />
                                        </Button>
                                        {
                                            user ? //Se não estiver autenticado, não possui a opção de adicionar ao favoritos                                         
                                            (this.verifyIsInTheList(obra) ?
                                                ( //se estiver na lista, aparece a opção de remover
                                                    <Button variant="outline-danger" onClick={() => this.removeFromMyList(obra._id)}>
                                                        <FontAwesomeIcon icon={faStar} />
                                                    </Button>
                                                )
                                                :
                                                ( //se a obra não estiver na lista, aparece a opção de adicionar 
                                                    <Button variant="warning" onClick={() => this.addToMyList(obra._id)}>
                                                        <FontAwesomeIcon icon={faStar} />
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
