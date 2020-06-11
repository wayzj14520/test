const NODE_ENV = process.env.NODE_ENV;
const config = {
    baseUrl: '' 
};

if (NODE_ENV == 'development') {
    config.baseUrl = '/api';
} else if (NODE_ENV == "production") {
    config.baseUrl = '';
} else if (NODE_ENV == "testing") {
    config.baseUrl = '';
}

module.exports = config;