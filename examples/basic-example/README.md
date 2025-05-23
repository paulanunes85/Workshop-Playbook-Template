# 📖 Exemplo Básico

Este exemplo demonstra como usar o template para criar um workshop simples sobre uma tecnologia específica.

## 🎯 Objetivo

Mostrar como:
- Configurar o template para um tópico específico
- Criar módulos de aprendizagem
- Estruturar exercícios práticos
- Configurar recursos necessários

## 📁 Estrutura do Exemplo

```
basic-example/
├── README.md                 # Este arquivo
├── workshop-config.json      # Configuração do workshop
├── modules/                  # Módulos do workshop
│   ├── 01-introducao.md     # Módulo 1
│   ├── 02-conceitos.md      # Módulo 2
│   └── 03-pratica.md        # Módulo 3
├── exercises/               # Exercícios práticos
│   ├── exercise-01/         # Exercício 1
│   └── exercise-02/         # Exercício 2
└── resources/               # Recursos específicos
    ├── slides.pdf           # Slides (exemplo)
    ├── cheat-sheet.md       # Folha de referência
    └── setup-guide.md       # Guia de setup específico
```

## 🚀 Como Usar Este Exemplo

### 1. Copiar a Estrutura

```bash
# Copie este exemplo para um novo diretório
cp -r examples/basic-example my-workshop
cd my-workshop
```

### 2. Personalizar o Conteúdo

1. **Atualize `workshop-config.json`**:
   ```json
   {
     "title": "Meu Workshop Incrível",
     "description": "Aprenda tecnologia X de forma prática",
     "duration": "4 horas",
     "target_audience": "Desenvolvedores iniciantes",
     "prerequisites": ["Conhecimento básico de programação"]
   }
   ```

2. **Modifique os módulos** em `modules/`
3. **Adapte os exercícios** em `exercises/`
4. **Atualize recursos** em `resources/`

### 3. Integrar com o Template Principal

```bash
# Volte para o diretório principal
cd ..

# Atualize o README principal
# Adicione referência ao seu workshop
```

## 📚 Conteúdo do Exemplo

### Módulo 1: Introdução
- Visão geral da tecnologia
- Por que é importante
- Casos de uso comuns

### Módulo 2: Conceitos Fundamentais
- Conceitos básicos
- Terminologia essencial
- Arquitetura geral

### Módulo 3: Prática
- Configuração do ambiente
- Primeiro exemplo
- Exercícios guiados

## 🏃‍♂️ Exercícios Práticos

### Exercício 1: Hello World
- **Objetivo**: Primeiro contato com a tecnologia
- **Duração**: 15 minutos
- **Arquivo**: `exercises/exercise-01/`

### Exercício 2: Projeto Básico
- **Objetivo**: Criar um projeto simples
- **Duração**: 30 minutos
- **Arquivo**: `exercises/exercise-02/`

## 🛠️ Recursos Incluídos

- **Slides**: Apresentação visual do conteúdo
- **Cheat Sheet**: Referência rápida de comandos
- **Setup Guide**: Instruções detalhadas de configuração

## 💡 Dicas de Personalização

### Para Diferentes Tecnologias

**JavaScript/Node.js**:
```bash
# Adicione package.json específico
# Configure scripts de exemplo
# Inclua dependências necessárias
```

**Python**:
```bash
# Adicione requirements.txt
# Configure ambiente virtual
# Inclua notebooks Jupyter se aplicável
```

**Docker**:
```bash
# Adicione Dockerfile de exemplo
# Configure docker-compose.yml
# Inclua scripts de build e deploy
```

### Para Diferentes Audiências

**Iniciantes**:
- Mais explicações conceituais
- Passos mais detalhados
- Exemplos mais simples

**Intermediários**:
- Foco em melhores práticas
- Exercícios mais desafiadores
- Cenários do mundo real

**Avançados**:
- Tópicos especializados
- Otimizações e performance
- Integração com outras tecnologias

## 📝 Template de Módulo

Use este template para criar novos módulos:

```markdown
# 📖 Módulo X: [Nome do Módulo]

## 🎯 Objetivos
- Objetivo 1
- Objetivo 2
- Objetivo 3

## ⏱️ Duração: XX minutos

## 📋 Pré-requisitos
- Pré-requisito 1
- Pré-requisito 2

## 📖 Conteúdo

### Conceito 1
[Explicação do conceito]

### Conceito 2
[Explicação do conceito]

## 🏃‍♂️ Exercício Prático
[Instruções do exercício]

## ✅ Checklist de Conclusão
- [ ] Item 1
- [ ] Item 2
- [ ] Item 3

## 🔗 Próximos Passos
- Módulo seguinte
- Recursos adicionais
```

## 🔄 Ciclo de Desenvolvimento

1. **Planejamento**: Defina objetivos e audiência
2. **Estruturação**: Organize módulos e exercícios
3. **Desenvolvimento**: Crie conteúdo e exemplos
4. **Teste**: Valide com usuários reais
5. **Refinamento**: Ajuste baseado no feedback
6. **Distribuição**: Publique e promova

## 📊 Métricas de Sucesso

- Taxa de conclusão dos módulos
- Tempo médio por exercício
- Feedback dos participantes
- Número de dúvidas/problemas

## 🤝 Contribuições

Para melhorar este exemplo:
1. Adicione mais exercícios práticos
2. Inclua casos de uso diversos
3. Melhore a documentação
4. Adicione recursos visuais

## 📞 Suporte

Para dúvidas sobre este exemplo:
- Consulte a [documentação principal](../../README.md)
- Abra uma [issue](../../issues)
- Entre em contato via [email](mailto:suporte@exemplo.com)
