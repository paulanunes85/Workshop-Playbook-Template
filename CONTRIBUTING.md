# 🤝 Guia de Contribuição

Obrigado por seu interesse em contribuir para o Workshop Playbook Template! Este documento fornece diretrizes para contribuições.

## 📋 Índice

- [Como Contribuir](#como-contribuir)
- [Tipos de Contribuição](#tipos-de-contribuição)
- [Processo de Contribuição](#processo-de-contribuição)
- [Padrões de Código](#padrões-de-código)
- [Reportando Bugs](#reportando-bugs)
- [Sugerindo Melhorias](#sugerindo-melhorias)
- [Código de Conduta](#código-de-conduta)

## 🚀 Como Contribuir

Existem várias maneiras de contribuir para este projeto:

### 🐛 Reportando Bugs
- Use o template de issue para bugs
- Inclua informações detalhadas sobre o ambiente
- Forneça passos para reproduzir o problema
- Adicione screenshots quando relevante

### 💡 Sugerindo Melhorias
- Use o template de issue para feature requests
- Explique o problema que a sugestão resolve
- Descreva a solução proposta em detalhes
- Considere soluções alternativas

### 📝 Melhorando Documentação
- Correções de typos e gramática
- Esclarecimentos em instruções
- Adição de exemplos práticos
- Tradução para outros idiomas

### 💻 Contribuindo com Código
- Correção de bugs
- Implementação de novas funcionalidades
- Otimização de performance
- Melhoria de testes

## 🔄 Processo de Contribuição

### 1. Fork e Clone

```bash
# Fork o repositório no GitHub
# Clone seu fork
git clone https://github.com/seu-usuario/workshop-playbook-template.git
cd workshop-playbook-template

# Adicione o repositório original como upstream
git remote add upstream https://github.com/usuario-original/workshop-playbook-template.git
```

### 2. Criar Branch

```bash
# Crie uma branch para sua contribuição
git checkout -b feature/nome-da-funcionalidade
# ou
git checkout -b fix/nome-do-bug
# ou
git checkout -b docs/nome-da-melhoria
```

### 3. Fazer Alterações

```bash
# Faça suas alterações
# Teste localmente
npm test
npm run lint

# Commit suas alterações
git add .
git commit -m "tipo: descrição concisa da alteração"
```

### 4. Sincronizar com Upstream

```bash
# Mantenha sua branch atualizada
git fetch upstream
git rebase upstream/main
```

### 5. Push e Pull Request

```bash
# Push para seu fork
git push origin nome-da-sua-branch

# Crie um Pull Request no GitHub
```

## 📏 Padrões de Código

### Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
tipo(escopo): descrição

[corpo opcional]

[rodapé opcional]
```

**Tipos:**
- `feat`: nova funcionalidade
- `fix`: correção de bug
- `docs`: alterações na documentação
- `style`: formatação, ponto e vírgula faltando, etc
- `refactor`: refatoração de código
- `test`: adição ou correção de testes
- `chore`: tarefas de manutenção

**Exemplos:**
```
feat(workshop): adicionar módulo de autenticação
fix(setup): corrigir script de instalação no Windows
docs(readme): atualizar instruções de instalação
```

### Código JavaScript

```javascript
// Use nomes descritivos
const userAuthentication = new AuthService();

// Prefira const/let sobre var
const apiKey = process.env.API_KEY;
let userCount = 0;

// Use async/await para operações assíncronas
async function fetchUserData(userId) {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    throw error;
  }
}

// Documente funções complexas
/**
 * Processa dados do usuário e retorna informações formatadas
 * @param {Object} userData - Dados brutos do usuário
 * @param {string} userData.id - ID único do usuário
 * @param {string} userData.name - Nome do usuário
 * @returns {Object} Dados formatados do usuário
 */
function processUserData(userData) {
  return {
    id: userData.id,
    displayName: userData.name.trim(),
    isActive: Boolean(userData.lastLogin)
  };
}
```

### Documentação

```markdown
# Use títulos hierárquicos

## Seção Principal

### Subseção

- Use listas para enumerar itens
- Seja conciso mas informativo
- Inclua exemplos de código quando relevante

```bash
# Comandos devem ser testáveis
npm install
npm test
```

**Destaque informações importantes**

> Use blocos de citação para notas importantes

⚠️ **Aviso:** Use emojis com moderação
```

### Estrutura de Arquivos

```
workshop-playbook-template/
├── docs/                    # Documentação
│   ├── workshop-parte-*.md  # Módulos do workshop
│   └── guia-*.md           # Guias específicos
├── resources/              # Recursos e templates
│   ├── scripts/            # Scripts de automação
│   └── templates/          # Templates reutilizáveis
├── src/                    # Código fonte (se aplicável)
├── tests/                  # Testes
└── examples/               # Exemplos práticos
```

## 🐛 Reportando Bugs

Antes de reportar um bug:

1. **Verifique se já existe:** Procure nas issues existentes
2. **Reproduza o problema:** Confirme que o bug é reproduzível
3. **Colete informações:** Sistema operacional, versões, logs

### Template de Bug Report

```markdown
## Descrição do Bug
[Descrição clara e concisa do bug]

## Passos para Reproduzir
1. [Primeiro passo]
2. [Segundo passo]
3. [Veja o erro]

## Comportamento Esperado
[O que deveria acontecer]

## Comportamento Atual
[O que está acontecendo]

## Ambiente
- OS: [Windows/macOS/Linux]
- Node.js: [versão]
- npm: [versão]
- Versão do Template: [versão]

## Logs/Screenshots
[Inclua logs de erro e/ou screenshots]

## Informações Adicionais
[Qualquer informação adicional relevante]
```

## 💡 Sugerindo Melhorias

### Template de Feature Request

```markdown
## Problema
[Descrição do problema que a funcionalidade resolveria]

## Solução Proposta
[Descrição detalhada da solução]

## Alternativas Consideradas
[Outras soluções que você considerou]

## Informações Adicionais
[Contexto adicional, screenshots, etc.]
```

## 🧪 Testes

### Executando Testes

```bash
# Executar todos os testes
npm test

# Executar testes com cobertura
npm run test:coverage

# Executar testes em modo watch
npm run test:watch

# Executar linting
npm run lint
```

### Escrevendo Testes

```javascript
// tests/exemplo.test.js
const { processUserData } = require('../src/utils');

describe('processUserData', () => {
  test('deve formatar dados do usuário corretamente', () => {
    const userData = {
      id: '123',
      name: '  João Silva  ',
      lastLogin: '2023-01-01'
    };
    
    const result = processUserData(userData);
    
    expect(result).toEqual({
      id: '123',
      displayName: 'João Silva',
      isActive: true
    });
  });
  
  test('deve lidar com usuários inativos', () => {
    const userData = {
      id: '456',
      name: 'Maria Santos',
      lastLogin: null
    };
    
    const result = processUserData(userData);
    
    expect(result.isActive).toBe(false);
  });
});
```

## 📚 Documentação

### Atualizando Documentação

- Mantenha o README.md atualizado
- Documente novas funcionalidades
- Atualize exemplos quando necessário
- Verifique links quebrados

### Estilo de Escrita

- Use linguagem clara e direta
- Evite jargões desnecessários
- Inclua exemplos práticos
- Use formatação consistente
- Mantenha instruções atualizadas

## 🔍 Review Process

### Critérios para Aprovação

- [ ] Código segue os padrões estabelecidos
- [ ] Testes passam
- [ ] Documentação está atualizada
- [ ] Não há conflitos de merge
- [ ] PR tem descrição clara
- [ ] Mudanças são testadas localmente

### O que Esperamos

1. **Qualidade:** Código limpo e bem testado
2. **Documentação:** Mudanças documentadas apropriadamente
3. **Compatibilidade:** Não quebra funcionalidades existentes
4. **Performance:** Considera impacto na performance
5. **Segurança:** Segue melhores práticas de segurança

## 🎯 Código de Conduta

### Nossa Promessa

Nós, como membros, contribuidores e líderes, prometemos fazer da participação em nossa comunidade uma experiência livre de assédio para todos.

### Nossos Padrões

**Exemplos de comportamento que contribuem para um ambiente positivo:**

- Usar linguagem acolhedora e inclusiva
- Respeitar diferentes pontos de vista e experiências
- Aceitar críticas construtivas graciosamente
- Focar no que é melhor para a comunidade
- Mostrar empatia com outros membros da comunidade

**Exemplos de comportamento inaceitável:**

- Uso de linguagem ou imagens sexualizadas
- Trolling, comentários insultuosos/depreciativos
- Assédio público ou privado
- Publicar informações privadas de outros sem permissão
- Outras condutas consideradas inapropriadas em ambiente profissional

### Aplicação

Instâncias de comportamento abusivo, de assédio ou de outra forma inaceitável podem ser reportadas para [email-do-mantenedor].

## 🏆 Reconhecimento

Contribuições são reconhecidas de várias formas:

- **Contributors:** Listados no README.md
- **Changelog:** Mencionados nas notas de release
- **Issues:** Crédito na resolução de problemas
- **Documentação:** Reconhecimento em melhorias

## 📞 Dúvidas?

Se você tem dúvidas sobre como contribuir:

1. Abra uma [issue de discussão](link-para-discussions)
2. Entre em contato via [email](mailto:seu-email@exemplo.com)
3. Consulte a [documentação](link-para-docs)

---

**Obrigado por contribuir! 🚀**

Sua contribuição, por menor que seja, é valiosa para a comunidade.