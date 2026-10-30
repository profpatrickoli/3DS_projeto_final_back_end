async function carregar_produtos(busca=false) {
    // Lógica para verificar se a pessoa já entrou no site através de um link com parâmetros
    if (busca==false) {
        const paramsDaUrl = new URLSearchParams(window.location.search);
        if (paramsDaUrl.toString() !== "") {
            if (paramsDaUrl.has("busca")) {
                document.getElementById("input-busca").value = paramsDaUrl.get("busca");
            }
            if (paramsDaUrl.has("ordenacao")) {
                document.getElementById("select-ordem").value = paramsDaUrl.get("ordenacao");
            }
        }
    }

    const params = new URLSearchParams();
    const valorBusca = document.getElementById("input-busca").value;
    const valorOrdem = document.getElementById("select-ordem").value;
    if (valorBusca.trim() !== "") {
        params.append("busca", valorBusca);
    }
    if (valorOrdem.trim() !== "") {
        params.append("ordenacao", valorOrdem);
    }

    const paramsString = params.toString();
    // preenche os parâmetros na URL do navegador
    window.history.pushState({}, "", paramsString ? `?${paramsString}` : window.location.pathname);


    try{
        // busca dos produtos na API com parâmetros
        const produtos =  await buscar_produtos(params)

        // lógica para mostrar os produtos no Front-End
        const container = document.getElementById("produtos");
        container.replaceChildren();
        if (produtos.length == 0){
            document.getElementById("produtos").class = "";
            document.getElementById("produtos").innerHTML = 
                '<p style="margin: 0; text-align: center;">❌ Não foi encontrado nenhum produto para essa busca!</p>';
        }
        container.className = "grid-produtos"
        produtos.forEach(produto => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <img src="${produto.caminho_img}" alt="${produto.nome}">
                <div class="nome-produto">${produto.nome}</div>
                <div class="info">
                    <div class="descricao">${produto.descricao.substring(0, 40)}...</div>
                    <div class="preco">R$ ${produto.preco.replace(".", ",")}</div>
                </div>
                <button class="btn_enviar" onclick="comprar(${produto.id})">Comprar</button>
                `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        document.getElementById("produtos").class = "";
        document.getElementById("produtos").innerHTML = 
                '<p style="margin: 0; text-align: center;">❌ Não foi possível carregar os produtos.</p>';
    }
}

window.addEventListener("DOMContentLoaded", carregar_produtos)