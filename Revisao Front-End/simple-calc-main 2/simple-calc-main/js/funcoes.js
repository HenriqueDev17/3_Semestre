async function calcular() {
    event.preventDefault();
    //entrada
    let n1 = parseFloat( document.getElementById('n1').value ) ;
    let n2 = parseFloat( document.getElementById("n2").value );
    let op = document.getElementById("operacao").value;//soma
    let resultado = null;
    
    if( isNaN(n1) || isNaN(n2) ){
        document.getElementById('resultado').innerText = 'Preencha todos os números!'
    }


    //processamento
    if(op == 'soma'){
        resultado = somar(n1, n2)
        resultado = resultado.toFixed(2);

    } else if(op == 'subtracao') {
        resultado = subtrair(n1, n2);
        resultado = resultado.toFixed(2);

    } else if (op == 'multiplicacao'){
        resultado = multiplicar(n1, n2);
        resultado = resultado.toFixed(2);

    } else if (op == 'divisao'){

        if(n2 == 0) {
            resultado = 'Não é um número';
        } else {
            resultado = dividir(n1, n2);
            resultado = resultado.toFixed(2);
        }
            
    } else {
        resultado = "Operação Inválida";
    }

    //saída
    // console.log(`Resultado da operação: ${resultado}`);
    document.getElementById('resultado').innerHTML = resultado;

    // gerar um objeto JS com os dados
    const objCalc = {
        n1: n1,
        n2: n2,
        operacao: op,
        resultado: resultado
    }
    // cadastrar API
    const dadosGravados = await cadastrarNaAPI(objCalc);
    console.log(dadosGravados);

    if ("error" in dadosGravados) {
        alert(dadosGravados.error)
    } else {
        // mostrar no html (inserir a linha da tabela)
        mostrarNaTela(objCalc);
        // carregarCadastros();
    }
}

/**
 * Função somar recebe 2 valores e retorna a soma dos 
 * dois valores
 */
 function somar(valor1, valor2) {
    return valor1 + valor2;
}


function subtrair(valor1, valor2) {
    return valor1 - valor2;
}

function multiplicar(valor1, valor2) {
    return valor1 * valor2;
}

function dividir(valor1, valor2) {
    if(valor2 == 0) {
        return 'Não é um número';
    }
    
    return valor1 / valor2;
}

async function cadastrarNaAPI(objCadastro) {
    try {
        const retorno = await fetch("http://localhost:3000/calculadora", {
            method: "POST",
            body: JSON.stringify(objCadastro),
            headers: {
                'Content-Type': 'application/json; charse=UTF-8'
            }
        });

        const dadosGravados = await retorno.json();
        return await dadosGravados;

    } catch (error) {
        console.log(error);
        return await {error: "problemas para gravar na API"};
    }
}


async function carregarCadastros() {
    const retorno = await fetch("http://localhost:3000/calculadora");
    const dadosCadastrados = await retorno.json();
    document.getElementById("cadastro").innerHTML = "";
    dadosCadastrados.forEach(pessoa => {
            mostrarNaTela(pessoa);
    });

}



function mostrarNaTela(objCadastro) {
        document.getElementById("cadastro").innerHTML += `<article class="data__card-result">
    <span><strong>Primeiro Número:</strong> ${objCadastro.n1}</span>
    <span><strong>Segundo Número:</strong> ${objCadastro.n2}</span>
    <span><strong>Operação:</strong> ${objCadastro.operacao}</span>
    <span><strong>Resultado:</strong> ${objCadastro.resultado}</span>
    </article>`
    }





