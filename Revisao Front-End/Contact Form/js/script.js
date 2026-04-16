// Esta função recebe os dados do formulário em um objeto
// JavaScript e em seguida chama a api para cadastrar
async function cadastrarContato(objetoContato) {

    console.log(objetoContato)

    //chama a api com o fetch
    const resposta = await fetch("http://localhost:3000/contatos", {
        method: "POST",
        body: JSON.stringify(objetoContato),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    return await resposta;
}

async function buscarEndereco(cep) {
        // Quando o cep não vier preenchido, exibe um alerta e para a função
    if (cep.trim().length < 8) {
        alert("O CEP deve conter 8 dígitos!");
        return false;
    }

    //buscar o cep la na ViaCEP
    try {
        aguardandoCampos();

        let retorno = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        let dados = await retorno.json();

        //preencehndo os campos do formulário com os dados retornados
        document.getElementById("rua").value = dados.logradouro;
        document.getElementById("bairro").value = dados.bairro;
        document.getElementById("cidade").value = dados.localidade;
        document.getElementById("estado").value = dados.uf;

    } catch (error) {
        console.log(error);
    }
}

function aguardandoCampos() {
    document.getElementById("rua").value = "Aguardando...";
    document.getElementById("bairro").value = "Aguardando...";
    document.getElementById("cidade").value = "Aguardando...";
    document.getElementById("estado").value = "Aguardando...";
}


// ==========================================
function validarFormulario() {

    let quantidadesErros = 0;

    let nome = document.getElementById("nome").value; 
    let sobrenome = document.getElementById("sobrenome").value;
    let email = document.getElementById("email").value;
    let telefone_DDI = document.getElementById("telefone_DDI").value;
    let telefone_ddd = document.getElementById("telefone_ddd").value;
    let telefone = document.getElementById("telefone").value;
    let cep = document.getElementById("cep").value;
    let rua = document.getElementById("rua").value;
    let numero = document.getElementById("numero").value;
    let complemento = document.getElementById("complemento").value;
    let bairro = document.getElementById("bairro").value;
    let cidade = document.getElementById("cidade").value;
    let estado = document.getElementById("estado").value;
    let anotacoes = document.getElementById("anotacoes").value;

    if (nome.trim() === "") {
        formError("nome");
        quantidadesErros++;
    } else {
        reiniciaBordas("nome");
    }

    // SOBRENOME
    if (sobrenome.trim() === "") {
        formError("sobrenome");
        quantidadesErros++;
    } else {
        reiniciaBordas("sobrenome");
    }

    // EMAIL
    if (email.trim() === "") {
        formError("email");
        quantidadesErros++;
    } else {
        reiniciaBordas("email");
    }

    // PAÍS / DDI
    if (telefone_DDI.trim() === "") {
        formError("telefone_DDI");
        quantidadesErros++;
    } else {
        reiniciaBordas("telefone_DDI");
    }

    // DDD
    if (telefone_ddd.trim() === "") {
        formError("telefone_ddd");
        quantidadesErros++;
    } else {
        reiniciaBordas("telefone_ddd");
    }

    // TELEFONE
    if (telefone.trim() === "") {
        formError("telefone");
        quantidadesErros++;
    } else {
        reiniciaBordas("telefone");
    }

    // CEP
    if (cep.trim() === "") {
        formError("cep");
        quantidadesErros++;
    } else {
        reiniciaBordas("cep");
    }

    // RUA
    if (rua.trim() === "") {
        formError("rua");
        quantidadesErros++;
    } else {
        reiniciaBordas("rua");
    }

    // NÚMERO
    if (numero.trim() === "") {
        formError("numero");
        quantidadesErros++;
    } else {
        reiniciaBordas("numero");
    }

    // COMPLEMENTO
    if (complemento.trim() === "") {
        formError("complemento");
        quantidadesErros++;
    } else {
        reiniciaBordas("complemento");
    }

    // BAIRRO
    if (bairro.trim() === "") {
        formError("bairro");
        quantidadesErros++;
    } else {
        reiniciaBordas("bairro");
    }

    // CIDADE
    if (cidade.trim() === "") {
        formError("cidade");
        quantidadesErros++;
    } else {
        reiniciaBordas("cidade");
    }

    // ESTADO
    if (estado.trim() === "") {
        formError("estado");
        quantidadesErros++;
    } else {
        reiniciaBordas("estado");
    }

    // MENSAGEM
    if (anotacoes.trim() === "") {
        formError("anotacoes");
        quantidadesErros++;
    } else {
        reiniciaBordas("anotacoes");
    }

    if (quantidadesErros > 0) {
        alert("Existem campos obrigatórios que não foram preenchidos!");
    } else {
        let objetoContato = {
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            telefone: telefone, 
            cep: cep,
            rua: rua,
            numero: numero,
            complemento: complemento,
            bairro: bairro,
            cidade: cidade,
            estado: estado,
            anotacoes: anotacoes
        }

        let cadastro = cadastrarContato(objetoContato);
        
        reiniciaTodasAsBordas();
    }
}


// ==========================================
function formError(idCampo) {
    document.getElementById(idCampo).style.border = "2px solid red";
}


// ==========================================
function reiniciaBordas(idCampo) {
    document.getElementById(idCampo).style.border = "2px solid green";
}


// ==========================================
function reiniciaTodasAsBordas() {

    // Seleciona todos os inputs e textarea
    let campos = document.querySelectorAll("input, textarea");

    campos.forEach(function (campo) {
        campo.style.border = "";
    });
}