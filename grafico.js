document.addEventListener('DOMContentLoaded', function () {
    const resultado = JSON.parse(localStorage.getItem('resultadoIA'));
    const container = document.getElementById('resultado');
    const pontuacaoSpan = document.getElementById('pontuacao');

    function animacaoFoguetes(qtd) {
        const animacao = document.getElementById('animacao-container');
        for (let i = 0; i < qtd; i++) {
            const foguete = document.createElement('div');
            foguete.className = 'foguete';
            foguete.style.left = `${Math.random() * 100}vw`;
            foguete.style.bottom = `${Math.random() * 20}vh`;
            const cores = ['#ff0', '#f00', '#0ff', '#f0f', '#0f0'];
            const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
            foguete.style.boxShadow = `0 0 5px 2px ${corAleatoria}, 0 0 10px 4px ${corAleatoria}, 0 0 15px 6px ${corAleatoria}`;
            animacao.appendChild(foguete);
            foguete.addEventListener('animationend', () => foguete.remove());
        }
    }

    function animacaoConfete(qtd) {
        const animacao = document.getElementById('animacao-container');
        for (let i = 0; i < qtd; i++) {
            const confete = document.createElement('div');
            confete.className = 'confete';
            confete.style.left = `${Math.random() * 100}vw`;
            confete.style.top = `-${Math.random() * 10 + 2}vh`;
            const cores = ['#ffd600', '#fff176', '#ffb300', '#ffe082', '#fffde7'];
            confete.style.background = cores[Math.floor(Math.random() * cores.length)];
            animacao.appendChild(confete);
            confete.addEventListener('animationend', () => confete.remove());
        }
    }

    function animacaoLagrimas(qtd) {
        const animacao = document.getElementById('animacao-container');
        for (let i = 0; i < qtd; i++) {
            const lagrima = document.createElement('div');
            lagrima.className = 'lagrima';
            lagrima.style.left = `${Math.random() * 100}vw`;
            lagrima.style.top = `-${Math.random() * 10 + 2}vh`;
            animacao.appendChild(lagrima);
            lagrima.addEventListener('animationend', () => lagrima.remove());
        }
    }

    if (resultado && resultado.probability !== undefined) {
        const prob = parseFloat(resultado.probability);
        let mensagem = '';
        let classe = '';
        let animacao = null;

        if (prob < 55) {
            classe = 'resultado-excelente';
            mensagem = `
                <h2>ESTÁGIO 1 - EXCELENTE</h2>
                <p><b>PARABÉNS!!!</b> Você <b>não está sendo afetado</b> pelo uso do celular em seus estudos, continue assim!</p>
            `;
            animacao = () => animacaoFoguetes(18);
        } else if (prob >= 55 && prob <= 70) {
            classe = 'resultado-bom';
            mensagem = `
                <h2>ESTÁGIO 2 - BOM</h2>
                <p>Necessário <b>diminuir um pouco o uso do celular</b> e redes sociais para você poder entregar o seu melhor nos estudos!</p>
            `;
            animacao = () => animacaoConfete(30);
        } else {
            classe = 'resultado-ruim';
            mensagem = `
                <h2>ESTÁGIO 3 - RUIM</h2>
                <p><b>Recomendamos</b> que entre em contato com os apoiadores do site, para te auxiliarem a melhorar seus estudos e <b>diminuir o vício no celular.</b></p>
            `;
            animacao = () => animacaoLagrimas(25);
        }

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
        pontuacaoSpan.textContent = prob;

        // Dispara animação do estágio
        setTimeout(animacao, 400);
    } else {
        container.innerText = 'Nenhum dado encontrado para gerar o resultado individual.';
        pontuacaoSpan.textContent = '0';
    }
});