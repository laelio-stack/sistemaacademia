# 🚀 Guia Rápido - Sistema Web

## ⚡ COMECE EM 5 MINUTOS

### 1️⃣ Abra o Sistema
Clique duas vezes em `index.html` ou arraste para o navegador.

### 2️⃣ Cadastre um Aluno
- Clique em **👥 Alunos**
- Digite o nome
- Clique em **Cadastrar Aluno**

### 3️⃣ Registre um Treino
- Clique em **💪 Treinos**
- Selecione o aluno
- Escolha o tipo (A, B, C...)
- Adicione exercícios
- Clique em **Salvar Treino**

### 4️⃣ Veja a Evolução
- Clique em **📈 Evolução**
- Selecione aluno e exercício
- Veja o gráfico e análise

### 5️⃣ Gere um Relatório
- Clique em **📋 Relatórios**
- Selecione o aluno
- Veja o resumo completo

---

## 📖 SEÇÕES DO SISTEMA

### 📊 Dashboard
**O que vê?**
- Total de alunos, treinos, exercícios
- Lista de alunos ativos
- Últimos treinos registrados

### 👥 Alunos
**O que faz?**
- Cadastra novo aluno
- Busca por nome ou matrícula
- Lista todos os alunos
- Deleta alunos (com confirmação)

**Dicas:**
- Use matrícula para busca rápida
- Matrícula é gerada automaticamente
- Deleção é irreversível!

### 💪 Treinos
**O que faz?**
- Registra novo treino
- Seleciona o aluno
- Adiciona múltiplos exercícios
- Data/hora automática

**Como usar:**
1. Selecione um aluno
2. Digite tipo (A/B/C/etc)
3. Preencha exercício
4. Clique "➕ Adicionar"
5. Repita para cada exercício
6. Clique "💾 Salvar Treino"

### 📈 Evolução
**O que faz?**
- Mostra histórico do exercício
- Calcula automaticamente progresso
- Desenha gráfico de tendência
- Analisa em tempo real

**Como interpretar:**
- **Primeira Carga**: Seu início
- **Última Carga**: Seu current
- **Evolução**: Quanto aumentou (%)
- **Gráfico**: Visualização da tendência

### 📋 Relatórios
**O que faz?**
- Resumo completo do aluno
- Cargas máximas por exercício
- Distribuição de treinos
- Exporta em CSV

**Como exportar:**
- Clique "📥 Exportar Relatório"
- Arquivo CSV será baixado
- Abra em Excel ou Google Sheets

---

## 💾 DADOS E BACKUP

### Onde são salvos?
- localStorage do navegador
- Automático após cada ação
- Local no seu computador

### Como fazer backup?
**Opção 1 - Manual:**
1. Abra DevTools (F12)
2. Application → LocalStorage
3. Copie a chave "sistema-academia"

**Opção 2 - Automático:**
1. Exporte todos os relatórios em CSV
2. Salve em pasta segura

### Como restaurar?
1. Cole o valor em LocalStorage
2. Recarregue a página
3. Dados aparecem novamente

### Como limpar tudo?
1. Clique em "Limpar Dados" (navbar)
2. Confirme
3. Todos os dados serão deletados

---

## 🎯 DICAS E TRUQUES

### Organização
✅ Use nomes consistentes para exercícios  
✅ Use tipos (A/B/C) para diferentes grupos  
✅ Registre treinos logo após terminar  
✅ Revise periodicamente seus dados  

### Performance
✅ Use navegador atualizado  
✅ Limpe cache periodicamente  
✅ Feche abas desnecessárias  
✅ Exporte e limpe dados antigos  

### Segurança
✅ Navegador privado para privacidade  
✅ Faça backups regularmente  
✅ Não compartilhe localStorage  
✅ Use "Limpar Dados" antes de devolver PC  

---

## ❓ DÚVIDAS FREQUENTES

**P: Posso usar em outro computador?**
R: Sim! Exporte os dados em CSV e importe em outro navegador.

**P: Meus dados serão perdidos?**
R: Não! Estão salvos no navegador. Apenas se limpar cache/dados.

**P: Posso compartilhar com outras pessoas?**
R: Sim! Exporte o relatório em CSV e compartilhe.

**P: Funciona offline?**
R: Sim! Tudo é local, não precisa de internet.

**P: Qual é o limite de alunos?**
R: Ilimitado! Seu navegador suporta muitos megabytes.

**P: Como mudo o design?**
R: Edite o arquivo `style.css` com suas cores.

**P: Posso adicionar mais campos?**
R: Sim! Edite as classes em `app.js`.

---

## ⌨️ ATALHOS

| Ação | Como |
|------|------|
| Sair da modal | Esc ou clique X |
| Voltar | Clique no menu |
| Buscar aluno | Ctrl+F enquanto em Alunos |
| Exportar | Clique no botão |
| Limpar dados | Botão na navbar |

---

## 🐛 PROBLEMAS COMUNS

**Problema: Não consigo adicionar exercício**
- Preencha todos os campos (nome, peso, séries)
- Clique no botão "➕ Adicionar"
- Não clique Enter, use o botão!

**Problema: Gráfico não aparece**
- Registre mais de um treino
- O gráfico precisa de histórico

**Problema: Dados desapareceram**
- Navegador limpou o cache
- Tente restaurar do backup

**Problema: Relatório vazio**
- Certifique-se que tem treinos registrados
- Exporte após registrar

**Problema: Evolução não calcula**
- Registre o mesmo exercício em treinos diferentes
- Evolução precisa de histórico

---

## 🎨 PERSONALIZAÇÕES

### Mudar Cores
Edite `style.css`:
```css
:root {
    --primary: #4f46e5;      /* Roxo principal */
    --secondary: #8b5cf6;    /* Roxo secundário */
    --success: #10b981;      /* Verde sucesso */
    --danger: #ef4444;       /* Vermelho perigo */
}
```

### Mudar Tema
Procure por `.navbar`, `.card`, `.btn` e customize cores, fontes, tamanhos.

### Adicionar Novos Campos
1. Edite a classe `Aluno` em `app.js`
2. Atualize os formulários em `index.html`
3. Atualize o armazenamento em `salvarDados()`

---

## 📱 NO CELULAR

O sistema é responsivo! Funciona em:
- iPhone/iPad
- Android
- Tablets
- Qualquer tamanho de tela

**Dica:** Use em modo tela cheia para melhor experiência.

---

## 🚀 PRÓXIMOS PASSOS

1. ✅ Cadastre seus alunos
2. ✅ Registre seus treinos
3. ✅ Acompanhe a evolução
4. ✅ Gere relatórios
5. ✅ Compartilhe resultados

---

## 💡 DICA FINAL

Comece pequeno! Cadastre 2-3 alunos e vários treinos. Depois expanda. O sistema é simples mas poderoso!

**Bom uso! 🏋️💪**

---

Versão Web 1.0 | Maio 2026
