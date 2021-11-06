module.exports = {
    configureWebpack: {
        watchOptions: {
            poll: 1000, // Check for changes every second
            ignored: /node_modules/,
        },
        watch: true,
    }
};