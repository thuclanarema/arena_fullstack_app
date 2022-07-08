module.exports = {
  apps: [
    {
      name: "frontend",
      script: "npm",
      args: "run start",
      env_development: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
