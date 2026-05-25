// ============================================================
// SISTEMA DE CONTROLE DE TREINOS - VERSÃO WEB
// ============================================================

class Exercicio {
    constructor(nome, peso, series, repeticoes = 0) {
        this.nome = nome;
        this.peso = peso;
        this.series = series;
        this.repeticoes = repeticoes;
    }

    toString() {
        return `${this.nome} - ${this.peso}kg x ${this.series} séries`;
    }
}

class Treino {
    constructor(tipo, data = null) {
        this.tipo = tipo;
        this.data = data || new Date().toLocaleString('pt-BR');
        this.exercicios = [];
    }

    adicionarExercicio(exercicio) {
        this.exercicios.push(exercicio);
    }

    removerExercicio(indice) {
        if (indice >= 0 && indice < this.exercicios.length) {
            this.exercicios.splice(indice, 1);
        }
    }

    toString() {
        return `Treino ${this.tipo} - ${this.data} (${this.exercicios.length} exercícios)`;
    }
}

class Aluno {
    constructor(nome, matricula = null) {
        this.nome = nome;
        this.matricula = matricula || this.gerarMatricula();
        this.dataInscricao = new Date().toLocaleDateString('pt-BR');
        this.treinos = [];
    }

    gerarMatricula() {
        return 'MAT' + Math.random().toString(36).substr(2, 8).toUpperCase();
    }

    adicionarTreino(treino) {
        this.treinos.push(treino);
    }

    getTreinosPorTipo(tipo) {
        return this.treinos.filter(t => t.tipo === tipo);
    }

    getUltimoTreino() {
        return this.treinos.length > 0 ? this.treinos[this.treinos.length - 1] : null;
    }

    getExercicioHistorico(nomeExercicio) {
        const historico = [];
        this.treinos.forEach(treino => {
            treino.exercicios.forEach(exercicio => {
                if (exercicio.nome.toLowerCase() === nomeExercicio.toLowerCase()) {
                    historico.push({
                        data: treino.data,
                        tipo: treino.tipo,
                        peso: exercicio.peso,
                        series: exercicio.series,
                        repeticoes: exercicio.repeticoes
                    });
                }
            });
        });
        return historico;
    }

    toString() {
        return `${this.nome} (Mat: ${this.matricula})`;
    }
}

// ============================================================
// GERENCIADOR PRINCIPAL
// ============================================================

class SistemaAcademia {
    constructor() {
        this.alunos = {};
        this.alunoSelecionado = null;
        this.exerciciosTempTreino = [];
        this.carregarDados();
        this.inicializarEventos();
        this.atualizarDashboard();
    }

    // ========== DADOS ==========

    carregarDados() {
        const dados = localStorage.getItem('sistema-academia');
        if (dados) {
            try {
                const alunos = JSON.parse(dados);
                Object.keys(alunos).forEach(matricula => {
                    const alunoData = alunos[matricula];
                    const aluno = new Aluno(alunoData.nome, alunoData.matricula);
                    aluno.dataInscricao = alunoData.dataInscricao;
                    
                    alunoData.treinos.forEach(treinoData => {
                        const treino = new Treino(treinoData.tipo, treinoData.data);
                        treinoData.exercicios.forEach(exData => {
                            treino.adicionarExercicio(
                                new Exercicio(exData.nome, exData.peso, exData.series, exData.repeticoes)
                            );
                        });
                        aluno.adicionarTreino(treino);
                    });
                    
                    this.alunos[matricula] = aluno;
                });
            } catch (e) {
                console.error('Erro ao carregar dados:', e);
            }
        }
    }

    salvarDados() {
        const alunos = {};
        Object.keys(this.alunos).forEach(matricula => {
            const aluno = this.alunos[matricula];
            alunos[matricula] = {
                nome: aluno.nome,
                matricula: aluno.matricula,
                dataInscricao: aluno.dataInscricao,
                treinos: aluno.treinos.map(t => ({
                    tipo: t.tipo,
                    data: t.data,
                    exercicios: t.exercicios.map(e => ({
                        nome: e.nome,
                        peso: e.peso,
                        series: e.series,
                        repeticoes: e.repeticoes
                    }))
                }))
            };
        });
        localStorage.setItem('sistema-academia', JSON.stringify(alunos));
        this.mostrarToast('Dados salvos com sucesso!', 'success');
    }

    limparDados() {
        if (confirm('Tem certeza que deseja DELETAR TODOS os dados? Esta ação não pode ser desfeita!')) {
            this.alunos = {};
            this.alunoSelecionado = null;
            localStorage.removeItem('sistema-academia');
            this.atualizarDashboard();
            this.atualizarInterface();
            this.mostrarToast('Todos os dados foram deletados!', 'success');
        }
    }

    // ========== ALUNOS ==========

    adicionarAluno(nome) {
        if (!nome.trim()) {
            this.mostrarToast('Nome não pode ser vazio!', 'error');
            return false;
        }

        const aluno = new Aluno(nome);
        this.alunos[aluno.matricula] = aluno;
        this.salvarDados();
        this.mostrarToast(`Aluno '${nome}' cadastrado com sucesso!`, 'success');
        this.atualizarInterface();
        return true;
    }

    obterAluno(matricula) {
        return this.alunos[matricula];
    }

    buscarAlunosPorNome(nome) {
        return Object.values(this.alunos).filter(aluno =>
            aluno.nome.toLowerCase().includes(nome.toLowerCase()) ||
            aluno.matricula.toLowerCase().includes(nome.toLowerCase())
        );
    }

    listarAlunos() {
        return Object.values(this.alunos);
    }

    deletarAluno(matricula) {
        if (confirm('Tem certeza que deseja deletar este aluno?')) {
            delete this.alunos[matricula];
            if (this.alunoSelecionado && this.alunoSelecionado.matricula === matricula) {
                this.alunoSelecionado = null;
            }
            this.salvarDados();
            this.atualizarInterface();
            this.mostrarToast('Aluno deletado com sucesso!', 'success');
        }
    }

    selecionarAluno(matricula) {
        const aluno = this.obterAluno(matricula);
        if (aluno) {
            this.alunoSelecionado = aluno;
            document.getElementById('alunoSelecionado').textContent = 
                `👤 ${aluno.nome} (${aluno.matricula})`;
            document.getElementById('formularioTreinoContainer').style.display = 'block';
            this.atualizarInterface();
            return true;
        }
        return false;
    }

    // ========== TREINOS ==========

    adicionarTreino(matricula, tipo, data, exercicios) {
        const aluno = this.obterAluno(matricula);
        if (!aluno) return false;

        const treino = new Treino(tipo, data);
        exercicios.forEach(ex => {
            treino.adicionarExercicio(new Exercicio(ex.nome, ex.peso, ex.series, ex.repeticoes));
        });

        aluno.adicionarTreino(treino);
        this.salvarDados();
        this.mostrarToast('Treino registrado com sucesso!', 'success');
        return true;
    }

    obterUltimoTreino(matricula) {
        const aluno = this.obterAluno(matricula);
        return aluno ? aluno.getUltimoTreino() : null;
    }

    obterHistoricoExercicio(matricula, nomeExercicio) {
        const aluno = this.obterAluno(matricula);
        return aluno ? aluno.getExercicioHistorico(nomeExercicio) : [];
    }

    obterExerciciosUnicos(matricula) {
        const aluno = this.obterAluno(matricula);
        if (!aluno) return [];

        const exercicios = new Set();
        aluno.treinos.forEach(treino => {
            treino.exercicios.forEach(ex => {
                exercicios.add(ex.nome);
            });
        });
        return Array.from(exercicios).sort();
    }

    // ========== RELATÓRIOS ==========

    gerarRelatorio(matricula) {
        const aluno = this.obterAluno(matricula);
        if (!aluno) return null;

        const tipos = {};
        let totalExercicios = 0;
        const cargasMax = {};

        aluno.treinos.forEach(treino => {
            tipos[treino.tipo] = (tipos[treino.tipo] || 0) + 1;
            treino.exercicios.forEach(ex => {
                totalExercicios++;
                if (!cargasMax[ex.nome] || ex.peso > cargasMax[ex.nome]) {
                    cargasMax[ex.nome] = ex.peso;
                }
            });
        });

        return {
            nome: aluno.nome,
            matricula: aluno.matricula,
            dataInscricao: aluno.dataInscricao,
            totalTreinos: aluno.treinos.length,
            totalExercicios: totalExercicios,
            tipos: tipos,
            cargasMaximas: cargasMax
        };
    }

    // ========== ESTATÍSTICAS ==========

    obterEstatisticas() {
        let totalTreinos = 0;
        let totalExercicios = 0;

        Object.values(this.alunos).forEach(aluno => {
            totalTreinos += aluno.treinos.length;
            aluno.treinos.forEach(treino => {
                totalExercicios += treino.exercicios.length;
            });
        });

        return {
            totalAlunos: Object.keys(this.alunos).length,
            totalTreinos: totalTreinos,
            totalExercicios: totalExercicios,
            ultimaAtualizacao: new Date().toLocaleString('pt-BR')
        };
    }

    // ========== UI ==========

    mostrarToast(mensagem, tipo = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = mensagem;
        toast.className = `toast show ${tipo}`;
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    atualizarDashboard() {
        const stats = this.obterEstatisticas();
        document.getElementById('totalAlunos').textContent = stats.totalAlunos;
        document.getElementById('totalTreinos').textContent = stats.totalTreinos;
        document.getElementById('totalExercicios').textContent = stats.totalExercicios;
        document.getElementById('ultimaAtualizacao').textContent = stats.ultimaAtualizacao;

        // Alunos ativos
        const alunosAtivosDiv = document.getElementById('alunosAtivos');
        const alunos = this.listarAlunos();
        
        if (alunos.length === 0) {
            alunosAtivosDiv.innerHTML = '<p class="empty-state">Nenhum aluno cadastrado</p>';
        } else {
            alunosAtivosDiv.innerHTML = alunos.map(aluno => `
                <div class="aluno-item">
                    <strong>${aluno.nome}</strong>
                    <br>
                    <small>Mat: ${aluno.matricula} | ${aluno.treinos.length} treino(s)</small>
                </div>
            `).join('');
        }

        // Últimos treinos
        const ultimosTreinosDiv = document.getElementById('ultimosTreinos');
        const todosTreinos = [];
        alunos.forEach(aluno => {
            aluno.treinos.forEach(treino => {
                todosTreinos.push({ aluno: aluno.nome, treino });
            });
        });

        const treinos = todosTreinos.slice(-5).reverse();
        
        if (treinos.length === 0) {
            ultimosTreinosDiv.innerHTML = '<p class="empty-state">Nenhum treino registrado</p>';
        } else {
            ultimosTreinosDiv.innerHTML = treinos.map(item => `
                <div class="treino-item">
                    <strong>${item.aluno}</strong> - Treino ${item.treino.tipo}
                    <br>
                    <small>${item.treino.data}</small>
                </div>
            `).join('');
        }
    }

    atualizarInterface() {
        this.atualizarDashboard();
        this.atualizarListaAlunos();
        this.atualizarSelectAlunos();
    }

    atualizarListaAlunos() {
        const tbody = document.getElementById('alunosTableBody');
        const alunos = this.listarAlunos();

        if (alunos.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center">Nenhum aluno cadastrado</td></tr>';
            return;
        }

        tbody.innerHTML = alunos.map(aluno => `
            <tr>
                <td>${aluno.nome}</td>
                <td>${aluno.matricula}</td>
                <td>${aluno.dataInscricao}</td>
                <td>${aluno.treinos.length}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-secondary" onclick="sistema.selecionarAluno('${aluno.matricula}')">Selecionar</button>
                        <button class="btn btn-danger" onclick="sistema.deletarAluno('${aluno.matricula}')">Deletar</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    atualizarSelectAlunos() {
        const selects = [
            'selecionarAluno',
            'alunoEvolucao',
            'alunoRelatorio'
        ];

        selects.forEach(selectId => {
            const select = document.getElementById(selectId);
            const alunos = this.listarAlunos();
            const currentValue = select.value;

            select.innerHTML = '<option value="">-- Selecione um aluno --</option>';
            alunos.forEach(aluno => {
                const option = document.createElement('option');
                option.value = aluno.matricula;
                option.textContent = aluno.nome;
                select.appendChild(option);
            });

            if (currentValue && this.obterAluno(currentValue)) {
                select.value = currentValue;
            }
        });
    }

    atualizarSelectExercicios(matricula) {
        const select = document.getElementById('exercicioEvolucao');
        select.innerHTML = '<option value="">-- Selecione um exercício --</option>';

        if (!matricula) return;

        const exercicios = this.obterExerciciosUnicos(matricula);
        exercicios.forEach(exercicio => {
            const option = document.createElement('option');
            option.value = exercicio;
            option.textContent = exercicio;
            select.appendChild(option);
        });
    }

    // ========== INICIALIZAÇÃO ==========

    inicializarEventos() {
        // Menu
        document.querySelectorAll('.menu-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                const section = e.target.dataset.section;
                document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
                document.getElementById(section).classList.add('active');
            });
        });

        // Alunos
        document.getElementById('formNovoAluno').addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('nomeAluno').value;
            if (this.adicionarAluno(nome)) {
                document.getElementById('formNovoAluno').reset();
            }
        });

        document.getElementById('buscarAluno').addEventListener('input', (e) => {
            const termo = e.target.value;
            this.buscarAlunos(termo);
        });

        // Treinos
        document.getElementById('selecionarAluno').addEventListener('change', (e) => {
            if (e.target.value) {
                this.selecionarAluno(e.target.value);
                document.getElementById('tipoTreino').focus();
            }
        });

        // Data padrão
        const now = new Date();
        const dataFormatada = now.toISOString().slice(0, 16);
        document.getElementById('dataTreino').value = dataFormatada;

        document.getElementById('btnAdicionarExercicio').addEventListener('click', () => {
            this.adicionarExercicioTemp();
        });

        document.getElementById('formNovoTreino').addEventListener('submit', (e) => {
            e.preventDefault();
            this.salvarNovoTreino();
        });

        // Evolução
        document.getElementById('alunoEvolucao').addEventListener('change', (e) => {
            if (e.target.value) {
                this.atualizarSelectExercicios(e.target.value);
            }
        });

        document.getElementById('exercicioEvolucao').addEventListener('change', (e) => {
            if (e.target.value) {
                this.mostrarEvolucao(
                    document.getElementById('alunoEvolucao').value,
                    e.target.value
                );
            }
        });

        // Relatórios
        document.getElementById('alunoRelatorio').addEventListener('change', (e) => {
            if (e.target.value) {
                this.mostrarRelatorio(e.target.value);
            }
        });

        // Botões gerais
        document.getElementById('btnLimpar').addEventListener('click', () => {
            this.limparDados();
        });

        // Modal
        const modal = document.getElementById('modal');
        document.querySelector('.modal-close').addEventListener('click', () => {
            modal.classList.remove('active');
        });

        document.getElementById('btnModalFechar').addEventListener('click', () => {
            modal.classList.remove('active');
        });

        document.getElementById('btnExportarPDF').addEventListener('click', () => {
            this.exportarRelatorioCSV();
        });

        // Atualizar data padrão quando voltar para treinos
        document.querySelector('[data-section="treinos"]').addEventListener('click', () => {
            const now = new Date();
            const dataFormatada = now.toISOString().slice(0, 16);
            document.getElementById('dataTreino').value = dataFormatada;
        });
    }

    adicionarExercicioTemp() {
        const nome = document.getElementById('nomeExercicio').value;
        const peso = parseFloat(document.getElementById('pesoExercicio').value);
        const series = parseInt(document.getElementById('seriesExercicio').value);
        const repeticoes = parseInt(document.getElementById('repeticoes').value) || 0;

        if (!nome || !peso || !series) {
            this.mostrarToast('Preencha todos os campos do exercício!', 'error');
            return;
        }

        this.exerciciosTempTreino.push(new Exercicio(nome, peso, series, repeticoes));
        this.atualizarListaExerciciosTreino();

        // Limpar formulário
        document.getElementById('nomeExercicio').value = '';
        document.getElementById('pesoExercicio').value = '';
        document.getElementById('seriesExercicio').value = '';
        document.getElementById('repeticoes').value = '';
        document.getElementById('nomeExercicio').focus();
    }

    removerExercicioTemp(indice) {
        this.exerciciosTempTreino.splice(indice, 1);
        this.atualizarListaExerciciosTreino();
    }

    atualizarListaExerciciosTreino() {
        const container = document.getElementById('exerciciosList');

        if (this.exerciciosTempTreino.length === 0) {
            container.innerHTML = '<p class="empty-state">Nenhum exercício adicionado</p>';
            return;
        }

        container.innerHTML = this.exerciciosTempTreino.map((ex, indice) => `
            <div class="exercicio-item">
                <div class="exercicio-info">
                    <div class="exercicio-name">${ex.nome}</div>
                    <div class="exercicio-details">${ex.peso}kg x ${ex.series} séries ${ex.repeticoes ? `x ${ex.repeticoes} rep` : ''}</div>
                </div>
                <button type="button" class="btn btn-danger btn-small" onclick="sistema.removerExercicioTemp(${indice})">
                    🗑️ Remover
                </button>
            </div>
        `).join('');
    }

    salvarNovoTreino() {
        if (!this.alunoSelecionado) {
            this.mostrarToast('Selecione um aluno primeiro!', 'error');
            return;
        }

        const tipo = document.getElementById('tipoTreino').value.toUpperCase();
        const data = document.getElementById('dataTreino').value;

        if (!tipo || this.exerciciosTempTreino.length === 0) {
            this.mostrarToast('Preencha tipo de treino e adicione exercícios!', 'error');
            return;
        }

        const dataFormatada = new Date(data).toLocaleString('pt-BR');
        if (this.adicionarTreino(
            this.alunoSelecionado.matricula,
            tipo,
            dataFormatada,
            this.exerciciosTempTreino
        )) {
            this.exerciciosTempTreino = [];
            this.atualizarListaExerciciosTreino();
            document.getElementById('formNovoTreino').reset();
            this.atualizarInterface();
        }
    }

    buscarAlunos(termo) {
        const tbody = document.getElementById('alunosTableBody');
        let alunos = this.listarAlunos();

        if (termo) {
            alunos = alunos.filter(a =>
                a.nome.toLowerCase().includes(termo.toLowerCase()) ||
                a.matricula.toLowerCase().includes(termo.toLowerCase())
            );
        }

        if (alunos.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center">Nenhum aluno encontrado</td></tr>';
            return;
        }

        tbody.innerHTML = alunos.map(aluno => `
            <tr>
                <td>${aluno.nome}</td>
                <td>${aluno.matricula}</td>
                <td>${aluno.dataInscricao}</td>
                <td>${aluno.treinos.length}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-secondary" onclick="sistema.selecionarAluno('${aluno.matricula}')">Selecionar</button>
                        <button class="btn btn-danger" onclick="sistema.deletarAluno('${aluno.matricula}')">Deletar</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    mostrarEvolucao(matricula, nomeExercicio) {
        const historico = this.obterHistoricoExercicio(matricula, nomeExercicio);
        const container = document.getElementById('evolucaoContainer');

        if (historico.length === 0) {
            this.mostrarToast('Nenhum registro encontrado para este exercício!', 'error');
            container.style.display = 'none';
            return;
        }

        container.style.display = 'block';

        // Histórico
        const historicoDiv = document.getElementById('historicoDados');
        historicoDiv.innerHTML = historico.map((h, indice) => `
            <div class="historico-item">
                <strong>${indice + 1}. ${h.data}</strong>
                <br>
                Treino ${h.tipo}: ${h.peso}kg x ${h.series} séries ${h.repeticoes ? `x ${h.repeticoes} rep` : ''}
            </div>
        `).join('');

        // Análise
        const primeiro = historico[0];
        const ultimo = historico[historico.length - 1];
        const evolucao = ultimo.peso - primeiro.peso;
        const percentual = (evolucao / primeiro.peso * 100).toFixed(2);

        const evolucaoDiv = document.getElementById('evolucaoAnalise');
        let classe = evolucao > 0 ? '' : 'negativo';

        evolucaoDiv.innerHTML = `
            <div class="evolucao-stat ${classe}">
                <div class="evolucao-stat-label">Primeira Carga</div>
                <div class="evolucao-stat-value">${primeiro.peso}kg</div>
            </div>
            <div class="evolucao-stat ${classe}">
                <div class="evolucao-stat-label">Última Carga</div>
                <div class="evolucao-stat-value">${ultimo.peso}kg</div>
            </div>
            <div class="evolucao-stat ${classe}">
                <div class="evolucao-stat-label">Evolução</div>
                <div class="evolucao-stat-value">${evolucao > 0 ? '+' : ''}${evolucao}kg (${evolucao > 0 ? '+' : ''}${percentual}%)</div>
            </div>
            <div class="evolucao-stat">
                <div class="evolucao-stat-label">Registros</div>
                <div class="evolucao-stat-value">${historico.length}</div>
            </div>
        `;

        // Gráfico
        this.desenharGrafico(historico);
    }

    desenharGrafico(historico) {
        const canvas = document.getElementById('graficoProgresso');
        const ctx = canvas.getContext('2d');

        // Dados
        const labels = historico.map((_, i) => `Treino ${i + 1}`);
        const dados = historico.map(h => h.peso);

        // Limpar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dimensões
        const margin = 40;
        const width = canvas.width - 2 * margin;
        const height = canvas.height - 2 * margin;

        // Escala
        const maxPeso = Math.max(...dados);
        const minPeso = Math.min(...dados) - 5;
        const range = maxPeso - minPeso;

        // Background
        ctx.fillStyle = '#f9fafb';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Grade
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
            const y = margin + (height / 5) * i;
            ctx.beginPath();
            ctx.moveTo(margin, y);
            ctx.lineTo(margin + width, y);
            ctx.stroke();
        }

        // Eixos
        ctx.strokeStyle = '#6b7280';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(margin, margin);
        ctx.lineTo(margin, margin + height);
        ctx.lineTo(margin + width, margin + height);
        ctx.stroke();

        // Linha de tendência
        ctx.strokeStyle = '#4f46e5';
        ctx.lineWidth = 3;
        ctx.beginPath();
        dados.forEach((peso, i) => {
            const x = margin + (width / (dados.length - 1)) * i;
            const y = margin + height - ((peso - minPeso) / range) * height;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Pontos
        ctx.fillStyle = '#8b5cf6';
        dados.forEach((peso, i) => {
            const x = margin + (width / (dados.length - 1)) * i;
            const y = margin + height - ((peso - minPeso) / range) * height;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
        });

        // Labels X
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        labels.forEach((label, i) => {
            const x = margin + (width / (dados.length - 1)) * i;
            ctx.fillText(label, x, canvas.height - 15);
        });

        // Labels Y
        ctx.textAlign = 'right';
        for (let i = 0; i <= 5; i++) {
            const peso = minPeso + (range / 5) * i;
            const y = margin + height - (height / 5) * i;
            ctx.fillText(peso.toFixed(1), margin - 10, y + 5);
        }
    }

    mostrarRelatorio(matricula) {
        const relatorio = this.gerarRelatorio(matricula);
        if (!relatorio) return;

        const container = document.getElementById('relatorioContainer');
        container.style.display = 'block';

        document.getElementById('relatorioNome').textContent = relatorio.nome;
        document.getElementById('relatorioMatricula').textContent = `Matrícula: ${relatorio.matricula} | Inscrição: ${relatorio.dataInscricao}`;

        document.getElementById('relTotalTreinos').textContent = relatorio.totalTreinos;
        document.getElementById('relTotalExercicios').textContent = relatorio.totalExercicios;
        document.getElementById('relTiposTreino').textContent = Object.keys(relatorio.tipos).join(', ') || '-';

        // Distribuição
        const distribuicaoDiv = document.getElementById('distribuicaoTipo');
        if (Object.keys(relatorio.tipos).length === 0) {
            distribuicaoDiv.innerHTML = '<p class="empty-state">Nenhum treino registrado</p>';
        } else {
            distribuicaoDiv.innerHTML = Object.entries(relatorio.tipos).map(([tipo, qtd]) => `
                <div class="distribuicao-item">
                    <span class="distribuicao-label">Treino ${tipo}</span>
                    <span class="distribuicao-value">${qtd} treino(s)</span>
                </div>
            `).join('');
        }

        // Cargas máximas
        const cargasDiv = document.getElementById('cargasMaximas');
        if (Object.keys(relatorio.cargasMaximas).length === 0) {
            cargasDiv.innerHTML = '<p class="empty-state">Nenhum exercício registrado</p>';
        } else {
            cargasDiv.innerHTML = Object.entries(relatorio.cargasMaximas)
                .sort((a, b) => b[1] - a[1])
                .map(([nome, peso]) => `
                <div class="cargas-item">
                    <span class="cargas-label">${nome}</span>
                    <span class="cargas-value">${peso}kg</span>
                </div>
            `).join('');
        }
    }

    exportarRelatorioCSV() {
        const matricula = document.getElementById('alunoRelatorio').value;
        const relatorio = this.gerarRelatorio(matricula);
        if (!relatorio) return;

        let csv = 'RELATÓRIO DE ALUNO\n';
        csv += `Nome,${relatorio.nome}\n`;
        csv += `Matrícula,${relatorio.matricula}\n`;
        csv += `Data de Inscrição,${relatorio.dataInscricao}\n\n`;

        csv += 'RESUMO\n';
        csv += `Total de Treinos,${relatorio.totalTreinos}\n`;
        csv += `Total de Exercícios,${relatorio.totalExercicios}\n\n`;

        csv += 'DISTRIBUIÇÃO POR TIPO\n';
        csv += 'Tipo,Quantidade\n';
        Object.entries(relatorio.tipos).forEach(([tipo, qtd]) => {
            csv += `Treino ${tipo},${qtd}\n`;
        });

        csv += '\nCARGAS MÁXIMAS\n';
        csv += 'Exercício,Peso (kg)\n';
        Object.entries(relatorio.cargasMaximas).forEach(([nome, peso]) => {
            csv += `${nome},${peso}\n`;
        });

        // Download
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
        element.setAttribute('download', `relatorio-${relatorio.matricula}.csv`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

        this.mostrarToast('Relatório exportado com sucesso!', 'success');
    }
}

// ============================================================
// INICIALIZAÇÃO
// ============================================================

let sistema;

document.addEventListener('DOMContentLoaded', () => {
    sistema = new SistemaAcademia();
});
