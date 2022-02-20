// DECLARAÇÕES DE VARIÁVEIS 
let mensagemAlerta = "";
let title = "";
let image = "";
let perguntas = [];
let niveis = [];
let editarPerguntas = [];
let qtdPerguntas = 0;
let qtdNiveis = 0;

let questions = [];
let levels = [];
let questoesSemValidar = [];
let niveisSemValidar = [];
let answers = [];

let quizz = {};
let idQuizz = null;
let keyQuizz = null;

//---------------FUNÇÕES DE VALIDAÇÕES COMPLEMENTARES-----------------------

//===================VALIDAÇÃO DE TODOS OS CAMPOS TELA 3_1================================
function validarTela3_1(){
    mensagemAlerta = "";
    let titulo = document.querySelector(".tela3__1__titulo").value;
    console.log("Titulo: " + titulo);
    let url = document.querySelector(".tela3__1__url").value;
    console.log("URL: " + url);
    qtdPerguntas = document.querySelector(".tela3__1__perguntas").value;
    console.log("Perguntas: " + perguntas);
    qtdNiveis = document.querySelector(".tela3__1__niveis").value;
    console.log("Níveis: " + qtdNiveis);

    let tituloValido = validarTitulo(titulo);
    let urlValida = validarURL(url);
    let perguntasValida = validarQtdPerguntas(qtdPerguntas);
    let niveisValido = validarQtdNiveis(qtdNiveis);

    if (mensagemAlerta !== "") {
        alert(mensagemAlerta);
    } 

    if(tituloValido && urlValida && perguntasValida && niveisValido){
        title = titulo;
        image = url;
        console.log("Tudo Válido");
        const paginaTela3_1 = document.querySelector(".tela3__1");
        paginaTela3_1.classList.add("escondido");
        const paginaTela3_2 = document.querySelector(".tela3__2");
        paginaTela3_2.classList.remove("escondido");
        geradorPerguntasQuizz(qtdPerguntas);
    }
}

//===================VALIDAÇÃO DE TODOS OS CAMPOS TELA 3_2================================
function validarTela3_2(){
    questoesSemValidar = [];
    questions = [];
    for(let i = 0; i < qtdPerguntas; i++){
        capturarCampoDigitadoPergunta(i);
        validarQuestao(questoesSemValidar[i]);
    }
    if(questions.length == qtdPerguntas){
        console.log("Questões Válidas");
        const paginaTela3_2 = document.querySelector(".tela3__2");
        paginaTela3_2.classList.add("escondido");
        const paginaTela3_3 = document.querySelector(".tela3__3");
        paginaTela3_3.classList.remove("escondido");
        geradorNiveisQuizz(qtdNiveis);

    } else {
        alert("Há perguntas não validadas! Verique e tente novamente");
    }
}

//===================VALIDAÇÃO DE TODOS OS CAMPOS TELA 3_3================================
function validarTela3_3(){
    niveisSemValidar = [];
    levels = [];
    for(let i = 0; i < qtdNiveis; i++){
        capturarCampoDigitadoNivel(i);
        validarNiveis(niveisSemValidar[i]);
    }
    if(levels.length == qtdNiveis){
        console.log("Níveis Válidos");

        quizz = {
            title: title,
            image: image,
            questions: questions,
            levels: levels
        }
        enviarQuizz ();   

    } else {
        alert("Há níveis não validados! Verique e tente novamente");
    }
}


//---------------FUNÇÕES DE VALIDAÇÕES COMPLEMENTARES-----------------------

//===================VALIDAÇÕES NA TELA 3_1================================
// Validação do TÍTULO no javaScrip
function validarTitulo (titulo) {
    if (titulo.length >= 20 && titulo.length <=65) {
       console.log(titulo + " é um título válido!");
       return true;
   } else {
       console.log(titulo + " NÃO é um título válido!");
       mensagemAlerta +="Insira um TÍTULO válido!";
       return false;
   }
}
// Validação da URL no javaScrip
function validarURL (url) {  
   return true; //paleativo
   if(validURL(url)) {
       console.log(url + " é uma URL válida");
       return true;
   } else {
       console.log(url + " NÃO é uma URL válida");
       mensagemAlerta += "\nInsira uma URL válida!";
       return false;
   }
}
// Valida URL - função pronta 
function validURL(str) {
   var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
     '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
     '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
     '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
   return !!pattern.test(str);
}

//Validação da quantidade de PERGUNTAS no javaScrip
function validarQtdPerguntas (perguntas) {
   if (perguntas >= 3) {
       console.log(perguntas + " é um nº de PERGUNTAS válidas");
       return true;
   } else {
       console.log(perguntas + " NÃO é um nº de PERGUNTAS válidas");
       mensagemAlerta += "\nInsira um nº de PERGUNTAS válidas! >= 3" ;
       return false;
   }
}

//Validação da quantidade de NIVEIS no javaScrip
function validarQtdNiveis (qtdNiveis) {
   if (qtdNiveis >= 2) {
       console.log(qtdNiveis + " é um nº de NÍVEIS válidos");
       return true;
   } else {
       console.log(qtdNiveis + " NÃO é um nº de NÍVEIS válidos");
       mensagemAlerta += "\nInsira um nº de NIVEIS válidos! >= 2";
       return false;
   }
}

//===================VALIDAÇÕES NA TELA 3_2================================

function validarQuestao(questaoAValidar) {
    let respostasValidadas = [];
    let existeRespostaCorreta = 0;
    let existeRespostaIncorreta = 0;
    let isValidoTituloPergunta = validarTituloPergunta(questaoAValidar.title);
    let isValidoCorDeFundoPergunta = validarCorHexadecimal(questaoAValidar.color);

    questaoAValidar.answers.forEach(resposta => {
        if (validarResposta(resposta)){
            respostasValidadas.push(resposta);
            if(resposta.isCorrectAnswer){
                existeRespostaCorreta++;
            } else {
                existeRespostaIncorreta++;
            }
        }
    });

    if(isValidoTituloPergunta && isValidoCorDeFundoPergunta){
        console.log("Título e Cor da questão Validadas!");
        if(existeRespostaCorreta > 0){
            console.log("Existe resposta correta Validada!");
            if(existeRespostaIncorreta > 0){
                console.log("Existe " + existeRespostaIncorreta + " resposta incorreta Validada!");
                let questoesValidadas = {
                    title: questaoAValidar.title,
                    color: questaoAValidar.color,
                    answers: respostasValidadas
                }
                questions.push(questoesValidadas)
                console.log("OBJETO ADICIONADO!");
                console.log(questions);
            }
        }
    } 
}

function validarTituloPergunta (tituloPergunta) {
    if (tituloPergunta.length >= 20) {
       console.log(tituloPergunta + " é um TÍTULO DA PERGUNTA válido!");
       return true;
   } else {
       console.log(tituloPergunta + " NÃO é um TÍTULO DA PERGUNTA válido!");
    //    mensagemAlerta +="Insira um TÍTULO válido!";
       return false;
   }
}

function validarCorHexadecimal(cor){
    let pattern = new RegExp('#[0-9a-fA-F]{6}');
    return !!pattern.test(cor);
}

function validarResposta (objetoResposta){
    let isValidarTextoResposta = validarTextoResposta(objetoResposta.text);
    let isValidarURL = validarURL(objetoResposta.image);
    if (isValidarTextoResposta && isValidarURL){
        console.log("Resposta Válida");
        return true;
    }
    else {
        return false;
    }
}

function validarTextoResposta (textoResposta) {
    if (textoResposta === null || textoResposta === "" || textoResposta.length <= 0) {
        console.log(textoResposta + " NÃO é um TEXTO DA RESPOSTA válido!");
        return false;       
   } else {
        console.log(textoResposta + " é um TEXTO DA RESPOSTA válido!");
        console.log("TAMANHO do texto : " + textoResposta.length);
        return true;
   }
}

//===================VALIDAÇÕES NA TELA 3_3================================

function validarNiveis(nivelAValidar) {
    let isValidoTituloNivel = validarTituloNivel(nivelAValidar.title);
    let isValidoValorMinimo = validarPercentagem(nivelAValidar.minValue);
    let isValidoUrlImagem = validarURL(nivelAValidar.image);
    let isValidoDescricao = validarDescricaoNivel(nivelAValidar.text);

    if (isValidoTituloNivel && isValidoValorMinimo && isValidoUrlImagem && isValidoDescricao){
        let nivelValidado = nivelAValidar;
        levels.push(nivelValidado);
        console.log("LEVEL ADICIONADO");
    } else {
        console.log("Há campos inválidados!");
    }
}

function validarTituloNivel (tituloNivel) {
    if (tituloNivel.length >= 10) {
       return true;
   } else {
       return false;
   }
}

function validarPercentagem (percentagem) {
    if (percentagem >= 0 && percentagem <= 100) {
       return true;
   } else {
       return false;
   }
}

function validarDescricaoNivel (descricaoNivel) {
    if (descricaoNivel.length >= 30) {
       return true;
   } else {
       return false;
   }
}

//---------------FUNÇÕES GERADORAS E REDENRIZADORAS DE CONTEÚDOS-----------------------

//===================GERADORA DA TELA 3_2================================
function geradorPerguntasQuizz (numeroPerguntas) {

    for (let i = 0; i < numeroPerguntas; i++){
        editarPerguntas[i] = `
        <div class="editar__pergunta pergunta${i+1}">
                <div>
                    <span>Pergunta ${i+1}</span>
                </div>
                <div onclick='window.clickEditarPerguntas(perguntas[${i}], "pergunta${i+1}", ${i})'>
                    <img src="./assets/images/editar.svg" alt="editar">
                </div>    
        </div>
        `;
        perguntas[i] = `
            <div class="conjunto__pergunta perguntas${i+1}">
                <span>Pergunta ${i+1}</span>
                <div class="conjunto__inputs">
                    <div class="input texto__pergunta"><input type="text" placeholder="Texto da pergunta"></div>
                    <div class="input cor__pergunta"><input type="text" placeholder="Cor de fundo da pergunta"></div>
                </div>
                <span>Resposta correta</span>
                <div class="conjunto__inputs">
                    <div class="input resposta__correta"><input type="text" placeholder="Resposta correta"></div>
                    <div class="input url__resposta__correta"><input type="text" placeholder="URL da imagem"></div>
                </div>
                <span>Respostas incorretas</span>
                <div class="conjunto__inputs">
                    <div class="input resposta__incorreta1"><input type="text" placeholder="Resposta incorreta 1"></div>
                    <div class="input url__resposta__incorreta1"><input type="text" placeholder="URL da imagem 1"></div>
                </div>
                <div class="conjunto__inputs">
                    <div class="input resposta__incorreta2"><input type="text" placeholder="Resposta incorreta 2"></div>
                    <div class="input url__resposta__incorreta2"><input type="text" placeholder="URL da imagem 2"></div>
                </div>
                <div class="conjunto__inputs">
                    <div class="input resposta__incorreta3"><input type="text" placeholder="Resposta incorreta 3"></div>
                    <div class="input url__resposta__incorreta3"><input type="text" placeholder="URL da imagem 3"></div>
                </div>
            </div>
        ` ;
    }
    redenrizarEditarPerguntas(editarPerguntas);
}

//===================REDENRIZADORA DA TELA 3_2================================
function redenrizarEditarPerguntas (editarPerguntas) {
    const telaDePerguntas = document.querySelector(".tela3__2 .editores__perguntas");
    editarPerguntas.forEach(editarPergunta => {
        telaDePerguntas.innerHTML += editarPergunta;
    });
}

function clickEditarPerguntas (pergunta, classeEditarPergunta, index) {
    if (index > 0){
        questoesSemValidar = [];
        for (let i= 0; i < index; i++){
            capturarCampoDigitadoPergunta(i);
        }
    }
    redendizarPerguntaNaTela (pergunta, classeEditarPergunta);
    if (index > 0){
        for (let i= 0; i < index; i++){
            inserirCampoDigitadoPergunta(i);
        }
    }
}

function redendizarPerguntaNaTela (pergunta, classeEditarPergunta) {
    const telaDePerguntas = document.querySelector(".tela3__2 .inputs");
    telaDePerguntas.innerHTML += pergunta;
    const divEditarPergunta = document.querySelector("." + classeEditarPergunta);
    divEditarPergunta.classList.remove("editar__pergunta");
    divEditarPergunta.classList.remove(classeEditarPergunta);
    divEditarPergunta.classList.add("escondido");
    console.log("PERGUNTA: " + pergunta);
}