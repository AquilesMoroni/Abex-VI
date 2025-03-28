document.addEventListener('DOMContentLoaded', function () {
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

        console.log('Dados do formulário:', data);

        // Exemplo de mensagem de sucesso
        alert('Formulário enviado com sucesso!');
    });
});