document.addEventListener('DOMContentLoaded', function () {
    // Tenta obter o resultado do localStorage.
    const resultado = JSON.parse(localStorage.getItem('resultadoIA'));
    
    // Pega os elementos da página.
    const container = document.getElementById('resultado');
    
    // Seleciona o contêiner onde as animações serão adicionadas.
    const animacaoContainer = document.getElementById('animacao-container');

    // Função para gerar uma cor aleatória de uma lista.
    function getCorAleatoria(cores) {
        return cores[Math.floor(Math.random() * cores.length)];
    }

    // Função que cria e anima os foguetes.
    function animacaoFoguetes(qtd) {
        const cores = ['#ff0', '#f00', '#0ff', '#f0f', '#0f0'];
        for (let i = 0; i < qtd; i++) {
            const foguete = document.createElement('div');
            foguete.className = 'foguete';
            foguete.style.left = `${Math.random() * 100}vw`;
            foguete.style.bottom = `${Math.random() * 20}vh`; // Posição inicial na parte de baixo
            const corAleatoria = getCorAleatoria(cores);
            foguete.style.boxShadow = `0 0 5px 2px ${corAleatoria}, 0 0 10px 4px ${corAleatoria}, 0 0 15px 6px ${corAleatoria}`;
            
            // Adiciona o foguete ao contêiner de animação.
            animacaoContainer.appendChild(foguete);
            
            // Remove o foguete após a animação terminar.
            foguete.addEventListener('animationend', () => foguete.remove());
        }
    }

    // Função que cria e anima os confetes.
    function animacaoConfete(qtd) {
        const cores = ['#ffd600', '#fff176', '#ffb300', '#ffe082', '#fffde7'];
        for (let i = 0; i < qtd; i++) {
            const confete = document.createElement('div');
            confete.className = 'confete';
            confete.style.left = `${Math.random() * 100}vw`;
            confete.style.top = `-${Math.random() * 10 + 2}vh`; // Posição inicial no topo, fora da tela
            confete.style.background = getCorAleatoria(cores);
            
            animacaoContainer.appendChild(confete);
            
            confete.addEventListener('animationend', () => confete.remove());
        }
    }

    // Função que cria e anima as lágrimas.
    function animacaoLagrimas(qtd) {
        for (let i = 0; i < qtd; i++) {
            const lagrima = document.createElement('div');
            lagrima.className = 'lagrima';
            lagrima.style.left = `${Math.random() * 100}vw`;
            lagrima.style.top = `-${Math.random() * 10 + 2}vh`; // Posição inicial no topo, fora da tela
            
            animacaoContainer.appendChild(lagrima);
            
            lagrima.addEventListener('animationend', () => lagrima.remove());
        }
    }

    // Verifica se os dados do localStorage existem.
    if (resultado && resultado.probability !== undefined) {
        const prob = parseFloat(resultado.probability);
        let mensagem = '';
        let classe = '';
        let animacao = null;

        // Define a mensagem, classe CSS e animação com base na probabilidade.
        if (prob < 55) {
            classe = 'resultado-excelente';
            mensagem = `
                <h2>ESTÁGIO 1 - EXCELENTE</h2>
                <p><b>PARABÉNS!!!</b> Você <b>não está sendo afetado</b> pelo uso do celular em seus estudos, continue assim!</p>
            `;
            animacao = () => animacaoFoguetes(100); // Função que dispara a animação
        } else if (prob >= 55 && prob <= 70) {
            classe = 'resultado-bom';
            mensagem = `
                <h2>ESTÁGIO 2 - BOM</h2>
                <p>Necessário <b>diminuir um pouco o uso do celular</b> e redes sociais para você poder entregar o seu melhor nos estudos!</p>
            `;
            animacao = () => animacaoConfete(50);
        } else {
            classe = 'resultado-ruim';
            mensagem = `
                <h2>ESTÁGIO 3 - RUIM</h2>
                <p><b>Recomendamos</b> que entre em contato com os apoiadores do site, para te auxiliarem a melhorar seus estudos e <b>diminuir o vício no celular.</b></p>
            `;
            animacao = () => animacaoLagrimas(100);
        }

        // Adiciona o HTML do resultado ao contêiner.
        container.innerHTML = `
            <div class="resultado-box ${classe}">
                <p>O aluno <b>${resultado.nomeAluno || 'NÃO IDENTIFICADO'}</b> está 
                    <b>
                        <span class="cor-pontuacao ${
                            prob <= 55 ? 'verde' : (prob <= 70 ? 'amarelo' : 'vermelho')
                        }">${prob}%</span>
                    </b> afetado pelo uso do celular nos estudos.
                </p>
                ${mensagem}
            </div>
        `;
        
        // Dispara a animação do estágio correspondente após um pequeno delay.
        setTimeout(animacao, 600); // Atraso para dar tempo de carregar o HTML
    } else {
        // Mensagem de erro caso os dados não sejam encontrados.
        container.innerHTML = `
            <div class="resultado-box resultado-bom">
                <p>Nenhum dado encontrado para gerar o resultado individual. Por favor, volte e preencha o formulário.</p>
            </div>
        `;
    }
});