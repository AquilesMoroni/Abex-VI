document.addEventListener('DOMContentLoaded', function () {
    const formCadastro = document.getElementById('formCadastro');

    if (formCadastro) {
        formCadastro.addEventListener('submit', function (event) {
            event.preventDefault(); // Evita o envio padrão do formulário

            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            const nome = document.getElementById('nome').value;
            const senha = document.getElementById('senha').value;
            const confirmarSenha = document.getElementById('confirmar-senha').value;

            // Verifica se as senhas coincidem
            if (senha !== confirmarSenha) {
                alert('As senhas não coincidem!');
                return;
            }

            // Cria um objeto com os dados do usuário
            const usuario = {
                email: email,
                telefone: telefone,
                nome: nome,
                senha: senha
            };

            // Salva o usuário no Local Storage
            localStorage.setItem('usuario', JSON.stringify(usuario));

            // Exibe os dados no console
            console.log('Usuário cadastrado com sucesso:', usuario);

            alert('Cadastro realizado com sucesso!');

            // Redireciona para a página de login
            window.location.href = 'jatenhocadastro.html';
        });
    }
});