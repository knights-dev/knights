module.exports = {
  stories: ['../src/stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async config => {
    // do mutation to the config

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
        }
      ],
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
