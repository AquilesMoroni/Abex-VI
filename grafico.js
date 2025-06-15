function exibirMetricasModelo() {
    fetch('http://localhost:8000/metrics')
        .then(response => response.json())
        .then(metrics => {
            document.getElementById('resultado').innerHTML = `
                <h2>Métricas do Modelo (CSV)</h2>
                <ul>
                    <li><b>Acurácia:</b> ${metrics.acuracia.toFixed(2)}</li>
                    <li><b>F1-score:</b> ${metrics.f1_score.toFixed(2)}</li>
                    <li><b>Sensibilidade:</b> ${metrics.sensibilidade.toFixed(2)}</li>
                    <li><b>Precisão:</b> ${metrics.precisao.toFixed(2)}</li>
                </ul>
            `;
        });
}

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