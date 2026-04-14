function validarFormulario() {
    let nome = document.getElementById("nome").value;
    let quantidadeErros = 0;
    if(nome.trim().length == 0) {
        formError("nome");
        quantidadeErros++;
        //alert("O campo nome é obrigatório!")
    }else{
        reiniciaBorda("nome");
    }

    if(quantidadeErros > 0){
        alert("Existem" + quantidadeErros + "erros no formulário!");
        quantidadeErros = 0;
    }else{
        alert("Formulário enviado com sucesso!");
        reiniciaTodasAsBordas();
    }
}

function formError(idCampo){
    document.getElementById(idCampo).style.border = "2px solid red";
}

function reiniciaBorda(idCampo){
    document.getElementById(idCampo).style.border = "transparent";
}