const CompressionPlugin = require("compression-webpack-plugin");

const prod = process.env.NODE_ENV === "production";

/*
 To develop you dont need SASS to be changed, only the ui designer must enable it.
 To enable SASS, remember, a change on variable.scss will recompile all styles
 and can take more than 20 seconds, you must create an .env.<mode>.local file
 and inside it just add SASS=sass: see Webpack entry on GUIDE.md.
 */
const enableSass =  prod || (process.env.VUE_APP_SASS === "sass");

const webpackConfiguration = {
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
      .type("json")
      .use("yaml-loader")
      .loader("yaml-loader")
      .end();
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
  }
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
