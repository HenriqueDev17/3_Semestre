async function calcular() {

    const nome = document.getElementById("nome").value.trim();
    const altura = parseFloat(document.getElementById("altura").value);
    const peso = parseFloat(document.getElementById("peso").value);

    // console.log(nome);
    // console.log(altura);
    // console.log(peso);



    if (nome.trim().length == 0 || isNaN(altura) || isNaN(peso)) {
        alert("Preencher todos os campos");
        return false;
    }
    console.log("liberado para cadastrar");
    const IMC = calcularIMC(peso, altura);
    console.log(IMC);
    const textoSituacao = gerarSituacao(IMC);

    const objIMC = {
        nome: nome,
        altura: altura,
        peso: peso,
        IMC: IMC,
        situacao: textoSituacao
    }
    const dadosGravados = await cadastrarNaApi(objIMC);
    console.log(dadosGravados);

    if ("error" in dadosGravados) {
        alert(dadosGravados.error)
    } else {
        carregarCadastros();
    }

}

async function carregarCadastros() {
    const retorno = await fetch("http://localhost:3000/imc");
    const dadosCadastrados = await retorno.json();


    dadosCadastrados.sort((a, b) => {
        return a.nome.localeCompare(b.nome)
    });
    document.getElementById("cadastro").innerHTML = "";
    dadosCadastrados.forEach(pessoa => {
            mostrarNaTela(pessoa);
    });

}


async function cadastrarNaApi(objCadastro) {
    try {
        const retorno = await fetch("http://localhost:3000/imc", {
            method: "POST",
            body: JSON.stringify(objCadastro),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        });

        const dadosGravados = await retorno.json();
        console.log(dadosGravados)
        return dadosGravados;


    } catch (error) {
        console.log(error);
        return {
            error: "problemas para gravar na API"
        }
    }
}

function mostrarNaTela(objCadastro) {
    document.getElementById("cadastro").innerHTML += `
     <tr>
        <td>${objCadastro.nome}</td>
        <td>${objCadastro.altura}</td>
        <td>${objCadastro.peso}</td>
        <td>${objCadastro.IMC}</td>
        <td>${objCadastro.situacao}</td>
      </tr>`;
}

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Menor que 16 – Magreza grave;

// 16 a menor que 17 – Magreza moderada;

// 17 a menor que 18,5 – Magreza leve;

// 18,5 a menor que 25 – Saudável;

// 25 a menor que 30 – Sobrepeso;

// 30 a menor que 35 – Obesidade Grau I;

// 35 a menor que 40 – Obesidade Grau II (considerada severa);

// Maior que 40 – Obesidade Grau III (considerada mórbida).

function gerarSituacao(IMC) {
    if (IMC < 16) {
        return "Magreza grave"
    } else if (IMC >= 16 && IMC < 17) {
        return "Magreza moderada"
    } else if (IMC >= 17 && IMC < 18.5) {
        return "Magreza leve"
    } else if (IMC >= 18.5 && IMC < 25) {
        return "Saudável"
    } else if (IMC >= 25 && IMC < 30) {
        return "Sobrepeso"
    } else if (IMC >= 30 && IMC < 35) {
        return "Obesidade Grau I"
    } else if (IMC >= 35 && IMC < 40) {
        return "Obesidade Grau II"
    } else if (IMC >= 40) {
        return "Obesidade Grau III"
    }




}