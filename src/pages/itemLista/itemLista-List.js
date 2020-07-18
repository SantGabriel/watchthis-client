import React from "react";
import { Container, Button, Table, Alert } from "react-bootstrap";
import services from "../../services";
import "./itemLista.css";
import SearchFormComponent from "../../components/obra/SearchForm";

export default class ObraListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itensLista: [],
            error: undefined,
            toCreate: false,
            myList: false
        };
    }

    componentDidMount() {
        this.getMyList("");
    }

    //Obtem minha lista de obras
    getMyList(searchText) {
        searchText = searchText ? searchText : {};
        services.user
            .getItensListas(searchText)
            .then((value) => this.setState({ itensLista: value, myList: true }))
            .catch((err) => this.setState({ error: err }));
    }

    removeFromMyList(obraId) {
        services.user
            .removeItemLista(obraId)
            .then(() => this.getMyList())
            .catch((err) => this.setState({ error: err }));
    }

    render() {
        const { itensLista, error } = this.state;

        return (
            <Container>
                {error !== undefined && <Alert variant="danger">{error}</Alert>}
                <SearchFormComponent search={(text) => this.getMyList(text)} />
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
                                    <td style={{ cursor: "pointer" }}
                                        onClick={() => this.props.history.push(`/user/details/${itemLista.obra._id}`)}>
                                        <img style={{ height: "100px", width: "75px", border: "1px solid white" }} src={itemLista.obra.url} />
                                    </td>
                                    <td style={{ cursor: "pointer" }}
                                        onClick={() => this.props.history.push(`/user/details/${itemLista.obra._id}`)} >{itemLista.obra.nome}</td>
                                    <td style={{ cursor: "pointer" }}
                                        onClick={() => this.props.history.push(`/user/details/${itemLista.obra._id}`)} >{itemLista.obra.tipo}</td>
                                    <td style={{ cursor: "pointer" }}
                                        onClick={() => this.props.history.push(`/user/details/${itemLista.obra._id}`)} >{itemLista.nota}</td>
                                    <td style={{ cursor: "pointer" }}
                                        onClick={() => this.props.history.push(`/user/details/${itemLista.obra._id}`)} >{itemLista.statusItem}</td>
                                    <td style={{ textAlign: "right" }}>
                                        <Button variant="outline-danger" onClick={() => this.removeFromMyList(itemLista.obra._id)}>
                                            <span role="img" aria-label="Remover dos favoritos">➖</span>
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
