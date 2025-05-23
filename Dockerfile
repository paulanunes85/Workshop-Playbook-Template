# Use Node.js 18 Alpine como base
FROM node:18-alpine

# Definir informações do mantenedor
LABEL maintainer="Workshop Template <workshop@exemplo.com>"
LABEL description="Template reutilizável para workshops e playbooks técnicos"
LABEL version="1.0.0"

# Instalar dependências do sistema
RUN apk add --no-cache \
    git \
    bash \
    curl \
    && rm -rf /var/cache/apk/*

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && \
    adduser -S workshop -u 1001 -G nodejs

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências primeiro (para cache)
COPY package*.json ./
COPY resources/package.json ./resources/

# Instalar dependências como root
RUN npm ci --only=production && \
    npm cache clean --force

# Copiar código fonte
COPY . .

# Definir permissões corretas
RUN chown -R workshop:nodejs /app && \
    chmod +x resources/*.sh

# Mudar para usuário não-root
USER workshop

# Criar diretórios necessários
RUN mkdir -p logs && \
    mkdir -p data

# Expor porta da aplicação
EXPOSE 3000

# Definir variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3000
ENV LOG_LEVEL=info

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# Comando padrão
CMD ["npm", "start"]

# Labels adicionais para metadados
LABEL org.opencontainers.image.title="Workshop Playbook Template"
LABEL org.opencontainers.image.description="Template estruturado para criação de workshops técnicos"
LABEL org.opencontainers.image.version="1.0.0"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.source="https://github.com/seu-usuario/workshop-playbook-template"
