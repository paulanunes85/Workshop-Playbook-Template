# 🚀 Guia de Deployment

Este guia fornece instruções detalhadas para fazer deploy do workshop em diferentes ambientes e plataformas.

## 📋 Índice

- [Preparação](#preparação)
- [Docker](#docker)
- [Heroku](#heroku)
- [AWS](#aws)
- [Azure](#azure)
- [Netlify/Vercel](#netlifyvercel)
- [GitHub Pages](#github-pages)
- [Servidor VPS](#servidor-vps)
- [Monitoramento](#monitoramento)

## 🛠️ Preparação

### Pré-requisitos
- [ ] Código testado e funcionando localmente
- [ ] Variáveis de ambiente configuradas
- [ ] Build de produção testado
- [ ] Banco de dados configurado (se aplicável)
- [ ] Domínio registrado (opcional)

### Checklist de Segurança
- [ ] Senhas e chaves de API seguras
- [ ] HTTPS configurado
- [ ] Variáveis de ambiente protegidas
- [ ] Logs não expõem informações sensíveis
- [ ] Rate limiting implementado

## 🐳 Docker

### Build da Imagem

```bash
# Build simples
docker build -t workshop-template .

# Build com tag específica
docker build -t workshop-template:1.0.0 .

# Build multi-stage para produção
docker build --target production -t workshop-template:prod .
```

### Executar Container

```bash
# Executar localmente
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  workshop-template

# Com arquivo de environment
docker run -p 3000:3000 \
  --env-file .env.production \
  workshop-template

# Com volumes persistentes
docker run -p 3000:3000 \
  -v $(pwd)/logs:/app/logs \
  -v $(pwd)/data:/app/data \
  workshop-template
```

### Docker Compose

```bash
# Desenvolvimento
docker-compose up

# Produção
docker-compose --profile production up -d

# Com monitoramento
docker-compose --profile monitoring up -d

# Rebuild e restart
docker-compose up --build --force-recreate
```

### Registry e Push

```bash
# Tag para registry
docker tag workshop-template:latest your-registry.com/workshop-template:latest

# Push para registry
docker push your-registry.com/workshop-template:latest

# Login no registry (se necessário)
docker login your-registry.com
```

## 🌐 Heroku

### Setup Inicial

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Criar app
heroku create workshop-template-app

# Configurar Git remoto
heroku git:remote -a workshop-template-app
```

### Configuração

```bash
# Definir variáveis de ambiente
heroku config:set NODE_ENV=production
heroku config:set LOG_LEVEL=info
heroku config:set API_KEY=your-api-key

# Ver configurações
heroku config

# Configurar buildpack (se necessário)
heroku buildpacks:set heroku/nodejs
```

### Deploy

```bash
# Deploy via Git
git push heroku main

# Ver logs
heroku logs --tail

# Executar comandos no dyno
heroku run npm run migrate

# Escalar dynos
heroku ps:scale web=1
```

### Procfile

```
# Procfile
web: npm start
worker: npm run worker
release: npm run migrate
```

## ☁️ AWS

### AWS EC2

```bash
# 1. Criar instância EC2
# 2. Conectar via SSH
ssh -i your-key.pem ec2-user@your-instance-ip

# 3. Instalar Node.js
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# 4. Instalar PM2
sudo npm install -g pm2

# 5. Clone e setup
git clone https://github.com/your-repo/workshop-template.git
cd workshop-template
npm install --production

# 6. Configurar environment
cp .env.template .env
# Edite as variáveis necessárias

# 7. Iniciar com PM2
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

### AWS Elastic Beanstalk

```bash
# Instalar EB CLI
pip install awsebcli

# Inicializar
eb init

# Criar ambiente
eb create production

# Deploy
eb deploy

# Ver logs
eb logs

# Configurar variáveis
eb setenv NODE_ENV=production API_KEY=your-key
```

### AWS ECS (Docker)

1. **Criar task definition**
2. **Configurar service**
3. **Setup load balancer**
4. **Deploy via CLI ou Console**

## 🔷 Azure

### Azure App Service

```bash
# Instalar Azure CLI
# https://docs.microsoft.com/en-us/cli/azure/install-azure-cli

# Login
az login

# Criar resource group
az group create --name workshop-rg --location eastus

# Criar app service plan
az appservice plan create \
  --name workshop-plan \
  --resource-group workshop-rg \
  --sku B1 \
  --is-linux

# Criar web app
az webapp create \
  --resource-group workshop-rg \
  --plan workshop-plan \
  --name workshop-template-app \
  --runtime "NODE|18-lts"

# Configurar deployment
az webapp deployment source config \
  --name workshop-template-app \
  --resource-group workshop-rg \
  --repo-url https://github.com/your-repo/workshop-template \
  --branch main \
  --manual-integration

# Configurar variáveis
az webapp config appsettings set \
  --resource-group workshop-rg \
  --name workshop-template-app \
  --settings NODE_ENV=production LOG_LEVEL=info
```

### Azure Container Instances

```bash
# Deploy container
az container create \
  --resource-group workshop-rg \
  --name workshop-container \
  --image your-registry.com/workshop-template:latest \
  --dns-name-label workshop-template \
  --ports 3000 \
  --environment-variables NODE_ENV=production
```

## 🌟 Netlify/Vercel

### Netlify (Sites Estáticos)

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=./docs

# Configurar redirects
# Criar _redirects file
echo "/*    /index.html   200" > docs/_redirects
```

### Vercel

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Configurar variáveis
vercel env add NODE_ENV
```

## 📄 GitHub Pages

### Configuração

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./docs
```

## 🖥️ Servidor VPS

### Setup Completo

```bash
# 1. Atualizar sistema
sudo apt update && sudo apt upgrade -y

# 2. Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Instalar PM2 e Nginx
sudo npm install -g pm2
sudo apt install nginx -y

# 4. Configurar firewall
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable

# 5. Setup aplicação
git clone https://github.com/your-repo/workshop-template.git
cd workshop-template
npm install --production

# 6. Configurar PM2
pm2 start ecosystem.config.js
pm2 startup
pm2 save

# 7. Configurar Nginx
sudo nano /etc/nginx/sites-available/workshop
```

### Configuração Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Servir arquivos estáticos
    location /static {
        alias /var/www/workshop/static;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### SSL com Let's Encrypt

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obter certificado
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renovação
sudo crontab -e
# Adicionar linha:
0 12 * * * /usr/bin/certbot renew --quiet
```

## 📊 Monitoramento

### Health Checks

```bash
# Script de monitoramento
#!/bin/bash
HEALTH_URL="https://your-domain.com/health"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" $HEALTH_URL)

if [ $STATUS -ne 200 ]; then
    echo "Aplicação não está respondendo: $STATUS"
    # Enviar alerta
    curl -X POST -H 'Content-type: application/json' \
        --data '{"text":"Workshop app is down!"}' \
        $SLACK_WEBHOOK_URL
fi
```

### Logs

```bash
# Rotação de logs
sudo nano /etc/logrotate.d/workshop

# Conteúdo:
/var/log/workshop/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 workshop workshop
    postrotate
        pm2 reload ecosystem.config.js
    endscript
}
```

### Métricas

```yaml
# docker-compose.monitoring.yml
version: '3.8'
services:
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
      
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin123
    volumes:
      - grafana_data:/var/lib/grafana
```

## 🔧 Scripts de Deployment

### Script de Deploy Automático

```bash
#!/bin/bash
# deploy.sh

set -e

echo "🚀 Iniciando deployment..."

# Testes
echo "🧪 Executando testes..."
npm test

# Build
echo "🔨 Fazendo build..."
npm run build

# Deploy baseado no ambiente
if [ "$1" = "production" ]; then
    echo "📦 Fazendo deploy para produção..."
    docker build -t workshop-template:prod .
    docker tag workshop-template:prod registry.com/workshop-template:latest
    docker push registry.com/workshop-template:latest
    
    # Atualizar serviço
    kubectl set image deployment/workshop-app app=registry.com/workshop-template:latest
elif [ "$1" = "staging" ]; then
    echo "📦 Fazendo deploy para staging..."
    git push heroku-staging main
else
    echo "❌ Ambiente não especificado. Use: ./deploy.sh [production|staging]"
    exit 1
fi

echo "✅ Deploy concluído!"
```

## 🔍 Troubleshooting

### Problemas Comuns

**Port já em uso:**
```bash
# Encontrar processo
sudo lsof -i :3000
# Matar processo
sudo kill -9 PID
```

**Memória insuficiente:**
```bash
# Aumentar swap (Linux)
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

**Permissões de arquivo:**
```bash
# Corrigir permissões
sudo chown -R $USER:$USER /path/to/app
chmod +x scripts/*.sh
```

## 📋 Checklist Final

- [ ] Aplicação rodando sem erros
- [ ] Health checks funcionando
- [ ] HTTPS configurado
- [ ] Logs funcionando
- [ ] Backup configurado
- [ ] Monitoramento ativo
- [ ] DNS configurado
- [ ] Certificados SSL válidos
- [ ] Performance testada
- [ ] Documentação atualizada

---

**🎉 Parabéns! Seu workshop está no ar!**

Para suporte adicional, consulte:
- [Troubleshooting Guide](guia-troubleshooting.md)
- [FAQ](FAQ.md)
- [Suporte Técnico](mailto:suporte@exemplo.com)
