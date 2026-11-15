function ListarProfessores(listaParaExibir = sistema.professores) {
    const lista = document.getElementById("listaProfessores");
    if (listaParaExibir.length === 0) {
        lista.innerHTML = "<p>Nenhum professor cadastrado</p>";
        return;
    }

    lista.innerHTML = "";
    for (let i = 0; i < listaParaExibir.length; i++) {
        const prof = listaParaExibir[i];
        lista.innerHTML += `
        <div class="aluno-card">
            <h3>${prof.getNome()}</h3>
            <p><strong>Matéria:</strong> ${prof.materia}</p>
            <p><strong>Turno:</strong> ${prof.turno}</p>
            <!-- TODO (GRUPO 3): Adicionar botão Excluir chamando ExcluirProfessor('${prof.cpf}') -->
        </div>
        `;
    }
}

function CadastrarProfessor() {
    const nome = document.getElementById("nome").value.trim();
    const cpf = document.getElementById("CPF").value.trim();
    const dataNascimento = document.getElementById("dataNascimento").value;
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const turno = document.getElementById("turno").value;
    const materia = document.getElementById("materia").value.trim();

    // TODO (GRUPO 3): Validar campos vazios e chamar validaCPF(cpf)

    const professor = new Professor(nome, cpf, dataNascimento, materia, email, telefone, turno);
    sistema.adicionar_Professor(professor);
    ListarProfessores();
    document.getElementById("formProfessor").reset();
    alert("Professor cadastrado com sucesso!");
}

// TODO (GRUPO 3): Criar função ExcluirProfessor(cpf)
// TODO (GRUPO 3): Criar campo de busca no professor.html e função PesquisarProfessores()

document.addEventListener("DOMContentLoaded", () => {
    ListarProfessores();
});