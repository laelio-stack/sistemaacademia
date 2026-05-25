# 🏋️ Sistema de Controle de Treinos - Versão Web

Versão web profissional do Sistema de Controle de Treinos de Academia, desenvolvida com HTML, CSS e JavaScript puro.

## ✨ Características

### ✅ Funcionalidades Completas
- **Gerenciar Alunos**: Cadastro, busca, listagem e deleção
- **Registrar Treinos**: Tipos A/B/C/etc com múltiplos exercícios
- **Acompanhar Evolução**: Histórico, gráficos e análise automática
- **Gerar Relatórios**: Resumo completo com exportação em CSV
- **Dashboard**: Estatísticas em tempo real

### ✅ Interface Moderna
- Design responsivo (desktop, tablet, mobile)
- Sidebar intuitiva com menu
- Cards e estatísticas visuais
- Gráficos de progresso
- Notificações toast

### ✅ Dados Persistentes
- Armazenamento em localStorage
- Sem necessidade de servidor
- Dados salvos automaticamente
- Possibilidade de exportar/importar

### ✅ Zero Dependências
- HTML5 puro
- CSS3 moderno
- JavaScript vanilla (sem frameworks)
- Compatível com todos os navegadores modernos

## 🚀 Como Usar

### 1. Abrir o Sistema
Basta abrir o arquivo `index.html` no navegador:
```bash
# Windows
start index.html

# Mac
open index.html

# Linux
xdg-open index.html
```

Ou arraste o arquivo `index.html` para o navegador.

### 2. Primeiro Uso
1. Navegue até a aba **👥 Alunos**
2. Cadastre um novo aluno
3. Vá para a aba **💪 Treinos**
4. Selecione o aluno
5. Registre um treino

### 3. Acompanhar Evolução
1. Navegue até **📈 Evolução**
2. Selecione o aluno e exercício
3. Veja o histórico e gráfico

### 4. Gerar Relatórios
1. Navegue até **📋 Relatórios**
2. Selecione o aluno
3. Visualize o relatório completo
4. Exporte em CSV se necessário

## 📁 Arquivos

```
SistemaAcademia-Web/
├── index.html      (~500 linhas) - Estrutura HTML
├── style.css       (~1000 linhas) - Estilos responsivos
├── app.js          (~800 linhas) - Lógica da aplicação
└── README.md       - Este arquivo
```

## 🎯 Funcionalidades Principais

### Dashboard
- Total de alunos, treinos e exercícios
- Lista de alunos ativos
- Últimos treinos registrados
- Última atualização

### Gerenciar Alunos
- Formulário para novo aluno
- Busca em tempo real
- Tabela completa com ações
- Deleção com confirmação

### Registrar Treino
- Seleção de aluno
- Tipo de treino (A/B/C/etc)
- Múltiplos exercícios
- Validação automática
- Data/hora

### Acompanhar Evolução
- Busca por exercício
- Histórico completo
- Cálculo automático de progresso
- Gráfico de tendência
- Análise em tempo real

### Relatórios
- Resumo do aluno
- Distribuição de treinos
- Cargas máximas
- Exportação em CSV

## 💾 Armazenamento de Dados

Os dados são salvos no **localStorage** do navegador:

```javascript
// Formato armazenado
{
    "MAT12345678": {
        "nome": "João Silva",
        "matricula": "MAT12345678",
        "dataInscricao": "25/05/2026",
        "treinos": [
            {
                "tipo": "A",
                "data": "25/05/2026 14:30",
                "exercicios": [
                    {
                        "nome": "Supino Reto",
                        "peso": 80,
                        "series": 4,
                        "repeticoes": 8
                    }
                ]
            }
        ]
    }
}
```

### Backup
Para fazer backup dos dados:
1. Abra o DevTools (F12)
2. Vá para Application → LocalStorage
3. Copie o valor de "sistema-academia"
4. Salve em um arquivo JSON

### Restaurar
1. Abra o DevTools
2. Cole o valor em LocalStorage
3. Recarregue a página

## 🎨 Design

### Cores
- **Primário**: #4f46e5 (Roxo)
- **Secundário**: #8b5cf6 (Roxo claro)
- **Sucesso**: #10b981 (Verde)
- **Perigo**: #ef4444 (Vermelho)
- **Aviso**: #f59e0b (Amarelo)

### Responsividade
- Desktop: Layout completo com sidebar
- Tablet: Menu horizontal
- Mobile: Tela cheia com menu colapsável

## 🔧 Arquitetura

### Classes JavaScript

```javascript
class Exercicio {
    // Nome, peso, séries, repetições
}

class Treino {
    // Tipo, data, lista de exercícios
}

class Aluno {
    // Nome, matrícula, data inscrição, treinos
}

class SistemaAcademia {
    // Gerenciamento completo do sistema
}
```

### Métodos Principais

**Alunos**
- `adicionarAluno(nome)`
- `deletarAluno(matricula)`
- `selecionarAluno(matricula)`
- `listarAlunos()`
- `buscarAlunosPorNome(nome)`

**Treinos**
- `adicionarTreino(matricula, tipo, data, exercicios)`
- `obterUltimoTreino(matricula)`
- `obterHistoricoExercicio(matricula, nomeExercicio)`

**Relatórios**
- `gerarRelatorio(matricula)`
- `exportarRelatorioCSV()`
- `obterEstatisticas()`

## 📊 Gráficos

O sistema utiliza HTML5 Canvas para desenhar:
- Gráfico de progresso de exercícios
- Linha de tendência
- Pontos de dados
- Grade de fundo
- Labels nos eixos

## 📱 Compatibilidade

✅ Chrome/Chromium  
✅ Firefox  
✅ Safari  
✅ Edge  
✅ Opera  

Requisito mínimo: localStorage suportado (99% dos navegadores modernos)

## 💡 Dicas de Uso

1. **Organize seus treinos**: Use tipos (A, B, C) para diferentes grupos musculares
2. **Nomes descritivos**: "Supino Reto" é melhor que "Supino"
3. **Acompanhe regularmente**: Veja o progresso em tempo real
4. **Faça backups**: Exporte seus dados regularmente
5. **Limpe dados antigos**: Use "Limpar Dados" quando necessário

## 🚀 Próximas Melhorias

- [ ] Sincronização com servidor
- [ ] Múltiplos usuários
- [ ] Importar dados do sistema Python
- [ ] Aplicativo mobile nativo
- [ ] Dark mode
- [ ] Configurações personalizadas
- [ ] Notificações de treino
- [ ] Compartilhamento de dados

## 🐛 Resolução de Problemas

### Dados não salvam
- Verifique se localStorage está habilitado
- Limpe o cache do navegador
- Tente em outro navegador

### Gráfico não aparece
- Recarregue a página
- Tente em outro navegador
- Verifique o console (F12)

### Problema de performance
- Limpe dados antigos
- Feche abas desnecessárias
- Use navegador mais recente

## 📄 Licença

Livre para uso pessoal e comercial.

## 👨‍💻 Desenvolvedor

Desenvolvido com ❤️ para gerenciar treinos de academia.

### Versões
- **v1.0 (Python)** - Sistema em terminal
- **v1.0 (Web)** - Sistema web (você está aqui!)

## 📞 Suporte

Dúvidas sobre a versão web? Consulte:
1. Este README
2. Código em `app.js` (bem comentado)
3. DevTools do navegador (F12)

---

**Versão Web 1.0 | Desenvolvida em Maio de 2026**

Sistema de Controle de Treinos de Academia - Sua solução web para gerenciar treinos! 🏋️💪
