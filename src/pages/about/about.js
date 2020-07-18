import React from "react";
import { Link } from 'react-router-dom';

class About extends React.Component {

    render() {
        return (

            <div className="About" style={{ textAlign: "center", backgroundColor: "#282c34", color: "white", minHeight: "100vh" }}>

                <h2>Acerca do Projeto</h2>
                <br></br>
                <h4>Curso Engenharia Informática - Tecnologias da Internet II</h4>
                <br></br>
                <h5>Alunos:</h5>
                <span><b>Gabriel Santana - nº 22441</b></span>
                <br></br>
                <span><b>Luis Badalo - nº 19991</b></span>
                <br></br>
                <br></br>
                <h5>Professor:</h5>
                <span><b>Diogo Mendes</b></span>
                <br></br>
                <br></br>
                <span>Foram utilizadas diversas frameworks/bibliotecas/fontes para a resolução deste projeto:</span>
                <br></br>
                <ul>
                    <li>Aulas do Professor</li>
                    <li>react</li>
                    <li>react-router-dom</li>
                    <li>react-bootstrap</li>
                    <li>bootstrap</li>
                    <li>@fortawesome/react-fontawesome</li>
                    <li>@fortawesome/free-solid-svg-icons</li>
                    <li>
                        <a href="https://www.golangprograms.com/display-json-data-in-reactjs.html" target="_blank">https://www.golangprograms.com/display-json-data-in-reactjs.html</a>
                    </li>
                    <li>Utilização do meu projeto do ano passado para algumas parte do código feitas por Luís Badalo</li>
                </ul>






            </div>
        );
    }
}

export default About;