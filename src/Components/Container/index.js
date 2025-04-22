import React from "react";
import '../Styles/container.css'

export default function Container(){
    return(
        <div className="container">
        <div className="card">
            <img src={capa}></img>
            <div className="info">
                <p><strong>Titulo:</strong> {titulo}</p>
                <p><strong>Autor:</strong> {autor}</p>
                <p><strong>Ano de Lançamento:</strong> {anoLancamento}</p>
            </div>
        </div>

        <div className="btnAdd">
            <p>Adicionar livro +</p>
        </div>
        </div>
    );
}