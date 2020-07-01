var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;
var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 3;
var showingWinScreen = false;
var paddle1Y = 250;
var paddle2Y = 250;

const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;

//Criar uma function para carregar a tela
window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    //Definir o FPS e um timer para rodar o jogo
    var framesPerSecond = 30;
    setInterval(function() {
            moveEverything();
            drawEverything();	
        }, 1000/framesPerSecond);
    //Adiciona um event listener quando o usuário clica no mouse
    canvas.addEventListener('mousedown', handleMouseClick);

    //Adiciona uma event listener quando o usuário move o mouse
    canvas.addEventListener('mousemove',
        function(evt) {
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
        });
}

function calculateMousePos(evt) {
    //Retorna o tamanho da tela e sua posição relativa ao viewport
    var rect = canvas.getBoundingClientRect();
    //Retorna o elemento que é o elemento raiz do documento (<html> para documentos HTML)
    var root = document.documentElement;
    //Posições X e Y do mouse
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
}

//Quando o usuário clica na tela quando tiver vencedor, zera o placar para os players
function handleMouseClick(evt) {
    if(showingWinScreen) {
        player1Score = 0;
        player2Score = 0;
        showingWinScreen = false;
    }
}

function ballReset() {
    //Exibe a tela de vencedor ao jogador campeão
    if(player1Score >= WINNING_SCORE ||
        player2Score >= WINNING_SCORE) {

        showingWinScreen = true;

    }
    //Inicia a posição da bola no meio da tela
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

//Calcula o movimento do jogador 2 (AI)
function computerMovement() {
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
    if(paddle2YCenter < ballY - 35) {
        paddle2Y = paddle2Y + 6;
    } else if(paddle2YCenter > ballY + 35) {
        paddle2Y = paddle2Y - 6;
    }
}

		function moveEverything() {
			if(showingWinScreen) {
				return;
			}

			computerMovement();
            //Adiciona velocidade na bola nos dois eixos (X e Y)
			ballX = ballX + ballSpeedX;
			ballY = ballY + ballSpeedY;
			//Verifica pontuação, zera a velocidade da bola e reseta a posição da bola
			if(ballX < 0) {
				if(ballY > paddle1Y &&
					ballY < paddle1Y+PADDLE_HEIGHT) {
					ballSpeedX = -ballSpeedX;

					var deltaY = ballY
							-(paddle1Y+PADDLE_HEIGHT/2);
					ballSpeedY = deltaY * 0.35;
				} else {
					player2Score++; // precisa ser antes do ballReset()
					ballReset();
				}
			}
			if(ballX > canvas.width) {
				if(ballY > paddle2Y &&
					ballY < paddle2Y+PADDLE_HEIGHT) {
					ballSpeedX = -ballSpeedX;

					var deltaY = ballY
							-(paddle2Y+PADDLE_HEIGHT/2);
					ballSpeedY = deltaY * 0.35;
				} else {
					player1Score++; // precisa ser antes do ballReset()
					ballReset();	
				}
            }
            //Rebote da bola nas paredes horizontais
			if(ballY < 0) {
				ballSpeedY = -ballSpeedY;
			}
			if(ballY > canvas.height) {
				ballSpeedY = -ballSpeedY;
			}
		}

		function drawNet() {
			for(var i=0;i<canvas.height;i+=40) {
				colorRect(canvas.width/2-1,i,2,20,'white');
			}
		}

		function drawEverything() {
			// a próxima linha apaga a tela com preto
			colorRect(0,0,canvas.width,canvas.height,'black');

            //Exibe o vencedor
            if(showingWinScreen) {
				canvasContext.fillStyle = 'white';

				if(player1Score >= WINNING_SCORE) {
					canvasContext.fillText("Jogador da esquerda ganhou!", 350, 200);
				} else if(player2Score >= WINNING_SCORE) {
					canvasContext.fillText("Jogador da direita ganhou!", 350, 200);
				}

				canvasContext.fillText("Clique na tela para continuar", 350, 500);
				return;
			}

            //Desenha a rede
			drawNet();

			// Paddle do player da esquerda
			colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');

			// Paddle do player da direita (computador)
			colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');

			// Próxima linha desenha a bola
			colorCircle(ballX, ballY, 10, 'white');

			canvasContext.fillText(player1Score, 100, 100);
			canvasContext.fillText(player2Score, canvas.width-100, 100);
		}

        //Função Coloriar Círculo
		function colorCircle(centerX, centerY, radius, drawColor) {
			canvasContext.fillStyle = drawColor;
			canvasContext.beginPath();
			canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2,true);
			canvasContext.fill();
		}
        
        //Função Colorir Retângulo
		function colorRect(leftX,topY, width,height, drawColor) {
			canvasContext.fillStyle = drawColor;
			canvasContext.fillRect(leftX,topY, width,height);
		}


























// //Criação das constantes
// const LARGURA_RAQUETE = 10;
// const ALTURA_RAQUETE = 100;

// //Canvas e canvasContext
// let canvas;
// let canvasContext;

// //Criação das variáveis
// //criar uma variável chamada raquete1Y com valor 250
// let raquete1Y = 250;
// //criar uma variável chamada raquete2Y com valor 250
// let raquete2Y = 250;
// //criar uma variável chamada bolaX com valor 50
// let bolaX = 50;
// //criar uma variável chamada bolaY com valor 50
// let bolaY = 50;

// //Jogadores
// let jogador1Placar = 0;
// let jogador2Placar = 0;

// //Placar
// const VENCEDOR_PLACAR = 3;

// //Variável que controlará a exibição da tela de vitória
// let mostrandoTelaVitoria = false;

// //Velocidade da bola nos eixos X e Y
// let velocidadeBolaX = 10;
// let velocidadeBolaY = 4;

// //Criar uma function para carregar a tela
// window.onload = function() {
//     canvas = document.getElementById('gameCanvas');
//     canvasContext = canvas.getContext('2d');
    
//     //Definir o FPS e um timer para rodar o jogo
//     let framesPorSegundo = 30;
//     setInterval(function() {
//             moverTudo();
//             desenhaTela();
//         }, 1000/framesPorSegundo);
    
//     //Adiciona um event listener quando o usuário clica no mouse
//     canvas.addEventListener('mousedown', manipularMouseClick);
    
//     //Adiciona uma event listener quando o usuário move o mouse
//     canvas.addEventListener('mousemove',
//         function(evt) {
//             let mousePos = calcularMousePos(evt);
//             raquete1Y = mousePos.y - (ALTURA_RAQUETE/2);
//         });
// }

// function calcularMousePos(evt) {
    
//     //Retorna o tamanho da tela e sua posição relativa ao viewport
//     let retangulo = canvas.getBoundingClientRect();
//     //Retorna o elemento que é o elemento raiz do documento (<html> para documentos HTML)
//     let raiz = document.documentElement;
//     //Posições X e Y do mouse
//     let mouseX = evt.clientX - retangulo.left - raiz.scrollLeft;
//     let mouseY = evt.clientY - retangulo.top - raiz.scrollTop;
//     return {
//         x:mouseX,
//         y:mouseY
//     };
// }

// function manipularMouseClick(evt) {
//     //Quando o usuário clica na tela quando tiver vencedor, zera o placar para os players
//     if(mostrandoTelaVitoria) {
//         jogador1Placar = 0;
//         jogador2Placar = 0;
//         mostrandoTelaVitoria = false;
//     }
// }


// function moverTudo() {
//     if(mostrandoTelaVitoria) {
//         return;
//     }

//     calcularMovimento();

//     //Adiciona velocidade na bola nos dois eixos (X e Y)
//     bolaX = bolaX + velocidadeBolaX;
//     bolaY = bolaY + velocidadeBolaY;

//     //Verifica pontuação, zera a velocidade da bola e reseta a posição da bola
//     if(bolaX < 0) {
//         if(bolaY > raquete1Y &&
//             bolaY < raquete1Y+ALTURA_RAQUETE) {
//             velocidadeBolaX = -velocidadeBolaX;

//             let deltaY = bolaY
//                     -(raquete1Y+ALTURA_RAQUETE/2);
//             velocidadeBolaY = deltaY * 0.35;
//         } else {
//             jogador2Placar++; // precisa ser antes do ballReset()
//             bolaReset();
//         }
//     }
//     if(bolaX > canvas.width) {
//         if(bolaY > raquete2Y &&
//             bolaY < raquete2Y+ALTURA_RAQUETE) {
//             velocidadeBolaX = -velocidadeBolaX;

//             var deltaY = bolaY
//                     -(raquete2Y+ALTURA_RAQUETE/2);
//             velocidadeBolaY = deltaY * 0.35;
//         } else {
//             jogador1Placar++; // precisa ser antes do ballReset()
//             bolaReset();	
//         }
//     }

//     //Rebote da bola nas paredes horizontais
//     if(bolaY < 0) {
//         velocidadeBolaY = -velocidadeBolaY;
//     }
//     if(bolaY > canvas.height) {
//         velocidadeBolaY = -velocidadeBolaY;
//     }
// }

// function calcularMovimento() {
//     //Calcula o movimento do jogador 2 (AI)
//     let raquete2YCenter = raquete2Y + (ALTURA_RAQUETE/2);
//     if(raquete2YCenter < bolaY - 35) {
//         raquete2Y = raquete2Y + 6;
//     } else if(raquete2YCenter > bolaY + 35) {
//         raquete2Y = raquete2Y - 6;
//     }
// }

// function bolaReset() {
//     //Exibe a tela de vencedor ao jogador campeão
//     if(jogador1Placar >= VENCEDOR_PLACAR ||
//         jogador2Placar >= VENCEDOR_PLACAR) {

//         mostrandoTelaVitoria = true;
//     }

//     //Altera a direção da bola
//     velocidadeBolaX = -velocidadeBolaX;
//     //Reposiciona a bola no centro da tela
//     bolaX = canvas.width/2;
//     bolaY = canvas.height/2;
// }

// //Criar uma function para desenhar os objetos de jogo
// function desenhaTela() {
//     //Desenhar a tela com fundo preto
//     colorirRetangulo(0, 0, canvas.width, canvas.height, 'back');
    
//     if(mostrandoTelaVitoria) {
//         canvasContext.fillStyle = 'white';

//         if(jogador1Placar >= VENCEDOR_PLACAR) {
//             canvasContext.fillText("Jogador da esquerda ganhou!", 350, 200);
//         } else if(jogador2Placar >= VENCEDOR_PLACAR) {
//             canvasContext.fillText("Jogador da direita ganhou!", 350, 200);
//         }

//         canvasContext.fillText("Clique na tela para continuar", 350, 500);
//         return;
//     }

//     desenharRede();

//     //Desenhar a raquete do player a esquerda
//     colorirRetangulo(0, raquete1Y, LARGURA_RAQUETE, ALTURA_RAQUETE, 'white');
    
//     //Desenhar a raquete do player a direita (IA)
//     colorirRetangulo(canvas.width - LARGURA_RAQUETE, raquete2Y, LARGURA_RAQUETE, ALTURA_RAQUETE, 'white');

//     //Desenhar a bola
//     colorirCirculo(bolaX, bolaY, 10, 'white');

//     canvasContext.fillText(jogador1Placar, 100, 100);
//     canvasContext.fillText(jogador2Placar, canvas.width - 100, 100);
// }

// function desenharRede() {
//     for(var i=0;i<canvas.height;i+=40) {
//         colorirRetangulo(canvas.width/2-1,i,2,20,'white');
//     }
// }

// //Função Colorir Retângulo
// function colorirRetangulo(leftX, TopY, width, height, drawColor) {
//     canvasContext.fillStyle = drawColor;
//     canvasContext.fillRect(leftX, TopY, width, height);
// }

// //Função Coloriar Círculo
// function colorirCirculo(centerX, centerY, radius, drawColor) {
//     canvasContext.fillStyle = drawColor;
//     canvasContext.beginPath();
//     canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2, true);
//     canvasContext.fill();
// }