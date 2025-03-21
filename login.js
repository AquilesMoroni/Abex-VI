document.getElementById('formLogin').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Dados de exemplo para validação
    const usuarioCorreto = "aquilesmoroniexpres@hotmail.com";
    const senhaCorreta = "#123";

    if (email === usuarioCorreto && senha === senhaCorreta) {
        console.log("Login bem-sucedido! Usuário autenticado.");
    } else {
        console.log("Erro: E-mail ou senha incorretos.");
    }
}); 