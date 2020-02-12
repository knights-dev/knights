module.exports = {
  stories: ['../src/stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-knobs'],
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
    config.module.rules.push({
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    });


    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
