/* =========================================
   FUNÇÃO AUXILIAR DE VALIDAÇÃO (GLOBAL)
   ========================================= */
function validaCPF(cpf) {
    let soma = 0, resto;
    const strCPF = String(cpf).replace(/[^\d]/g, '');
    if (strCPF.length !== 11) return false;

    const invalidos = [
        '00000000000','11111111111','22222222222','33333333333','44444444444',
        '55555555555','66666666666','77777777777','88888888888','99999999999'
    ];
    if (invalidos.includes(strCPF)) return false;

    for (let i = 1; i <= 9; i++) soma += parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(strCPF.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(strCPF.substring(10, 11))) return false;

    return true;
}

/* =========================================
   CLASSES DO SISTEMA (POO)
   ========================================= */
class Pessoa {
    #nome;
    constructor(nome, cpf, dataNascimento, email, telefone, turno) {
        this.#nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.email = email;
        this.telefone = telefone;
        this.turno = turno;
    }
    getNome() { return this.#nome; }
    setNome(novoNome) { if (novoNome.length >= 3) this.#nome = novoNome; }
}

class Aluno extends Pessoa {
    constructor(nome, cpf, dataNascimento, matricula, email, telefone, turno, curso) {
        super(nome, cpf, dataNascimento, email, telefone, turno);
        this.matricula = matricula;
        this.curso = curso;
    }
    toJSON() {
        return {
            nome: this.getNome(), cpf: this.cpf, dataNascimento: this.dataNascimento,
            matricula: this.matricula, email: this.email, telefone: this.telefone,
            turno: this.turno, curso: this.curso
        };
    }
}

class Professor extends Pessoa {
    constructor(nome, cpf, dataNascimento, materia, email, telefone, turno, id) {
        super(nome, cpf, dataNascimento, email, telefone, turno);
        this.materia = materia;
        this.id = id || `professor-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }
    toJSON() {
        return {
            nome: this.getNome(), cpf: this.cpf, dataNascimento: this.dataNascimento,
            materia: this.materia, email: this.email, telefone: this.telefone, turno: this.turno,
            id: this.id
        };
    }
}

// TODO (GRUPO 1): Criar aqui a classe Nota (matriculaAluno, materia, nota1, nota2) com método calcularMedia()

class Sistema {
    constructor() {
        this.alunos = [];
        this.professores = [];
        // TODO (GRUPO 1): Adicionar this.notas = [];
        this.carregarDados();
    }

    salvarDados() {
        localStorage.setItem("sistema_alunos", JSON.stringify(this.alunos));
        localStorage.setItem("sistema_professores", JSON.stringify(this.professores));
        // TODO (GRUPO 1): Salvar sistema_notas no localStorage
    }

    carregarDados() {
        const alunosSalvos = JSON.parse(localStorage.getItem("sistema_alunos")) || [];
        const profsSalvos = JSON.parse(localStorage.getItem("sistema_professores")) || [];

        this.alunos = alunosSalvos.map(a => new Aluno(
            a.nome, a.cpf, a.dataNascimento, a.matricula, a.email, a.telefone, a.turno, a.curso
        ));
        this.professores = profsSalvos.map(p => new Professor(
            p.nome, p.cpf, p.dataNascimento, p.materia, p.email, p.telefone, p.turno, p.id
        ));
        // TODO (GRUPO 1): Carregar sistema_notas do localStorage
    }

    adicionar_Aluno(aluno) {
        this.alunos.push(aluno);
        this.salvarDados();
    }

    adicionar_Professor(professor) {
        this.professores.push(professor);
        this.salvarDados();
    }

    removerAlunos(matricula) {
        this.alunos = this.alunos.filter(a => a.matricula !== matricula);
        this.salvarDados();
    }

    removerProfessor(cpf) {
        const indice = this.professores.findIndex(p => p.id === cpf || p.cpf === cpf);
        if (indice !== -1) {
            this.professores.splice(indice, 1);
        }
        this.salvarDados();
    }
}

const sistema = new Sistema();