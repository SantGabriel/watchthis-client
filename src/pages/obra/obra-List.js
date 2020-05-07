import React from "react";
import { Container, Button, Table, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import services from "../../services";
import SubmitDialogComponent from "../../components/obra/SubmitDialog";
import SearchFormComponent from "../../components/obra/SearchForm";
import "./obra.css";

export default class ObraListPage extends React.Component {
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

    getList(/*searchText*/) {
        services.obra
            .getObras(/*searchText*/)
            .then((value) => this.setState({ obras: value }))
            .catch((err) => this.setState({ error: err }));

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
            .then(() => alert("successfuly added"))
            .catch((err) => this.setState({ error: err }));
    }

    removeFromMyList(obraId) {
        services.user
            .removeItemLista(obraId)
            .then(() => this.setState((state) => ({ obras: state.obras.filter((b) => b._id !== obraId) })))
            .catch((err) => this.setState({ error: err }));
    }

    render() {
        const { obras, error, toCreate } = this.state;

        return (
            <Container>
                {error !== undefined && <Alert variant="danger">{error}</Alert>}

                <div className="buttons-container"> {/*Se estiver nos favoritos, não permite adicionar obras*/}
                    <Button
                        variant="outline-primary"
                        style={{ alignSelf: "flex-start" }}
                        onClick={() => this.setState({ toCreate: true })}>
                        <FontAwesomeIcon icon={faPlus} />
                        &nbsp;Add new obra
                    </Button>
                    <SearchFormComponent search={(text) => this.getList(text)} />
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
                                    <td>{obra.tipo}</td>
                                    <td>{obra.avaliacao}</td>
                                    <td style={{ textAlign: "right" }}>
                                        <Button
                                            variant="outline-primary"
                                            onClick={() => this.props.history.push(`/obra/details/${obra._id}`)}>
                                            <FontAwesomeIcon icon={faInfo} />
                                        </Button>
                                        {
                                            this.verifyIsInTheList(obra) ?
                                                ( //se estiver na lista, aparece a opção de remover
                                                    
                                                    <Button variant="outline-danger" onClick={() => this.removeFromMyList(obra._id)}>
                                                        <FontAwesomeIcon icon={faStar} />
                                                    </Button>
                                                )
                                                :
                                                ( //se não estiver na lista, aparece a opção de adicionar 
                                                    <Button variant="warning" onClick={() => this.addToMyList(obra._id)}>
                                                        <FontAwesomeIcon icon={faStar} />
                                                    </Button>
                                                )
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
