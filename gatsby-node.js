const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
        '@constants': path.resolve(__dirname, 'src', 'constants'),
        '@components': path.resolve(__dirname, 'src', 'components'),
        '@models': path.resolve(__dirname, 'src', 'models'),
        '@hooks': path.resolve(__dirname, 'src', 'hooks'),
        '@utils': path.resolve(__dirname, 'src', 'utils'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          sourceMap: false,
          extractComments: 'all',
          terserOptions: {
            mangle: true,
            compress: {
              arrows: false,
              drop_console: false,
              drop_debugger: true,
              typeofs: false,
            },
          },
        }),
      ],
    },
  });
};
