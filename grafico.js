// Aqui exibimos o resultado individual do aluno que esta armazenado no localStorage não precisando de banco de dados
document.addEventListener('DOMContentLoaded', function () {
    const resultado = JSON.parse(localStorage.getItem('resultadoIA'));
    if (resultado && resultado.probability !== undefined) {
        document.getElementById('resultado').innerHTML =
            `<h2>Previsão Individual</h2>
            <p>O aluno <b>${resultado.nomeAluno || 'NÃO IDENTIFICADO'}</b> está <b>${resultado.probability}%</b> afetado pelo uso do celular nos estudos.</p>`;
    } else {
        document.getElementById('resultado').innerText =
            'Nenhum dado encontrado para gerar o resultado individual.';
    }
});