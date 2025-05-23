#!/usr/bin/env node

/**
 * Script de Verificação de Setup
 * Verifica se o ambiente está configurado corretamente
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
require('dotenv').config();

// Cores para output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Funções de logging
const log = {
  info: (msg) => console.log(`${colors.blue}[INFO]${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}[SUCCESS]${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}[WARNING]${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}[ERROR]${colors.reset} ${msg}`),
  header: (msg) => console.log(`\n${colors.cyan}=== ${msg} ===${colors.reset}`)
};

class SetupVerifier {
  constructor() {
    this.checks = [];
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      total: 0
    };
  }

  addCheck(name, checkFunction, required = true) {
    this.checks.push({ name, checkFunction, required });
  }

  async runAllChecks() {
    log.header('Verificação de Setup');
    
    for (const check of this.checks) {
      await this.runCheck(check);
    }
    
    this.showSummary();
    return this.results.failed === 0;
  }

  async runCheck(check) {
    this.results.total++;
    
    try {
      const result = await check.checkFunction();
      
      if (result.success) {
        log.success(`${check.name}: ${result.message || 'OK'}`);
        this.results.passed++;
      } else {
        if (check.required) {
          log.error(`${check.name}: ${result.message || 'FALHOU'}`);
          this.results.failed++;
        } else {
          log.warning(`${check.name}: ${result.message || 'AVISO'}`);
          this.results.warnings++;
        }
      }
    } catch (error) {
      if (check.required) {
        log.error(`${check.name}: ${error.message}`);
        this.results.failed++;
      } else {
        log.warning(`${check.name}: ${error.message}`);
        this.results.warnings++;
      }
    }
  }

  showSummary() {
    log.header('Resumo da Verificação');
    
    console.log(`Total de verificações: ${this.results.total}`);
    console.log(`${colors.green}Passou: ${this.results.passed}${colors.reset}`);
    console.log(`${colors.red}Falhou: ${this.results.failed}${colors.reset}`);
    console.log(`${colors.yellow}Avisos: ${this.results.warnings}${colors.reset}`);
    
    console.log();
    
    if (this.results.failed === 0) {
      log.success('✅ Todas as verificações obrigatórias passaram!');
      log.info('Seu ambiente está configurado corretamente.');
    } else {
      log.error('❌ Algumas verificações falharam.');
      log.info('Por favor, corrija os problemas acima antes de continuar.');
    }
    
    if (this.results.warnings > 0) {
      log.warning('⚠️  Existem alguns avisos que você pode querer revisar.');
    }
  }
}

// Verificações específicas
const checks = {
  // Verificar arquivos essenciais
  checkEssentialFiles: () => {
    const requiredFiles = [
      'package.json',
      'README.md',
      '.gitignore',
      'resources/.env.template'
    ];
    
    const missingFiles = requiredFiles.filter(file => !fs.existsSync(file));
    
    if (missingFiles.length > 0) {
      return {
        success: false,
        message: `Arquivos faltando: ${missingFiles.join(', ')}`
      };
    }
    
    return {
      success: true,
      message: 'Todos os arquivos essenciais encontrados'
    };
  },

  // Verificar arquivo .env
  checkEnvFile: () => {
    if (!fs.existsSync('.env')) {
      return {
        success: false,
        message: 'Arquivo .env não encontrado. Execute: cp resources/.env.template .env'
      };
    }
    
    const envContent = fs.readFileSync('.env', 'utf8');
    const hasContent = envContent.trim().length > 0;
    
    if (!hasContent) {
      return {
        success: false,
        message: 'Arquivo .env está vazio. Configure suas variáveis de ambiente.'
      };
    }
    
    return {
      success: true,
      message: 'Arquivo .env encontrado e configurado'
    };
  },

  // Verificar Node.js
  checkNodeVersion: () => {
    try {
      const version = process.version;
      const majorVersion = parseInt(version.slice(1).split('.')[0]);
      
      if (majorVersion < 16) {
        return {
          success: false,
          message: `Node.js ${version} encontrado. Versão 16+ requerida.`
        };
      }
      
      return {
        success: true,
        message: `Node.js ${version} OK`
      };
    } catch (error) {
      return {
        success: false,
        message: 'Node.js não encontrado'
      };
    }
  },

  // Verificar npm
  checkNpmVersion: () => {
    try {
      const version = execSync('npm --version', { encoding: 'utf8' }).trim();
      return {
        success: true,
        message: `npm ${version} OK`
      };
    } catch (error) {
      return {
        success: false,
        message: 'npm não encontrado'
      };
    }
  },

  // Verificar dependências do Node.js
  checkNodeDependencies: () => {
    if (!fs.existsSync('node_modules')) {
      return {
        success: false,
        message: 'node_modules não encontrado. Execute: npm install'
      };
    }
    
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const dependencies = Object.keys(packageJson.dependencies || {});
    
    const missingDeps = dependencies.filter(dep => {
      return !fs.existsSync(path.join('node_modules', dep));
    });
    
    if (missingDeps.length > 0) {
      return {
        success: false,
        message: `Dependências faltando: ${missingDeps.join(', ')}`
      };
    }
    
    return {
      success: true,
      message: `${dependencies.length} dependências instaladas`
    };
  },

  // Verificar Git
  checkGit: () => {
    try {
      const version = execSync('git --version', { encoding: 'utf8' }).trim();
      return {
        success: true,
        message: version
      };
    } catch (error) {
      return {
        success: false,
        message: 'Git não encontrado'
      };
    }
  },

  // Verificar estrutura de diretórios
  checkDirectoryStructure: () => {
    const requiredDirs = [
      'docs',
      'resources',
      'src',
      'tests'
    ];
    
    const missingDirs = requiredDirs.filter(dir => !fs.existsSync(dir));
    
    if (missingDirs.length > 0) {
      return {
        success: false,
        message: `Diretórios faltando: ${missingDirs.join(', ')}`
      };
    }
    
    return {
      success: true,
      message: 'Estrutura de diretórios OK'
    };
  },

  // Verificar permissões de scripts
  checkScriptPermissions: () => {
    const scripts = [
      'resources/01-setup.sh',
      'resources/02-test-connections.sh',
      'resources/03-cleanup.sh'
    ];
    
    const nonExecutableScripts = scripts.filter(script => {
      if (!fs.existsSync(script)) return false;
      
      try {
        const stats = fs.statSync(script);
        return !(stats.mode & parseInt('111', 8)); // Verificar se é executável
      } catch {
        return true;
      }
    });
    
    if (nonExecutableScripts.length > 0) {
      return {
        success: false,
        message: `Scripts sem permissão de execução: ${nonExecutableScripts.join(', ')}. Execute: chmod +x resources/*.sh`
      };
    }
    
    return {
      success: true,
      message: 'Permissões de scripts OK'
    };
  },

  // Verificar variáveis de ambiente críticas
  checkEnvironmentVariables: () => {
    const criticalVars = ['NODE_ENV', 'PORT'];
    const optionalVars = ['API_KEY', 'DATABASE_URL'];
    
    const missingCritical = criticalVars.filter(varName => !process.env[varName]);
    const missingOptional = optionalVars.filter(varName => !process.env[varName]);
    
    let message = '';
    let success = true;
    
    if (missingCritical.length > 0) {
      success = false;
      message += `Variáveis críticas faltando: ${missingCritical.join(', ')}. `;
    }
    
    if (missingOptional.length > 0) {
      message += `Variáveis opcionais faltando: ${missingOptional.join(', ')}.`;
    }
    
    if (success && missingOptional.length === 0) {
      message = 'Todas as variáveis de ambiente configuradas';
    } else if (success) {
      message = 'Variáveis críticas configuradas' + (message ? '. ' + message : '');
    }
    
    return { success, message: message.trim() };
  },

  // Verificar Docker (opcional)
  checkDocker: () => {
    try {
      const version = execSync('docker --version', { encoding: 'utf8' }).trim();
      
      try {
        execSync('docker info', { stdio: 'ignore' });
        return {
          success: true,
          message: `${version} - Daemon rodando`
        };
      } catch {
        return {
          success: false,
          message: `${version} - Daemon não está rodando`
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Docker não encontrado (opcional)'
      };
    }
  },

  // Verificar conectividade (básica)
  checkBasicConnectivity: () => {
    return new Promise((resolve) => {
      const https = require('https');
      
      const req = https.request('https://httpbin.org/get', { timeout: 5000 }, (res) => {
        resolve({
          success: true,
          message: 'Conectividade com internet OK'
        });
      });
      
      req.on('error', () => {
        resolve({
          success: false,
          message: 'Sem conectividade com internet'
        });
      });
      
      req.on('timeout', () => {
        resolve({
          success: false,
          message: 'Timeout na verificação de conectividade'
        });
      });
      
      req.end();
    });
  }
};

// Função principal
async function main() {
  const verifier = new SetupVerifier();
  
  // Adicionar verificações (obrigatórias)
  verifier.addCheck('Arquivos Essenciais', checks.checkEssentialFiles, true);
  verifier.addCheck('Arquivo .env', checks.checkEnvFile, true);
  verifier.addCheck('Versão Node.js', checks.checkNodeVersion, true);
  verifier.addCheck('Versão npm', checks.checkNpmVersion, true);
  verifier.addCheck('Dependências Node.js', checks.checkNodeDependencies, true);
  verifier.addCheck('Git', checks.checkGit, true);
  verifier.addCheck('Estrutura de Diretórios', checks.checkDirectoryStructure, true);
  
  // Verificações opcionais
  verifier.addCheck('Permissões de Scripts', checks.checkScriptPermissions, false);
  verifier.addCheck('Variáveis de Ambiente', checks.checkEnvironmentVariables, false);
  verifier.addCheck('Docker', checks.checkDocker, false);
  verifier.addCheck('Conectividade', checks.checkBasicConnectivity, false);
  
  const success = await verifier.runAllChecks();
  
  console.log();
  
  if (success) {
    log.info('🚀 Próximos passos:');
    console.log('1. Execute "npm start" para iniciar a aplicação');
    console.log('2. Execute "./resources/02-test-connections.sh" para testar conexões');
    console.log('3. Consulte o README.md para instruções detalhadas');
  } else {
    log.info('🔧 Para corrigir problemas:');
    console.log('1. Execute "./resources/01-setup.sh" para reconfigurar');
    console.log('2. Verifique o arquivo .env com suas credenciais');
    console.log('3. Consulte docs/troubleshooting.md para ajuda');
  }
  
  process.exit(success ? 0 : 1);
}

// Executar se chamado diretamente
if (require.main === module) {
  main().catch(error => {
    log.error(`Erro durante verificação: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { SetupVerifier, checks };
