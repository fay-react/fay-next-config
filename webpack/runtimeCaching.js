/**
 * Create by fay on 4/29/20 4:55 上午
 */
module.exports = [{
  urlPattern: /^https?.*/,
  handler: 'NetworkFirst',
  options: {
    cacheName: 'offlineCache',
    expiration: {
      maxEntries: 200
    }
  }
}, {
  urlPattern: /\.(?:js|css)$/,
  handler: 'StaleWhileRevalidate',
  options: {
    cacheName: 'fay-resource-cache',
    expiration: {
      maxEntries: 500,
      maxAgeSeconds: 7 * 24 * 60 * 60,
    },
    // Configure background sync.
    backgroundSync: {
      name: 'fay-resource-queue',
      options: {
        maxRetentionTime: 60 * 60,
      },
    },
    // Configure which responses are considered cacheable.
    cacheableResponse: {
      statuses: [0, 200],
      headers: {'x-test': 'true'},
    },
    // Configure the broadcast update plugin.
    broadcastUpdate: {
      channelName: 'fay-resource-update',
    },
    // Add in any additional plugin logic you need.
    // plugins: [
    //     {cacheDidUpdate: () => /* custom plugin code */}
    // ],
    // matchOptions and fetchOptions are used to configure the handler.
    fetchOptions: {
      mode: 'no-cors',
    },
    matchOptions: {
      ignoreSearch: true,
    },
  },
},{
  // Match any same-origin request that contains 'api'.
  urlPattern: /api/,
  // Apply a network-first strategy.
  handler: 'NetworkFirst',
  options: {
    // Fall back to the cache after 10 seconds.
    networkTimeoutSeconds: 10,
    // Use a custom cache name for this route.
    cacheName: 'fay-api-cache',
    // Configure custom cache expiration.
    expiration: {
      maxEntries: 5,
      maxAgeSeconds: 60,
    },
    // Configure background sync.
    backgroundSync: {
      name: 'fay-api-queue',
      options: {
        maxRetentionTime: 60 * 60,
      },
    },
    // Configure which responses are considered cacheable.
    cacheableResponse: {
      statuses: [0, 200],
      headers: {'x-test': 'true'},
    },
    // Configure the broadcast update plugin.
    broadcastUpdate: {
      channelName: 'fay-api-update',
    },
    // Add in any additional plugin logic you need.
    // plugins: [
    //     {cacheDidUpdate: () => /* custom plugin code */}
    // ],
    // matchOptions and fetchOptions are used to configure the handler.
    fetchOptions: {
      mode: 'no-cors',
    },
    matchOptions: {
      ignoreSearch: true,
    },
  },
}, {
  urlPattern: /.png$/,
  handler: 'CacheFirst'
}, {
  urlPattern: /.html$/,
  handler: 'NetworkFirst',
  options: {
    cacheableResponse: {
      statuses: [0, 200]
    }
  }
}];