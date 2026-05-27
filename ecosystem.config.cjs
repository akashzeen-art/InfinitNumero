module.exports = {
  apps: [
    {
      name: "infinityplay",
      script: "dist/server/node-build.mjs",
      cwd: "/var/www/vasnumero/NewGameWebsite",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
