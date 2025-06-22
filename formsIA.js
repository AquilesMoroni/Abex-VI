document.addEventListener('DOMContentLoaded', function () {
    const btnProximo = document.getElementById('btnProximo');
    const btnVoltar = document.getElementById('btnVoltar');
    const etapa1 = document.getElementById('etapa1');
    const etapa2 = document.getElementById('etapa2');
    const form = document.getElementById('formPesquisa');

    // Validação instantânea para campos com pattern
    document.querySelectorAll('input[pattern]').forEach(function(input) {
        input.addEventListener('input', function() {
            if (!input.checkValidity()) {
                input.setCustomValidity(input.title);
            } else {
                input.setCustomValidity('');
            }
        });
    });

    btnProximo.addEventListener('click', function () {
        // Valida todos os campos obrigatórios da etapa 1
        const etapa1Campos = etapa1.querySelectorAll('input, select');
        let valido = true;
        etapa1Campos.forEach(campo => {
            if (!campo.checkValidity()) {
                campo.reportValidity();
                valido = false;
            }
        });
        if (!valido) return;
        etapa1.style.display = 'none';
        etapa2.style.display = 'block';
    });

    btnVoltar && btnVoltar.addEventListener('click', function () {
        etapa2.style.display = 'none';
        etapa1.style.display = 'block';
    });

    // Funções de mapeamento para campos específicos
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
    function mapFrequencia(valor) {
        if (valor === "Nenhuma vez") return 0;
        if (valor === "As vezes") return 1;
        if (valor === "A todo momento") return 2;
        return 0;
    }
    function mapSaude(valor) {
        if (valor === "Excellent") return 3;
        if (valor === "Good") return 2;
        if (valor === "Fair") return 1;
        if (valor === "Poor") return 0;
        return 0;
    }
    function contarItens(texto) {
        if (!texto) return 0;
        return texto.split(',').filter(item => item.trim() !== '').length;
    }

    form.addEventListener('submit', async function (event) {
        // Valida todos os campos obrigatórios da etapa 2
        const etapa2Campos = etapa2.querySelectorAll('input, select');
        let valido = true;
        etapa2Campos.forEach(campo => {
            if (!campo.checkValidity()) {
                campo.reportValidity();
                valido = false;
            }
        });
        if (!valido) {
            event.preventDefault();
            return;
        }

        event.preventDefault();

        // Remove o required dos campos da etapa 1 (que estão ocultos)
        document.querySelectorAll('#etapa1 [required]').forEach(el => el.required = false);

        // Validação extra para nome (apenas letras e espaços)
        const nomeAluno = document.getElementById('nome').value.trim();
        if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nomeAluno)) {
            alert("O nome deve conter apenas letras e espaços.");
            return;
        }

        // Validação extra para campos livres (atividades, aplicativos, recursos, disciplinas, frequencia)
        const camposLivres = ['atividades', 'aplicativos', 'recursos', 'disciplinas', 'frequencia'];
        for (let campo of camposLivres) {
            const valor = document.getElementById(campo).value.trim();
                if (valor && !/^[A-Za-zÀ-ÿ\s,\-]+$/.test(valor)) {
                alert("O campo '" + campo + "' deve conter apenas letras, vírgulas, hífens e espaços.");
                return;
            }
        }

        // Mapeie os campos do formulário para os campos esperados pela API
        const Gender = mapGenero(document.getElementById('genero').value);
        const Age = parseInt(document.getElementById('idade').value);
        const Helpful_for_studying = mapSimNao(document.getElementById('utilidade').value);
        const Daily_usages = parseInt(document.getElementById('tempo').value) || 0;
        const Performance_impact = mapSimNao(document.getElementById('desempenho').value);
        const Usage_distraction = mapSimNao(document.getElementById('distracao').value);
        const Attention_span = mapSimNao(document.getElementById('atencao').value);
        const Useful_features = contarItens(document.getElementById('recursos').value);
        const Beneficial_subject = contarItens(document.getElementById('disciplinas').value);
        const Usage_symptoms = mapSimNao(document.getElementById('sintomas').value);
        const Symptom_frequency = mapFrequencia(document.getElementById('frequencia').value);
        const Health_precautions = mapSimNao(document.getElementById('precaucoes').value);
        const Mobile_phone_use_for_education = mapSimNao(document.getElementById('uso-educacional').value);
        const Health_rating = mapSaude(document.getElementById('saude').value);

        // Mapeamento para colunas one-hot extras
        const sistema = document.getElementById('sistema').value;
        const aplicativos = document.getElementById('aplicativos').value;
        const atividades = document.getElementById('atividades').value;

        const extraFeatures = {
            "Mobile Operating System_IOS": sistema === "IOS" ? 1 : 0,
            "Educational Apps_Study Planner": aplicativos === "Study Planner" ? 1 : 0,
            "Educational Apps_Language": aplicativos === "Language" ? 1 : 0,
            "Educational Apps_Productivity Tools": aplicativos === "Productivity Tools" ? 1 : 0,
            "Educational Apps_Educational Videos": aplicativos === "Educational Videos" ? 1 : 0,
            "Mobile phone activities_Social Media;Web-browsing;Messaging;All of these": atividades === "All of these" ? 1 : 0,
            "Mobile phone activities_Social Media": atividades === "Social Media" ? 1 : 0,
            "Mobile phone activities_Web-browsing": atividades === "Web-browsing" ? 1 : 0,
            "Mobile phone activities_Messaging": atividades === "Messaging" ? 1 : 0
        };

        // Crie o objeto com os dados do formulário
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
            Health_rating,
            ...extraFeatures // Adiciona as colunas one-hot
        };

        // Envie os dados para a API
        try {
            const response = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
            const resultado = await response.json();
            resultado.nomeAluno = nomeAluno;
            localStorage.setItem('resultadoIA', JSON.stringify(resultado));
            window.location.href = 'grafico.html';
        } catch (error) {
            alert('Erro ao conectar com a API: ' + error);
        }
    });
}); 