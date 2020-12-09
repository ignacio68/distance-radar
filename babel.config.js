module.exports = (api) => {
    api.cache(true)

    return {
        presets: [
            ['@babel/preset-env', { targets: { esmodules: true } }],
            '@babel/preset-typescript',
        ],
        env: {
            test: {
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            targets: { node: 'current' },
                        },
                    ],
                    '@babel/preset-typescript',
                ],
            },
        },
    }
}
