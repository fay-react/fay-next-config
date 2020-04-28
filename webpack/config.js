/**
 * Create by fay on 4/28/20 3:59 上午
 */
// const {getPWAPlugin} = require('./pwaPlugin');
const path = require('path');

module.exports = (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  // Note: we provide webpack above so you should not `require` it
  // Perform customizations to webpack config
  // Important: return the modified config
  const originalEntry = config.entry;
  config.entry = async () => {
    const entries = await originalEntry()
    if (entries['main.js']) {
      if(!dev && !entries['main.js'].includes('@fay-next/config/client/sw/registry.js')){
        entries['main.js'].unshift('@fay-next/config/client/sw/registry.js')
      }
      if(!entries['main.js'].includes('@fay-next/config/client/polyfills.js')){
        entries['main.js'].unshift('@fay-next/config/client/polyfills.js')
      }
    }
    return entries
  }
  config.resolve.alias = {
    ...config.resolve.alias,
    // my aliases
    '@': path.resolve(process.cwd(), 'src')
  }
  config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
  // config.plugins.push(getPWAPlugin());
  return config;
}