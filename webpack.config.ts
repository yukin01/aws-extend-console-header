import * as path from 'path'
import { Configuration } from 'webpack'
import HTMLWebpackPlugin from 'html-webpack-plugin'
//@ts-ignore
import CopyPlugin from 'copy-webpack-plugin'

const config: Configuration = {
  entry: {
    popup: path.join(__dirname, 'src/popup.tsx'),
    contentScripts: path.join(__dirname, 'src/contentScripts.ts')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    index: 'popup.html'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            compilerOptions: { module: 'esnext' }
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json']
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'src/popup.html'),
      filename: 'popup.html',
      chunks: ['popup']
    }),
    new CopyPlugin({ patterns: [{ from: 'public', to: '.' }] })
  ],
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial'
    }
  }
}

export default config
