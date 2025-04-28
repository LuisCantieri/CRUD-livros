import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Card, Container } from 'react-bootstrap';
import '../Styles/Container/container.css'; // seu CSS
import {
    carregarLivros,
    salvarLivro,
    removerLivro,
    atualizarLivro
} from '../../Services/index.js';

export default function BookContainer() {
    const [showModal, setShowModal] = useState(false);
    const [livros, setLivros] = useState([]);
    const [livroEditando, setLivroEditando] = useState(null);

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
            id: livroEditando ? livroEditando.id : Date.now(),
            imagem,
            titulo,
            autor,
            ano
        };

        const novosLivros = livroEditando
            ? atualizarLivro(livros, novoLivro)
            : salvarLivro(livros, novoLivro);

        setLivros(novosLivros);
        setShowModal(false);
        setLivroEditando(null);
    };

    const editarLivro = (livro) => {
        setLivroEditando(livro);
        setShowModal(true);

        setTimeout(() => {
            document.querySelector('#imagem').value = livro.imagem;
            document.querySelector('#titulo').value = livro.titulo;
            document.querySelector('#autor').value = livro.autor;
            document.querySelector('#ano').value = livro.ano;
        }, 0);
    };

    const removerPeloId = (id) => {
        if (window.confirm("Tem certeza que deseja remover este livro?")) {
            const novosLivros = removerLivro(livros, id);
            setLivros(novosLivros);
        }
    };

    const abrirModalParaAdicionar = () => {
        setLivroEditando(null);
        setShowModal(true);
        setTimeout(() => {
            document.querySelector('#imagem').value = '';
            document.querySelector('#titulo').value = '';
            document.querySelector('#autor').value = '';
            document.querySelector('#ano').value = '';
        }, 0);
    };

    return (
        <Container className="container">
            {livros.map((livro) => (
                <Card key={livro.id} className="card">
                    <Card.Img variant="top" src={livro.imagem} alt="Capa do livro" />
                    <Card.Body className="info">
                        <Card.Title><strong>Título:</strong> {livro.titulo}</Card.Title>
                        <Card.Text><strong>Autor:</strong> {livro.autor}</Card.Text>
                        <Card.Text><strong>Ano de Lançamento:</strong> {livro.ano}</Card.Text>
                        <Button variant="danger" className="btnRemover" onClick={() => removerPeloId(livro.id)}>Remover</Button>
                        <Button variant="info" className="btnEditar" onClick={() => editarLivro(livro)}>Editar</Button>
                    </Card.Body>
                </Card>
            ))}

            <Button variant="primary" className="btnAdd" onClick={abrirModalParaAdicionar}>
                Adicionar livro +
            </Button>

            {/* Modal corrigido */}
            {showModal && (
                <div className="custom-modal-overlay">
                    <div className="custom-modal-content">
                        <h2>{livroEditando ? 'Editar Livro' : 'Adicionar Livro'}</h2>
                        <Form>
                            <Form.Group controlId="imagem">
                                <label className="imagemL">Imagem de URL:</label> <br></br>
                                <Form.Control className="imagem" type="text" placeholder="Insira a URL da imagem" />
                            </Form.Group>
                            <Form.Group controlId="titulo">
                            <label className="tituloL">⠀Título:</label> <br></br>
                                <Form.Control className="titulo" type="text" placeholder="Título do livro" />
                            </Form.Group>
                            <Form.Group controlId="autor">
                            <label className="autorL">Autor:</label> <br></br>
                                <Form.Control className="autor" type="text" placeholder="Nome do autor" />
                            </Form.Group>
                            <Form.Group controlId="ano">
                            <label className="anoL">Ano de lançamento:</label> <br></br>
                                <Form.Control className="ano" type="text" placeholder="Ano de lançamento" />
                            </Form.Group>
                        </Form>
                        <div className="modal-buttons">
                            <Button className="btnCancelar" onClick={() => setShowModal(false)}>
                                Cancelar
                            </Button>
                            <Button className="btnSalvar" onClick={salvarLivros}>
                                Salvar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Container>
    );
}
