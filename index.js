document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formCadastro');

    // Certifique-se de que o listener seja registrado apenas uma vez
    if (!form.dataset.listenerAdded) {
        form.addEventListener('submit', function (event) {
            console.log('Evento submit capturado!');
            event.preventDefault(); // Evita o envio padrão do formulário

            // Captura os valores dos campos do formulário
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            const nome = document.getElementById('nome').value;
            const senha = document.getElementById('senha').value;
            const confirmarSenha = document.getElementById('confirmar-senha').value;

            console.log('Valores capturados:', { email, telefone, nome, senha, confirmarSenha });

            // Verifica se as senhas coincidem
            if (senha !== confirmarSenha) {
                alert('As senhas não coincidem!');
                return;
            }

            // Cria um objeto com os dados do formulário
            const dadosFormulario = {
                email: email,
                telefone: telefone,
                nome: nome,
                senha: senha
            };

            console.log('Dados do formulário:', dadosFormulario);

            // Simula envio ao backend
            setTimeout(() => {
                console.log('Simulando envio ao backend...');
                alert('Cadastro realizado com sucesso!');
            }, 1000);
        });

        // Marca o formulário como tendo o listener registrado
        form.dataset.listenerAdded = true;
    }
}); 