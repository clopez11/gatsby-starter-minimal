module.exports = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`,
    title: `Reproduce Bug for Plugin`
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: `Prodigy Education`,
        short_name: `Prodigy`,
        start_url: `/`,
        background_color: `#FF5B10`,
        theme_color: `#FF5B10`,
        display: `standalone`,
        icon: `src/images/favicon-32x32.png`,
        cache_busting_mode: 'none',
        icon_options: {
          purpose: `maskable any`,
        },
        icons: [
          {
            src: `icons/maskable_icon_48.png`,
            sizes: `48x48`,
            type: `image/png`,
          },
          {
            src: `icons/maskable_icon_72.png`,
            sizes: `72x72`,
            type: `image/png`,
          },
          {
            src: `icons/maskable_icon_96.png`,
            sizes: `96x96`,
            type: `image/png`,
          },
          {
            src: `icons/maskable_icon_128.png`,
            sizes: `128x128`,
            type: `image/png`,
          },
          {
            src: "icons/maskable_icon_144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: `icons/maskable_icon_192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: "icons/maskable_icon_256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: `icons/maskable_icon_384.png`,
            sizes: `384x384`,
            type: `image/png`,
          },
          {
            src: `icons/maskable_icon_512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
        crossOrigin: `use-credentials`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        // appendScript: require.resolve(`./src/custom-sw-code.js`), // excludes Optimizely from cache
        workboxConfig: {
          importWorkboxFrom: `cdn`,
          globDirectory: `rootDir`,
          modifyURLPrefix: {
            '/': `${process.env.ASSET_PREFIX || ''}/`, // Point to cdn otherwise use the default
          },
          cacheId: `gatsby-plugin-offline`,
          // Don't cache-bust JS or CSS files, and anything in the static directory,
          // since these files have unique URLs and their contents will never change
          dontCacheBustURLsMatching: /(\.js$|\.css$|static\/)/,
          runtimeCaching: [
            {
              // Use cacheFirst since these don't need to be revalidated (same RegExp and same reason as above)
              urlPattern: /(^(?!.*(leadflow)).*\.js$|^(?!.*font-awesome).*\.css$|static\/)/,
              handler: `CacheFirst`,
            },
            {
              // page-data.json files, static query results and app-data.json
              // are not content hashed
              urlPattern: /^https?:.*\/page-data\/.*\.json/,
              handler: `StaleWhileRevalidate`,
            },
            {
              // Add runtime caching of various other page resources
              urlPattern: /^https?:(?!.*(leadflows|optimizely)).*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|css)$/, // excludes Optimizely from cache
              handler: `StaleWhileRevalidate`,
            },
            {
              // Google Fonts CSS (doesn't end in .css so we need to specify it)
              urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
              handler: `StaleWhileRevalidate`,
            },
          ],
          skipWaiting: true,
          clientsClaim: true,
        },
      },
    },    
  ],
}
