# ❓ Perguntas Frequentes (FAQ)

## 📋 Índice

- [Geral](#geral)
- [Instalação e Configuração](#instalação-e-configuração)
- [Desenvolvimento](#desenvolvimento)
- [Problemas Comuns](#problemas-comuns)
- [Performance](#performance)
- [Segurança](#segurança)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## 🌟 Geral

### P: O que é este Workshop Playbook Template?
**R**: É um template reutilizável e estruturado para criar workshops e playbooks técnicos. Fornece uma base sólida com documentação organizada, scripts de automação e exemplos práticos que podem ser adaptados para diferentes temas e tecnologias.

### P: Para quem é destinado este template?
**R**: Este template é ideal para:
- Instrutores e educadores técnicos
- Desenvolvedores que criam conteúdo educacional
- Equipes que precisam padronizar treinamentos
- Consultores que oferecem workshops
- Empresas que fazem onboarding técnico

### P: Posso usar este template comercialmente?
**R**: Sim! O template está sob licença MIT, permitindo uso comercial. Você pode:
- Usar em workshops pagos
- Adaptar para treinamentos corporativos
- Criar cursos baseados no template
- Distribuir versões modificadas

### P: Quais tecnologias são suportadas?
**R**: O template é agnóstico de tecnologia, mas inclui exemplos para:
- JavaScript/Node.js
- Python
- Docker
- APIs REST
- Bancos de dados
- Ferramentas de CI/CD

## 🔧 Instalação e Configuração

### P: Quais são os pré-requisitos mínimos?
**R**: Os requisitos básicos são:
- **Node.js**: versão 16+ (para scripts de automação)
- **Git**: para controle de versão
- **Editor de texto**: VS Code recomendado
- **Sistema operacional**: Windows, macOS ou Linux

### P: Como faço o setup inicial?
**R**: Siga estes passos:
```bash
# 1. Clone o template
git clone https://github.com/seu-usuario/workshop-playbook-template.git
cd workshop-playbook-template

# 2. Execute o setup
./resources/01-setup.sh

# 3. Configure as variáveis de ambiente
cp resources/.env.template .env
# Edite o .env com suas configurações

# 4. Teste a configuração
./resources/02-test-connections.sh
```

### P: O script de setup não funciona no Windows
**R**: Para Windows, você tem algumas opções:

**Opção 1 - Usar Git Bash:**
```bash
# Instale o Git for Windows que inclui o Git Bash
# Execute os scripts no Git Bash
```

**Opção 2 - Usar WSL:**
```bash
# Instale o Windows Subsystem for Linux
wsl --install
# Execute os scripts no WSL
```

**Opção 3 - Executar manualmente:**
```bash
# Instale dependências manualmente
npm install

# Copie arquivos de template
copy resources\.env.template .env
```

### P: Como personalizar o template para meu uso?
**R**: Para personalizar:

1. **README.md**: Atualize com seu conteúdo
2. **docs/**: Modifique os módulos do workshop
3. **resources/**: Adapte scripts e templates
4. **package.json**: Ajuste dependências
5. **.env.template**: Configure variáveis necessárias

## 💻 Desenvolvimento

### P: Como adicionar um novo módulo ao workshop?
**R**: Para adicionar um módulo:

1. **Crie o arquivo de documentação:**
```bash
# Crie docs/workshop-parte-XX.md
cp docs/workshop-parte-02.md docs/workshop-parte-05.md
```

2. **Atualize a estrutura:**
```markdown
# No README.md
### 5️⃣ [Novo Módulo](docs/workshop-parte-05.md)
- Objetivos do módulo
- Conceitos abordados
```

3. **Adicione exemplos práticos:**
```bash
# Crie diretório de exemplos
mkdir examples/modulo-05
```

### P: Como criar scripts de automação personalizados?
**R**: Crie scripts seguindo o padrão:

```bash
#!/bin/bash
# resources/04-custom-script.sh

# Use as funções de logging existentes
source resources/common-functions.sh

log_info "Executando script personalizado..."

# Sua lógica aqui
if comando_personalizado; then
    log_success "Script executado com sucesso"
else
    log_error "Erro na execução"
    exit 1
fi
```

### P: Como integrar com diferentes tecnologias?
**R**: O template é flexível:

**Para Python:**
```python
# Adicione requirements.txt
# Configure scripts Python nos resources/
# Atualize .env.template com variáveis Python
```

**Para Docker:**
```dockerfile
# Adicione Dockerfile e docker-compose.yml
# Configure scripts Docker nos resources/
# Documente comandos Docker no README
```

**Para APIs:**
```javascript
// Configure exemplos de API nos src/
// Adicione testes de API nos tests/
// Configure variáveis de API no .env.template
```

## 🐛 Problemas Comuns

### P: "Permission denied" ao executar scripts
**R**: Torne os scripts executáveis:
```bash
chmod +x resources/*.sh
# ou
find resources -name "*.sh" -exec chmod +x {} \;
```

### P: "Command not found" para npm/node
**R**: Instale o Node.js:

**Ubuntu/Debian:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**macOS:**
```bash
# Usando Homebrew
brew install node

# Ou baixe do site oficial
# https://nodejs.org/
```

**Windows:**
```bash
# Baixe e instale do site oficial
# https://nodejs.org/

# Ou use Chocolatey
choco install nodejs
```

### P: Dependências não instalam corretamente
**R**: Tente estes passos:

```bash
# 1. Limpe o cache
npm cache clean --force

# 2. Remova node_modules
rm -rf node_modules package-lock.json

# 3. Reinstale
npm install

# 4. Se ainda falhar, use yarn
npm install -g yarn
yarn install
```

### P: Scripts falham com "file not found"
**R**: Verifique:

1. **Se o arquivo existe:**
```bash
ls -la resources/
```

2. **Se tem permissão de execução:**
```bash
chmod +x resources/01-setup.sh
```

3. **Se está no diretório correto:**
```bash
pwd  # Deve mostrar o diretório do projeto
```

## ⚡ Performance

### P: O setup está muito lento
**R**: Para otimizar:

```bash
# Use npm ci em vez de npm install (mais rápido)
npm ci

# Configure registry local se disponível
npm config set registry http://seu-registry-local

# Use cache do npm
npm config set cache /caminho/para/cache
```

### P: Como reduzir o tamanho do projeto?
**R**: Use o script de limpeza:

```bash
# Limpeza rápida
./resources/03-cleanup.sh --quick

# Limpeza completa
./resources/03-cleanup.sh --full

# Limpeza personalizada
./resources/03-cleanup.sh --cache  # Só cache
./resources/03-cleanup.sh --logs   # Só logs
```

## 🔒 Segurança

### P: Como proteger credenciais sensíveis?
**R**: Siga estas práticas:

1. **Nunca commite o .env:**
```bash
# Já está no .gitignore, mas verifique
echo ".env" >> .gitignore
```

2. **Use variáveis de ambiente:**
```javascript
// Em vez de hardcode
const apiKey = process.env.API_KEY;

// Use validação
if (!apiKey) {
  throw new Error('API_KEY é obrigatória');
}
```

3. **Configure secrets no CI/CD:**
```yaml
# GitHub Actions
env:
  API_KEY: ${{ secrets.API_KEY }}
```

### P: Como validar entrada de usuários?
**R**: Implemente validação:

```javascript
// Usando Joi
const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(0).max(120)
});

const { error, value } = schema.validate(userData);
if (error) {
  throw new Error(`Dados inválidos: ${error.message}`);
}
```

## 🚀 Deployment

### P: Como fazer deploy do workshop?
**R**: Várias opções:

**GitHub Pages (documentação):**
```bash
# Configure GitHub Pages no repositório
# Documente no docs/
# Configure workflow GitHub Actions se necessário
```

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm ci --only=production
EXPOSE 3000
CMD ["npm", "start"]
```

**Heroku:**
```bash
# Configure Procfile
echo "web: npm start" > Procfile

# Deploy
heroku create meu-workshop
git push heroku main
```

### P: Como configurar domínio personalizado?
**R**: Depende da plataforma:

**GitHub Pages:**
```bash
# Adicione arquivo CNAME
echo "meuworkshop.com" > docs/CNAME
```

**Netlify:**
```bash
# Configure _redirects e netlify.toml
# Configure DNS para apontar para Netlify
```

## 🔧 Troubleshooting

### P: Como debugar problemas?
**R**: Use estas ferramentas:

1. **Logs detalhados:**
```bash
# Execute com debug
DEBUG=* npm start

# Ou configure log level
LOG_LEVEL=debug npm start
```

2. **Teste cada componente:**
```bash
# Teste conexões
./resources/02-test-connections.sh

# Verifique setup
npm run verify-setup
```

3. **Verifique recursos do sistema:**
```bash
# Memória e CPU
top
htop

# Espaço em disco
df -h

# Processos
ps aux | grep node
```

### P: Onde encontrar logs de erro?
**R**: Locais comuns:

```bash
# Logs da aplicação
tail -f logs/app.log

# Logs do sistema (Linux)
tail -f /var/log/syslog

# Logs do Docker
docker logs container-name

# Logs do PM2 (se usando)
pm2 logs
```

### P: Como reportar bugs?
**R**: Ao reportar bugs, inclua:

1. **Informações do sistema:**
```bash
node --version
npm --version
uname -a  # Linux/macOS
ver       # Windows
```

2. **Passos para reproduzir**
3. **Logs de erro completos**
4. **Configuração (sem credenciais)**

**Template de bug report:**
```markdown
## Bug Description
[Descrição clara do problema]

## Steps to Reproduce
1. [Passo 1]
2. [Passo 2]
3. [Veja o erro]

## Expected Behavior
[O que deveria acontecer]

## Actual Behavior
[O que está acontecendo]

## Environment
- OS: [Sistema operacional]
- Node.js: [versão]
- npm: [versão]
- Template version: [versão]

## Error Logs
[Cole os logs aqui]
```

### P: Como contribuir com melhorias?
**R**: Consulte o [Guia de Contribuição](CONTRIBUTING.md):

1. Fork o repositório
2. Crie uma branch para sua feature
3. Faça suas alterações
4. Teste localmente
5. Envie um Pull Request

### P: Onde obter suporte adicional?
**R**: Canais de suporte:

- **GitHub Issues**: Para bugs e feature requests
- **Discussions**: Para perguntas gerais
- **Email**: Para suporte direto
- **Documentação**: Para referência detalhada

---

## 💡 Dicas Extras

### Otimização de Workflow
- Use aliases para comandos frequentes
- Configure shortcuts no seu editor
- Automatize tarefas repetitivas
- Mantenha documentação atualizada

### Melhores Práticas
- Teste sempre antes de commits
- Use branches para features
- Documente mudanças importantes
- Mantenha dependências atualizadas

**Não encontrou sua resposta?** [Abra uma issue](https://github.com/seu-usuario/workshop-playbook-template/issues/new) ou consulte a [documentação completa](README.md).
