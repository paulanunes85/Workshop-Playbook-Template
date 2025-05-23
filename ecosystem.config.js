module.exports = {
  apps: [{
    name: 'workshop-template',
    script: 'src/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 3000,
      LOG_LEVEL: 'info'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
      LOG_LEVEL: 'warn'
    },
    log_file: 'logs/combined.log',
    out_file: 'logs/out.log',
    error_file: 'logs/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    max_memory_restart: '1G',
    node_args: '--max-old-space-size=1024',
    watch: false,
    ignore_watch: [
      'node_modules',
      'logs',
      'docs',
      'tests'
    ],
    watch_options: {
      followSymlinks: false
    },
    min_uptime: '10s',
    max_restarts: 5,
    autorestart: true,
    cron_restart: '0 2 * * *', // Restart diariamente às 2:00
    source_map_support: true,
    instance_var: 'INSTANCE_ID'
  }]
};
