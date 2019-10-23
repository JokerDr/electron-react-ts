const {cacheDirectory} = require('../../utils');
const {pathResolve} = require('../../utils')
const tsImportPluginFactory = require('ts-import-plugin');



const main = [
  {
      test: /\.(j|t)s(x?)$/,
      enforce: 'pre',
      exclude: [
        /node_modules/,
        pathResolve('../../src/renderers')
      ],
      include: [pathResolve('../../src/main')],
      use: [
          {
              loader: 'cache-loader',
              options: {
                  cacheDirectory,
              }
          },
          'ts-loader',
      ]
  }
]

const renderer = [
  {
      test: /\.(j|t)s(x?)$/,
      enforce: 'pre',
      exclude: [/node_modules/, pathResolve('../../src/main')],
      include: [pathResolve('../../src')],
      use: [
          {
              loader: 'cache-loader',
              options: {
                  cacheDirectory,
              }
          },
          // {
          //     loader: 'babel-loader',
          //     options: {
          //         presets: ['@babel/preset-env'],
          //         plugins: [
          //             [
          //               'import',
          //               {
          //                 libraryName: 'antd',
          //                 libraryDirectory: 'lib',
          //                 style: true
          //               }
          //             ],
          //             // ['@babel/plugin-transform-runtime'],
          //         ]
          //     }
          // },
          {
              loader: 'ts-loader',
              options: {
                  getCustomTransformers: () => ({
                      before: [ tsImportPluginFactory({
                          libraryName: 'antd',
                          libraryDirectory: 'lib',
                          style: true
                        })
                         ]
                  }),
              }
          }
      ]
  }
]

const web = [
  {
      test: /\.(j|t)s(x?)$/,
      enforce: 'pre',
      exclude: /node_modules/,
      include: [pathResolve('../../src')],
      use: [
          {
              loader: 'cache-loader',
              options: {
                  cacheDirectory,
              }
          },
          // {
          //     loader: 'babel-loader',
          //     options: {
          //         presets: ['@babel/preset-env'],
          //         plugins: [
          //             [
          //               'import',
          //               {
          //                 libraryName: 'antd',
          //                 libraryDirectory: 'lib',
          //                 style: true
          //               }
          //             ],
          //             // ['@babel/plugin-transform-runtime'],
          //         ]
          //     }
          // },
          {
              loader: 'ts-loader',
              options: {
                  getCustomTransformers: () => ({
                      before: [ tsImportPluginFactory({
                          libraryName: 'antd',
                          libraryDirectory: 'lib',
                          style: true
                        })
                         ]
                  }),
              }
          }
      ]
  }
]

const targets = {
  main,
  renderer,
  web
}

module.exports = (target) => targets[target];
