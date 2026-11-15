function ListarAlunos(listaParaExibir = sistema.alunos) {
    const lista = document.getElementById("listaAlunos");
    if (listaParaExibir.length === 0) {
        lista.innerHTML = "<p>Nenhum aluno cadastrado</p>";
        return;
    }

    lista.innerHTML = "";
    for (let i = 0; i < listaParaExibir.length; i++) {
        const aluno = listaParaExibir[i];
        lista.innerHTML += `
        <div class="aluno-card">
            <h3>${aluno.getNome()}</h3>
            <p><strong>Matrícula:</strong> ${aluno.matricula}</p>
            <p><strong>Curso:</strong> ${aluno.curso}</p>
            <p><strong>Turno:</strong> ${aluno.turno}</p>
            <!-- TODO (GRUPO 2): Adicionar botão Excluir chamando ExcluirAluno('${aluno.matricula}') -->
        </div>
        `;
    }
}

function CadastrarAluno() {
    const form = document.getElementById("formAluno");
    if (!form.reportValidity()) return;

    const nome = document.getElementById("nome").value.trim();
    const cpf = document.getElementById("CPF").value.trim();
    const dataNascimento = document.getElementById("dataNascimento").value;
    const matricula = document.getElementById("matricula").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const turno = document.getElementById("turno").value;
    const curso = document.getElementById("curso").value;

    // TODO (GRUPO 2): Validar CPF usando validaCPF(cpf) e impedir matrícula duplicada

    const aluno = new Aluno(nome, cpf, dataNascimento, matricula, email, telefone, turno, curso);
    sistema.adicionar_Aluno(aluno);
    ListarAlunos();
    form.reset();
    alert("Aluno cadastrado com sucesso!");
}

// TODO (GRUPO 2): Criar função ExcluirAluno(matricula)
// TODO (GRUPO 2): Criar função PesquisarAlunos() conectada ao input #pesquisaAluno

document.addEventListener("DOMContentLoaded", () => {
    ListarAlunos();
});