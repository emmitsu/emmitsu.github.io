(function () {
    const ferramentas = document.querySelector(".tools");

    if (ferramentas) {
        ferramentas.hidden = false;
    }

    const documento = document.documentElement;
    const status = document.getElementById("status");
    const botaoContraste = document.getElementById("btn-contraste");
    const botaoAumentar = document.getElementById("btn-mais");
    const botaoDiminuir = document.getElementById("btn-menos");

    let tamanhoFonte = 100;
    let altoContraste = false;

    function recuperarConfiguracao(chave) {
        try {
            return localStorage.getItem(chave);
        } catch (erro) {
            return null;
        }
    }

    function salvarConfiguracao(chave, valor) {
        try {
            localStorage.setItem(chave, valor);
        } catch (erro) {
            return;
        }
    }

    function aplicarConfiguracoes(mensagem) {
        documento.style.fontSize = tamanhoFonte + "%";

        if (altoContraste) {
            documento.setAttribute("data-contraste", "alto");
        } else {
            documento.removeAttribute("data-contraste");
        }

        if (botaoContraste) {
            botaoContraste.setAttribute("aria-pressed", String(altoContraste));
        }

        if (mensagem && status) {
            status.textContent = mensagem;
        }
    }

    const tamanhoSalvo = parseInt(recuperarConfiguracao("tam"), 10);

    if (tamanhoSalvo >= 90 && tamanhoSalvo <= 160) {
        tamanhoFonte = tamanhoSalvo;
    }

    altoContraste = recuperarConfiguracao("contraste") === "1";

    aplicarConfiguracoes();

    if (botaoAumentar) {
        botaoAumentar.addEventListener("click", function () {
            tamanhoFonte = Math.min(160, tamanhoFonte + 10);
            salvarConfiguracao("tam", tamanhoFonte);
            aplicarConfiguracoes("Fonte aumentada para " + tamanhoFonte + "%");
        });
    }

    if (botaoDiminuir) {
        botaoDiminuir.addEventListener("click", function () {
            tamanhoFonte = Math.max(90, tamanhoFonte - 10);
            salvarConfiguracao("tam", tamanhoFonte);
            aplicarConfiguracoes("Fonte reduzida para " + tamanhoFonte + "%");
        });
    }

    if (botaoContraste) {
        botaoContraste.addEventListener("click", function () {
            altoContraste = !altoContraste;
            salvarConfiguracao("contraste", altoContraste ? "1" : "0");

            aplicarConfiguracoes(
                altoContraste
                    ? "Alto contraste ativado"
                    : "Alto contraste desativado"
            );
        });
    }
})();
