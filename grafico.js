document.addEventListener('DOMContentLoaded', function () {
    // Recupera os dados do formulário armazenados no Local Storage
    const dadosFormulario = JSON.parse(localStorage.getItem('dadosFormulario'));

    if (!dadosFormulario) {
        alert('Nenhum dado encontrado para gerar o gráfico.');
        return;
    }

    // Exemplo de dados para o gráfico (substitua pelos dados reais do formulário)
    const labels = ['Idade', 'Tempo de Uso (h)', 'Frequência de Sintomas'];
    const data = [
        parseInt(dadosFormulario.idade) || 0,
        parseInt(dadosFormulario.tempo) || 0,
        parseInt(dadosFormulario.frequencia) || 0
    ];

    // Configuração do gráfico
    const ctx = document.getElementById('grafico').getContext('2d');
    new Chart(ctx, {
        type: 'bar', // Tipo de gráfico (barra)
        data: {
            labels: labels,
            datasets: [{
                label: 'Dados Coletados',
                data: data,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const btnProximo = document.getElementById('btnProximo');
    const btnVoltar = document.getElementById('btnVoltar');
    const etapa1 = document.getElementById('etapa1');
    const etapa2 = document.getElementById('etapa2');
    const form = document.getElementById('formPesquisa');

    // Alterna para a segunda etapa
    btnProximo.addEventListener('click', function () {
        etapa1.style.display = 'none'; // Oculta a primeira etapa
        etapa2.style.display = 'block'; // Mostra a segunda etapa
    });

    // Alterna para a primeira etapa
    btnVoltar.addEventListener('click', function () {
        etapa2.style.display = 'none'; // Oculta a segunda etapa
        etapa1.style.display = 'block'; // Mostra a primeira etapa
    });

    // Captura os dados do formulário ao enviar
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Captura os valores de todos os campos
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Salva os dados no Local Storage
        localStorage.setItem('dadosFormulario', JSON.stringify(data));

        console.log('Dados do formulário salvos:', data);

        // Exemplo de mensagem de sucesso
        alert('Formulário enviado com sucesso!');

        // Redireciona para a página do gráfico
        window.location.href = 'grafico.html';
    });
});