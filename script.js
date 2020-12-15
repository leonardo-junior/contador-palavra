const bInserir = document.getElementById('bInserir');
const bVerificarAll = document.getElementById('bVerificar');
const bVerifyWord = document.getElementById('bVerifyWord');
const fraseInput = document.getElementById('fraseInput');
const fraseCompleta = document.getElementById('frase');
const palavra = document.getElementById('palavra');
const result = document.getElementById('result');

bInserir.onclick = inserir;
let valorParaArray = 0;
let wordReplace = '';
let wordReplaceEnded = '';
let ordem = '';

function wordCounter (completeString, palavraContar) { // contador de palavra
    let countWord = 0;
    for (let i = 0; completeString.length > i; i++) {
        let verificadorString = completeString.indexOf(palavraContar);
        if (verificadorString != -1) {
            completeString[verificadorString] = '';
            countWord++;
        }
    };
    valorParaArray += countWord;
    return countWord;
};

function inserir () { //insert frase
    let frase = fraseInput.value;
    frase = frase.toUpperCase();
    if (frase != '') {
        fraseCompleta.innerHTML = frase;
        wordReplace = frase.replace(/(\r\n|\n|\r)/g, " ").trim();
        wordReplaceEnded = wordReplace
            .split(/\s+/g)
            .sort();
    } else {
        alert('Insira dados');
    }
};

bVerifyWord.onclick = function () { // verificar palavra
    inserir();
    let palavraParaVerificar = palavra.value;
    palavraParaVerificar = palavraParaVerificar.toUpperCase();
    let resultado = wordCounter(wordReplaceEnded, palavraParaVerificar);
    result.innerHTML = `A palavra ${palavraParaVerificar} apareceu ${resultado} vezes`;
    valorParaArray = 0;
};

bVerificarAll.onclick = function () {
    inserir();
    let teste = [];
    let numResp = 0;
    let numberWords = wordReplace.split(/\s+/g).length;
    result.innerHTML = `A frase contém ${numberWords} palavras<br/>`;
    while (valorParaArray < wordReplaceEnded.length) {
        let palavra = [wordReplaceEnded[valorParaArray]];
        let count = wordCounter(wordReplaceEnded, wordReplaceEnded[valorParaArray]);
        teste[numResp] = {
            word: palavra,
            count,
        };
        numResp++;
    };
    teste.sort(function (a, b) { // retorna numero em ordem crescente
        return a.count - b.count;
    });
    teste.reverse();
    teste = teste.map(function (item) {
        return `
            <tr>
                <td>${item.count}</td>
                <td>${item.word}</td>
            </tr>
        `;
        // return `${item.count} - ${item.word}`;
        // return `Apareceu ${item.count} vezes a palavra ${item.word}<br/>`;
    });
    result.innerHTML = `
        <table>
            <tr>
                <th>Contagem</th>
                <th>Palavra</th>
            </tr>
            ${teste.join(' ')}
        </table>
    `;
    // result.innerHTML = teste.join('<br/>'); // dentro do ( o que fica entre as palavras)
    valorParaArray = 0;
};

// // function contar () { contar letras
// //     var texto = ala;
// //     var palavra = texto.split('');
// //     for (i = 0; i < palavra.length; i++);
// //     return i;
// // };;;;;


