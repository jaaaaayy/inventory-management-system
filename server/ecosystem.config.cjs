module.exports = {
  apps: [
    {
      name: "ims-server",
      script: "./src/index.js",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      env: { NODE_ENV: "production" },
    },
  ],
};
