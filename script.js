// --variaveis globais
let askCards;

const acessar = document.querySelector('.board');

const arr = [];

const arrPassaros = ['bobrossparrot', 'explodyparrot', 'fiestaparrot', 'metalparrot', 'revertitparrot', 'tripletsparrot', 'unicornparrot']

// -- função para embaralhar as cartas
function embaralharCartas() {
    return Math.random() - 0.5;
}

// -- função para a criação de cartas
function criarCarta(){

    // -- prompt para perguntar a quantidade de cartas que foram jogadas no tabuleiro
    askCards = prompt("Escolha a quantidade de cartas da partida (de 4 a 14, apenas números pares).");

    while(askCards > 14 || askCards < 4 || askCards % 2 !==0){
    alert("Não permitido. Tente digitar apenas números pares, de 4 a 14")
    askCards = prompt("Escolha a quantidade de cartas da partida (de 4 a 14, apenas números pares).");
    }

    // -- jeito para jogar a quantidade de cartas embaralhadas no jogo.
    let passaroTonto = arrPassaros.sort(embaralharCartas);
    
    for (let i = 0; i < askCards / 2; i++){
        arr.push(passaroTonto[i], passaroTonto[i]); // -- insere duas vezes cada quarta 
    }

    arr.sort(embaralharCartas); // -- embaralhado para entrar nas cartas
    
    // -- looping para criar as cartas ja embaralhadas 
    for( let i = 0; i < arr.length; i++ ){

        acessar.innerHTML = acessar.innerHTML + `
        <div class="card" onclick="clicarCarta(this)" data-parrot="${arr[i]}">
            <div class="face front" >
                <img src="./images/${arr[i]}.gif">
            </div>
            <div class="face back"></div>
        </div>`
    }
}

criarCarta();

let primeiraCarta = '';
let segundaCarta = '';

function clicarCarta(botao){

    // -- se tiver a carta virada, não iclui ela e evita bug de virar uma carta que ja tem um par acertado.
    if(botao.className.includes('front')){
        return;
    }

    // ---- quando clicar é pra adicionar a classe fronte e virar a carta
    if( primeiraCarta === ''){
        botao.classList.add('front');
        primeiraCarta = botao;
    } else if( segundaCarta ===''){
        botao.classList.add('front');
        segundaCarta = botao;
    }
 
    checarCartas();
}

let chances = 0;

// --- aqui é a função para checar se as cartas viradas vão ter o mesmo atributo.
function checarCartas(){
    
    chances++; // -- contabilizar o tanto de cartas que foram viradas atraves do looping.

    let primeiroPassaro = primeiraCarta.getAttribute('data-parrot'); // -- atraves desse atributo ele ve se uma carta é igual a outra.
    let segundoPassaro = segundaCarta.getAttribute('data-parrot'); // -- ^^

    if(primeiroPassaro === segundoPassaro){
        
        primeiraCarta = '';
        segundaCarta = '';

        finalDoJogo();
     
        // -- caso não tenha o mesmo atributo, ela vira denovo as duas cartas.
    } else {
        setTimeout(() => {
        primeiraCarta.classList.remove('front');
        segundaCarta.classList.remove('front');

        primeiraCarta = '';
        segundaCarta = '';
        }, 1000);
    }
}

function finalDoJogo(){
    const cartasAcertadas = document.querySelectorAll('.board > .front');

    console.log(cartasAcertadas)

    //-- se a quantidade de cartas com a classe virada for igual a quantidade de cartas no tabuleiro, acaba o jogo.
    if ( cartasAcertadas.length == askCards){
        setTimeout(() => {
    alert(`Você ganhou em ${chances} jogadas`);
    }, 1000);}   
}