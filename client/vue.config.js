const CompressionPlugin = require("compression-webpack-plugin");

const prod = process.env.NODE_ENV === "production";

const fs = require("fs");

let publicPath = process.env.BASE_URL || "/";
if (!publicPath.startsWith("/")) {
  publicPath = `/${publicPath}`;
}
if (!publicPath.endsWith("/")) {
  publicPath += "/";
}

const server = (process) => {
  const devServer = {};
  if (process.env.HTTPS) {
    devServer.host = process.env.HOST || "0.0.0.0";
    devServer.port = process.env.PORT || 8443;
    devServer.https = {
      key: fs.readFileSync(process.env.HTTPS_KEY),
      cert: fs.readFileSync(process.env.HTTPS_CERT),
      ca: fs.readFileSync(process.env.HTTPS_CA)
    };
  } else {
    devServer.host = process.env.HOST || "0.0.0.0";
    devServer.port = process.env.PORT || 8080;
    devServer.https = false;
  }
  devServer.disableHostCheck = true;
  if (process.env.API_PROXY !== undefined) {
    devServer.proxy = {};
    devServer.proxy[`${publicPath}api`] = {
      target: process.env.API_PROXY,
      secured: process.env.API_PROXY_SECURED
    };
  } else {
    devServer.setup = require("./dev-server-api");
  }
  return {
    devServer: devServer
  };
};

/*
 To develop you dont need SASS to be changed, only the ui designer must enable it.
 To enable SASS, remember, a change on variable.scss will recompile all styles
 and can take more than 20 seconds, you must create an .env.<mode>.local file
 and inside it just add VUE_APP_SASS=sass: see Webpack entry on GUIDE.md.
 */
const enableSass =  prod || (process.env.VUE_APP_SASS === "sass");

const webpackConfiguration = {
  publicPath,
  transpileDependencies: [
    "vuetify"
  ],
  configureWebpack: config => {
    if (prod) {
      /*
        This entry will generate .gz variants for each resource of the compilation.
        This will reduce the data transfer from the client and the server.
        Enable it on production build.
       */
      config.plugins.push(
        new CompressionPlugin({
          filename: "[path][base].gz[query]",
          algorithm: "gzip",
          test: /\.js$|\.svg$|\.css$|\.html|\.map|\.eot|\.ttf|\.ico|\.png|\.jpg$/,
          threshold: 128,
          minRatio: 0.8
        })
      );
    } else {
      // enable CORS
      config.devServer = {
        headers: { 'Access-Control-Allow-Origin': '*' }
      }
    }
  },
  chainWebpack: config => {
    /*
      Webpack can compile JSON to javascript modules, these lines will convert yaml files to json modules
    */
    config.resolve.extensions.add(".yml").add(".yaml");
    config.module
      .rule("yaml")
      .test(/\.ya?ml$/)
      .use('json-loader')
      .loader('json-loader')
      .end()
      .use("yaml-loader")
      .loader("yaml-loader")
      .end();
    // if (process.env.VUE_APP_NODE_12) {
    //   config.module
    //     .rule("yaml")
    //     .test(/\.ya?ml$/)
    //     .use('json-loader')
    //     .loader('json-loader')
    //     .end()
    //     .use("yaml-loader")
    //     .loader("yaml-loader")
    //     .end();
    // } else {
    //   config.module
    //     .rule("yaml")
    //     .test(/\.ya?ml$/)
    //     .type("json")
    //     .use("yaml-loader")
    //     .loader("yaml-loader")
    //     .end();
    // }
    if (enableSass) {
      /*
        Enable change vuetify SASS variables:
        Change this when changing sass-loader, see https://vuetifyjs.com/en/features/sass-variables/#webpack-install
      */
      ["vue-modules", "vue", "normal-modules", "normal"].forEach(match => {
        config.module
          .rule("sass")
          .oneOf(match)
          .use("sass-loader")
          .tap(opt =>
            Object.assign(opt, {
              prependData: `@import '@/styles/variables.scss'`
            })
          );
      });
    }
  },
  ...server(process)
};

if (enableSass) {
  /* Allow use scss inside SFC */
  webpackConfiguration.css = {
    loaderOptions: {
      scss: {
        // Here we can use the newer SCSS flavor of Sass.
        // Note that there *is* a semicolon at the end of the below line
        prependData: `@import "@/styles/variables.scss";`
      }
    }
  }
}

module.exports = webpackConfiguration;
