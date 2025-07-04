//------------------------------------------------------------------------------------FUNÇÃO GERAR NÚMERO ALEATÓRIO
function gerarNumeroAleatorio() {
    let numeroMaximoRange = 50;
    let numeroEscolhido = parseInt(Math.random() * numeroMaximoRange + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;


    if (quantidadeDeElementosNaLista == numeroMaximoRange) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }

}
//-----------------------------------------------------------------------------------------Gerando número aleatório
let listaDeNumerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


//----------------------------------------------------------------------------------------Exibindo Texto Inicial
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    //Voz
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }

}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroMaximoRange}`);
}

exibirMensagemInicial();


//------------------------------------------------------------------------------------------------VERIFICAR CHUTE
function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        //--------------------------------------------------------------------------------------------Se acertar
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas': 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        //----------------------------------------------------------------------------------------------Se errar
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número é menor que o chute');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

//---------------------------------------------------------------------------------------------Função LImpar Campo
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

//--------------------------------------------------------------------------------------------Funçaõ Reiniciar Jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)

}
