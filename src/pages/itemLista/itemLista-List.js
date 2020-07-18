import React from "react";
import { Container, Button, Table, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faStar } from "@fortawesome/free-solid-svg-icons";
import services from "../../services";
import "./itemLista.css";

export default class ObraListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itensLista: [],
            error: undefined,
            toCreate: false,
            myList: false,
        };
    }

    componentDidMount() {
        this.getList();
    }

    getList(/*searchText*/) {
        services.user
            .getItensListas(/*searchText*/)
            .then((value) => this.setState({ itensLista: value, myList: true }))
            .catch((err) => this.setState({ error: err }));
    }

    removeFromMyList(obraId) {
        services.user
            .removeItemLista(obraId)
            .then(() => this.getList())
            .catch((err) => this.setState({ error: err }));
    }

    render() {
        const { itensLista, error } = this.state;

        return (
            <Container>
                {error !== undefined && <Alert variant="danger">{error}</Alert>}
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Imagem</th>
                            <th>Tipo</th>
                            <th>Nota</th>
                            <th>StatusItem</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {
                            itensLista.map((itemLista, index) => (
                                <tr key={`itemLista${index}`}>
                                    <td>{itemLista.obra.nome}</td>
                                    <td>
                                    <img style={{ height: "100px", width: "75px", border:"1px solid white" }} src={itemLista.obra.url} />
                                    </td>
                                    <td>{itemLista.obra.tipo}</td>
                                    <td>{itemLista.nota}</td>
                                    <td>{itemLista.statusItem}</td>
                                    <td style={{ textAlign: "right" }}>
                                        <Button
                                            variant="outline-primary"
                                            onClick={() => this.props.history.push(`/user/details/${itemLista.obra._id}`)}>
                                            <FontAwesomeIcon icon={faInfo} />
                                        </Button>

                                        <Button variant="outline-danger" onClick={() => this.removeFromMyList(itemLista.obra._id)}>
                                            <FontAwesomeIcon icon={faStar} />
                                        </Button>
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
