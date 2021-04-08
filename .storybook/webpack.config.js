const path = require('path');
const rootWebpackConfig = require('../../../.storybook/webpack.config');
// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  config = await rootWebpackConfig({ config, mode });

  config.resolve.extensions.push('.tsx');
  config.resolve.extensions.push('.ts');
  config.resolve.alias = {
    '@mono-nx-test-with-nextjs/ui': path.resolve(
      __dirname,
      '../../../libs/ui/src/index.ts'
    ),
    '@mono-nx-test-with-nextjs/fe-wtc-tech-test': path.resolve(
      __dirname,
      '../app/index.ts'
    ),
  };
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
    },
  });
  return config;
};
