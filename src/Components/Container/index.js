import React, { useState, useEffect } from "react";
import '../Styles/Container/container.css';

import { carregarLivros, salvarLivro, removerLivro } from '../../Services/index.js';

export default function Container() {
    const [showModal, setShowModal] = useState(false);
    const [livros, setLivros] = useState([]); 

    useEffect(() => {
        const livrosSalvos = carregarLivros();
        setLivros(livrosSalvos);
    }, []);

    const salvarLivros = () => {
        const imagem = document.querySelector('#imagem').value;
        const titulo = document.querySelector('#titulo').value;
        const autor = document.querySelector('#autor').value;
        const ano = document.querySelector('#ano').value;

        if (!imagem || !titulo || !autor || !ano) {
            alert("Preencha todos os campos!");
            return;
        }

        const novoLivro = {
            id: Date.now(),
            imagem,
            titulo,
            autor,
            ano
        };

        const novosLivros = salvarLivro(livros, novoLivro);
        setLivros(novosLivros);
        setShowModal(false);
    };

    const removerPeloId = (id) => {
        if (window.confirm("Tem certeza que deseja remover este livro?")) {
            const novosLivros = removerLivro(livros, id);
            setLivros(novosLivros);
        }
    };

    return (
        <div className="container">
            {livros.map((livro) => (
                <div key={livro.id} className="card">
                    <img src={livro.imagem} alt="Capa do livro" />
                    <div className="info">
                        <p><strong>Titulo:</strong> {livro.titulo}</p>
                        <p><strong>Autor:</strong> {livro.autor}</p>
                        <p><strong>Ano de Lançamento:</strong> {livro.ano}</p>
                        <button className="btnRemover" onClick={() => removerPeloId(livro.id)}>Remover</button>
                    </div>
                </div>
            ))}

            <div className="btnAdd" onClick={() => setShowModal(true)}>
                <p>Adicionar livro +</p>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="conteudoModal">
                        <h2>Adicionar Livro</h2>
                        <input id="imagem" placeholder="URL da imagem" />
                        <input id="titulo" placeholder="Nome do livro" />
                        <input id="autor" placeholder="Autor" />
                        <input id="ano" placeholder="Ano de lançamento" />
                        <button onClick={salvarLivros} className="btnSalvar">Salvar</button>
                        <button onClick={() => setShowModal(false)} className="btnCancelar">Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
}