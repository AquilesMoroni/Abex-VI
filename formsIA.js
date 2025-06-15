document.addEventListener('DOMContentLoaded', function () {
    const btnProximo = document.getElementById('btnProximo');
    const btnVoltar = document.getElementById('btnVoltar');
    const etapa1 = document.getElementById('etapa1');
    const etapa2 = document.getElementById('etapa2');
    const form = document.getElementById('formPesquisa');

    // Alterna para a segunda etapa
    btnProximo.addEventListener('click', function () {
        etapa1.style.display = 'none';
        etapa2.style.display = 'block';
    });

    // Alterna para a primeira etapa
    btnVoltar.addEventListener('click', function () {
        etapa2.style.display = 'none';
        etapa1.style.display = 'block';
    });

    function mapGenero(valor) {
        if (valor.toLowerCase().includes('masc')) return 1;
        if (valor.toLowerCase().includes('fem')) return 0;
        return 2;
    }
    function mapSimNao(valor) {
        if (valor.toLowerCase().includes('sim')) return 1;
        if (valor.toLowerCase().includes('não') || valor.toLowerCase().includes('nao')) return 0;
        return 0;
    }

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        // Captura o nome do aluno
        const nomeAluno = document.getElementById('nome').value;

        // Mapeie os campos do formulário para os campos esperados pela API
        const Gender = mapGenero(document.getElementById('genero').value);
        const Age = parseInt(document.getElementById('idade').value);
        const Helpful_for_studying = mapSimNao(document.getElementById('utilidade').value);
        const Daily_usages = parseInt(document.getElementById('tempo').value) || 0;
        const Performance_impact = mapSimNao(document.getElementById('desempenho').value);
        const Usage_distraction = mapSimNao(document.getElementById('distracao').value);
        const Attention_span = mapSimNao(document.getElementById('atencao').value);
        const Useful_features = document.getElementById('recursos').value.length;
        const Beneficial_subject = document.getElementById('disciplinas').value.length;
        const Usage_symptoms = mapSimNao(document.getElementById('sintomas').value);
        const Symptom_frequency = document.getElementById('frequencia').value.length;
        const Health_precautions = mapSimNao(document.getElementById('precaucoes').value);
        const Mobile_phone_use_for_education = mapSimNao(document.getElementById('uso-educacional').value);
        const Health_rating = document.getElementById('saude').value.length;

        // Aqui passamos SOMENTE OS VALORES IMPORTANTES PARA A IA:
        const dados = {
            Gender,
            Age,
            Helpful_for_studying,
            Daily_usages,
            Performance_impact,
            Usage_distraction,
            Attention_span,
            Useful_features,
            Beneficial_subject,
            Usage_symptoms,
            Symptom_frequency,
            Health_precautions,
            Mobile_phone_use_for_education,
            Health_rating
        };

        try {
            const response = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
            const resultado = await response.json();
            resultado.nomeAluno = nomeAluno; // Adiciona o nome para exibir depois
            localStorage.setItem('resultadoIA', JSON.stringify(resultado));
            window.location.href = 'grafico.html';
        } catch (error) {
            alert('Erro ao conectar com a API: ' + error);
        }
    });
});