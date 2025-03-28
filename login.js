document.addEventListener('DOMContentLoaded', function () {
    const formLogin = document.getElementById('formLogin');

    if (formLogin) {
        formLogin.addEventListener('submit', function (event) {
            event.preventDefault(); // Evita o envio do formulário

            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            // Recupera os dados do usuário do Local Storage
            const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

            if (usuarioSalvo && email === usuarioSalvo.email && senha === usuarioSalvo.senha) {
                alert('Login bem-sucedido! Bem-vindo, ' + usuarioSalvo.nome);
                // Redirecionar para a página principal ou dashboard
                window.location.href = 'dashboard.html';
            } else {
                alert('Erro: E-mail ou senha incorretos.');
            }
        });
    }
});