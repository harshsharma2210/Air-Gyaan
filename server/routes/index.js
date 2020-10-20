const requireContext = require("../require-context");
// this call will resolve relative to where require-context.js is:
// use its path as base dir when using relative routes
// in that case, with just traverse routes directory looking for routes
const requireRoutes = requireContext("./routes", false, /\.js$/);
const path = require('path');
const configureRoutes = (app, apiPrefix) => {
  for (const file of requireRoutes.keys()) {
    const name = path.parse(file).name;
    if (name === "index") {
      continue;
    }
    // console.info(`File: ${file}`);
    // console.info(`Name: ${name}`);
    const route = requireRoutes(file);
    // allow use default export (export default) or its own namespace (module.exports)
    app.use(`${apiPrefix}/${name}`, route.default || route);
  }
};
module.exports = configureRoutes;
