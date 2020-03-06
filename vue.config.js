module.exports = {
    devServer: {
        https: false,
        hotOnly: false,
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: "http://39.97.104.66:8085",
                pathRewrite: {
                    '^/api': "http://39.97.104.66:8085"
                }
            }
        }
    }
}