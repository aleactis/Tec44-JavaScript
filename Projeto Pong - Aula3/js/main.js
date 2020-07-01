//Criação das constantes
const LARGURA_RAQUETE = 10;
const ALTURA_RAQUETE = 100;
const VENCEDOR_PLACAR = 3;

//Criação das variáveis
//criar uma variável chamada raquete1Y com valor 250
let raquete1Y = 250;
//criar uma variável chamada raquete2Y com valor 250
let raquete2Y = 250;
//criar uma variável chamada bolaX com valor 50
let bolaX = 50;
//criar uma variável chamada bolaY com valor 50
let bolaY = 50;
let mostrandoTelaVencedor = false;
let velocidadeBolaX = 10;
let velocidadeBolaY = 4;
let jogador2Placar = 0;
let jogador1Placar = 0;

//Criar uma function para carregar a tela
window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    //Definir o FPS e um timer para rodar o jogo
    let framesPerSecond = 30;
    setInterval(function() {
            moveTudo();
            desenhaTela();	
        }, 1000/framesPerSecond);

    //Adiciona um event listener quando o usuário clica no mouse
    canvas.addEventListener('mousedown', manipulaMouseClick);

    //Adiciona uma event listener quando o usuário move o mouse e mantém o mouse dentro da tela
    canvas.addEventListener('mousemove',
        function(evt) {
            var mousePos = calculaMousePos(evt);
            raquete1Y = mousePos.y - (ALTURA_RAQUETE/2);
        });
}

//Calcula a posição do mouse
function calculaMousePos(evt) {
    //Retornar o tamanho da tela e sua posição relativa
    let retangulo = canvas.getBoundingClientRect();
    //Retornar o elemento que é a raiz do documento (<html> para documentos html)
    let raiz = document.documentElement;
    //Posição X e Y do mouse
    let mouseX = evt.clientX - retangulo.left - raiz.scrollLeft;
    let mouseY = evt.clientY - retangulo.top - raiz.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
}

//Reiniciar o jogo
function manipulaMouseClick(evt) {
    if(mostrandoTelaVencedor) {
        jogador1Placar = 0;
        jogador2Placar = 0;
        mostrandoTelaVencedor = false;
    }
}

function moveTudo() {
    if(mostrandoTelaVencedor) {
        return;
    }

    calculaMovimento();
    //Adiciona velocidade na bola nos dois eixos (X e Y)
    bolaX = bolaX + velocidadeBolaX;
    bolaY = bolaY + velocidadeBolaY;
    //Verifica pontuação, zera a velocidade da bola e reseta a posição da bola
    if(bolaX < 0) {
        if(bolaY > raquete1Y &&
            bolaY < raquete1Y+ALTURA_RAQUETE) {
            velocidadeBolaX= -velocidadeBolaX;

            var deltaY = bolaY
                    -(raquete1Y+ALTURA_RAQUETE/2);
            velocidadeBolaY = deltaY * 0.35;
        } else {
            jogador2Placar++; // precisa ser antes do ballReset()
            reiniciaBola();
        }
    }
    if(bolaX > canvas.width) {
        if(bolaY > raquete2Y &&
            bolaY < raquete2Y+ALTURA_RAQUETE) {
            velocidadeBolaX= -velocidadeBolaX;

            var deltaY = bolaY
                    -(raquete2Y+ALTURA_RAQUETE/2);
            velocidadeBolaY = deltaY * 0.35;
        } else {
            jogador1Placar++; // precisa ser antes do ballReset()
            reiniciaBola();	
        }
    }

    //Rebote da bola nas paredes horizontais
    if(bolaY < 0) {
        velocidadeBolaY = -velocidadeBolaY;
    }
    if(bolaY > canvas.height) {
        velocidadeBolaY = -velocidadeBolaY;
    }
}

function reiniciaBola() {
    //Exibe a tela de vencedor ao jogador campeão
    if(jogador1Placar >= VENCEDOR_PLACAR || jogador2Placar >= VENCEDOR_PLACAR) {
        mostrandoTelaVencedor = true;
    }

    //Inicia a posição da bola no meio da tela
    velocidadeBolaX = -velocidadeBolaX;
    bolaX = canvas.width/2;
    bolaY = canvas.height/2;
}

//Calcula o movimento do jogador 2 (AI)
function calculaMovimento() {
    var raquete2YCenter = raquete2Y + (ALTURA_RAQUETE/2);
    if(raquete2YCenter < bolaY - 35) {
        raquete2Y = raquete2Y + 6;
    } else if(raquete2YCenter > bolaY + 35) {
        raquete2Y = raquete2Y - 6;
    }
}

function desenhaTela() {
    //Desenhar a tela com fundo preto
    colorirRetangulo(0,0,canvas.width,canvas.height,'black');

    //Exibe o vencedor
    if(mostrandoTelaVencedor) {
        canvasContext.fillStyle = "white";

        if(jogador1Placar >= VENCEDOR_PLACAR) {
            canvasContext.fillText("Jogador da esquerda ganhou!", 350, 200);
        } else if(jogador2Placar >= VENCEDOR_PLACAR) {
            canvasContext.fillText("Jogador da direita ganhou!", 350, 200);
        }

        canvasContext.fillText("Clique na tela para continuar", 350, 500);
        return;
    }

    //Desenha a rede
    desenhaRede();

    //Desenhar a raquete do player a esquerda
    colorirRetangulo(0,raquete1Y,LARGURA_RAQUETE,ALTURA_RAQUETE,'white');

    //Desenhar a raquete do player a direita (IA)
    colorirRetangulo(canvas.width-LARGURA_RAQUETE,raquete2Y,LARGURA_RAQUETE,ALTURA_RAQUETE,'white');

    //Desenhar a bola
    colorirCirculo(bolaX, bolaY, 10, 'white');

    //Exibe o placar em uma determinada coordenada
    canvasContext.fillText(jogador1Placar, 100, 100);
    canvasContext.fillText(jogador2Placar, canvas.width-100, 100);
}

function desenhaRede(){
    for(let i=0; i<canvas.height; i+=40) {
        colorirRetangulo(canvas.width/2-1, i, 2, 20, "red");
    }
}

//Função Colorir Retângulo
function colorirRetangulo(leftX,topY, width,height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX,topY, width,height);
}

//Função Coloriar Círculo
function colorirCirculo(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2,true);
    canvasContext.fill();
}
