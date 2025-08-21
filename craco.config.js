const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': 'rgb(52, 152, 219)' },
                        javascriptEnabled: true,
                    },
                },
            }, 
        },
    ],
};