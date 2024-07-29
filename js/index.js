document.getElementById('consultarBtn').addEventListener('click', function () {
    const cnpj = document.getElementById('cnpjInput').value.replace(/\D/g, '')

    if (cnpj.length !== 14) {
        alert('CNPJ inválido')

        return;
    }

    fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('CNPJ not found')

                return;
            }
            displayData(data)
        })
        .catch(error => console.error('Erro na consulta:', error));
});

function displayData(data) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
    
    <h2>Dados da Empresa</h2>
        <form id="empresaForm">
            <div class="form-group">
                <label for="nome">Nome:</label>
                <input type="text" class="form-control" id="nome" value="${data.nome}">
            </div>
            <div class="form-group">
                <label for="razaoSocial">Razão Social:</label>
                <input type="text" class="form-control" id="razaoSocial" value="${data.razao_social}">
            </div>
            <div class="form-group">
                <label for="dataAbertura">Data de Abertura:</label>
                <input type="text" class="form-control" id="dataAbertura" value="${data.data_inicio_atividade}">
            </div>
            <div class="form-group">
                <label for="situacao">Situação:</label>
                <input type="text" class="form-control" id="situacao" value="${data.situacao}">
            </div>
            <div class="form-group">
                <label for="atividadePrincipal">Atividade Principal:</label>
                <input type="text" class="form-control" id="atividadePrincipal" value="${data.cnae_fiscal_descricao}">
            </div>
            <div class="form-group">
                <label for="endereco">Endereço Completo:</label>
                <input type="text" class="form-control" id="endereco" value="${data.logradouro}, ${data.numero}, ${data.bairro}, ${data.municipio}, ${data.uf}">
            </div>
            <div class="form-group">
                <label for="telefone">Telefone:</label>
                <input type="text" class="form-control" id="telefone" value="${data.ddd_telefone_1}">
            </div>
            <div class="form-group">
                <label for="email">E-mail:</label>
                <input type="text" class="form-control" id="email" value="${data.email}">
            </div>
            <button type="submit" class="btn btn-success">Salvar Alterações</button>
        </form>
        <h3 class="mt-5">Sócios</h3>
        <div class="card-columns">
            ${data.qsa.map(socio => `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${socio.nome}</h5>
                        <p class="card-text">Qualificação: ${socio.qual}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    
    `;
    
    resultadoDiv.style.display = 'block'

    document.getElementById('empresaForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        alert('Alterações salvas!');
    });
}