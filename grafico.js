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
    // Recupera o resultado salvo pela IA
    const resultado = JSON.parse(localStorage.getItem('resultadoIA'));

    // Exibe o resultado na página
    if (resultado && resultado.health_risk_prediction !== undefined) {
        document.getElementById('resultado').innerText =
            'Previsão de risco à saúde: ' + resultado.health_risk_prediction;

        // Exemplo de gráfico simples usando Chart.js
        const ctx = document.getElementById('grafico').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Risco à saúde'],
                datasets: [{
                    label: 'Previsão',
                    data: [resultado.health_risk_prediction],
                    backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                    borderColor: ['rgba(255, 99, 132, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    } else {
        document.getElementById('resultado').innerText =
            'Nenhum dado encontrado para gerar o gráfico.';
    }
});