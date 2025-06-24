const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = function (options, webpack) {
  const entry = ['webpack/hot/poll?100', options.entry];
  const hmr = new webpack.HotModuleReplacementPlugin();
  const watchIgnore = new webpack.WatchIgnorePlugin({
    paths: [/\.js$/, /\.d\.ts$/],
  });
  const runScript = new RunScriptWebpackPlugin({
    name: options.output.filename,
    autoRestart: false,
  });
  const externals = [nodeExternals({ allowlist: ['webpack/hot/poll?100'] })];
  const plugins = [...options.plugins, hmr, watchIgnore, runScript];

  return { ...options, entry, externals, plugins };
};
