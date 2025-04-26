export const carregarLivros = () => {
    const livrosSalvos = JSON.parse(localStorage.getItem("livros")) || [];
    return livrosSalvos;
};

export const salvarLivro = (livros, novoLivro) => {
    const novosLivros = [...livros, novoLivro];
    localStorage.setItem("livros", JSON.stringify(novosLivros));
    return novosLivros;
};

export const removerLivro = (livros, id) => {
    const novosLivros = livros.filter(livro => livro.id !== id);
    localStorage.setItem("livros", JSON.stringify(novosLivros));
    return novosLivros;
};

export const atualizarLivro = (livros, livroAtualizado) => {
    const livrosAtualizados = livros.map(livro =>
        livro.id === livroAtualizado.id ? livroAtualizado : livro
    );
    localStorage.setItem("livros", JSON.stringify(livrosAtualizados));
    return livrosAtualizados;
};
