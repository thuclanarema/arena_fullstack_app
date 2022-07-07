module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'npm',
      args: 'run serve',
      env_development: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
