const PROXY_CONFIG = [
    {
        context: [
            "/jsonapi"
        ],
        target: "http://localhost:3000",
        secure: false
        // ,
        // pathRewrite: {'^/jsonapi' : ''}
    }
]

module.exports = PROXY_CONFIG;