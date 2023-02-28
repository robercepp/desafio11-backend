module.exports = {
    apps: [
        {
        name: "Server1",
        script: "./server.js",
        watch: true,
        max_memory_restart: '1000M',
        exec_mode: "cluster",
        instances: 1,
        cron_restart: "59 23 * * *",
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}