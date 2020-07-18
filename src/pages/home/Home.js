import React from 'react';
import services from "../../services";
import './Home.css';
import { Alert } from "react-bootstrap";


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      obras: [],
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
  }


  render() {
    const { obras } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <div className="movies">
            <p>Movies</p>
            <div className="row col-sm-12">
              {
                obras.map((obra, i) => {
                  if (obra.tipo !== "filme") {
                    return null;
                  }
                  return (
                    <div className="col-sm-2" key={`obra${i}`}>
                      <div className="card bg-dark" style={{ height: "400px", width: "230px" }}>

                        <img style={{ height: "324px", width: "200px", border: "1px solid white" }} className="card-img-top" alt={obra.nome} src={obra.url} />
                        <div className="card-body">
                          <h6 className="card-title">{obra.nome}</h6>
                          {/*<a href={obra.url}>*/}
                        </div>

                        {/*</a>*/}
                        <div>
                          {/*<div>
											<a href={experience.url}>{experience.companyName}</a>
										</div>*/}
                        </div>
                      </div>
                    </div>
                  );
                })
              }


            </div>
          </div>
          <div>
            <p>Anime</p>
            <div className="row col-sm-12">
              {
                obras.map((obra, i) => {
                  if (obra.tipo !== "anime") {
                    return null;
                  }
                  return (

                    <div className="col-sm-2" key={`obra${i}`}>
                      <div className="card bg-dark" style={{ height: "400px", width: "230px" }}>
                        <img style={{ height: "324px", width: "200px", border: "1px solid white" }} className="card-img-top" alt={obra.nome} src={obra.url} />
                        <div className="card-body">
                          <h6 className="card-title">{obra.nome}</h6>
                          {/*<a href={obra.url}>*/}
                        </div>

                        {/*</a>*/}
                        <div>
                          {/*<div>
											<a href={experience.url}>{experience.companyName}</a>
										</div>*/}
                        </div>
                      </div>
                    </div>
                  );
                })
              }


            </div>
          </div>
          <div className="series">
            <p>Series</p>
            <div className="row col-sm-12">
              {
                obras.map((obra, i) => {
                  if (obra.tipo !== "serie") {
                    return null;
                  }
                  return (

                    <div className="col-sm-2" key={`obra${i}`}>
                      <div className="card bg-dark" style={{ height: "400px", width: "230px" }}>
                        <img style={{ height: "324px", width: "200px", border: "1px solid white" }} className="card-img-top" alt={obra.nome} src={obra.url} />
                        <div className="card-body">
                          <h6 className="card-title">{obra.nome}</h6>
                          {/*<a href={obra.url}>*/}
                        </div>

                        {/*</a>*/}
                        <div>
                          {/*<div>
											<a href={experience.url}>{experience.companyName}</a>
										</div>*/}
                        </div>
                      </div>
                    </div>
                  );
                })
              }


            </div>
          </div>
        </header>

      </div >
    );
  }
}
