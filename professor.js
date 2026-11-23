function ListarProfessores(listaParaExibir = sistema.professores) {
    const lista = document.getElementById("listaProfessores");
    if (!lista) return;

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
            <button type="button" onclick="ExcluirProfessor('${prof.cpf}')">Excluir</button>
        </div>
        `;
    }
}

function CadastrarProfessor() {
    const form = document.getElementById("formProfessor");
    if (!form.reportValidity()) return;

    const nome = document.getElementById("nome").value.trim();
    const cpf = document.getElementById("CPF").value.trim();
    const dataNascimento = document.getElementById("dataNascimento").value;
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const turno = document.getElementById("turno").value;
    const materia = document.getElementById("materia").value.trim();

    if (!nome ||
        !cpf ||
        !dataNascimento ||
        !email ||
        !telefone ||
        !turno ||
        !materia) {
        alert("Todos os campos devem ser preenchidos!");
        return;
    }

    if (!validaCPF(cpf)) {
        alert("CPF inválido!");
        return;
    }

    const professor = new Professor(nome, cpf, dataNascimento, materia, email, telefone, turno);
    sistema.adicionar_Professor(professor);
    ListarProfessores();
    form.reset();
    alert("Professor cadastrado com sucesso!");
}

function ExcluirProfessor(cpf) {
    if (confirm("Deseja realmente excluir este professor?")) {
        sistema.removerProfessor(cpf);
        ListarProfessores();
        alert("Professor excluído com sucesso!");
    }
}

function PesquisarProfessores() {
    const campoPesquisa = document.getElementById("pesquisaprofessor");
    if (!campoPesquisa) return;

    const termoPesquisa = campoPesquisa.value.trim().toLowerCase();
    const professoresFiltrados = sistema.professores.filter(professor =>
        professor.getNome().toLowerCase().includes(termoPesquisa) ||
        professor.materia.toLowerCase().includes(termoPesquisa)
    );

    ListarProfessores(professoresFiltrados);
}

document.addEventListener("DOMContentLoaded", () => {
    ListarProfessores();

    const campoPesquisa = document.getElementById("pesquisaprofessor");
    if (campoPesquisa) {
        campoPesquisa.addEventListener("input", PesquisarProfessores);
    }
});