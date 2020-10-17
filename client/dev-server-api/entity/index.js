const requireContext = require("../require-context");
const requireEntities = requireContext("./entity", false, /\.js$/);
const path = require('path');
const configureEntityHandlers = (app, apiUriPath) => {
  for (const file of requireEntities.keys()) {
    const name = path.parse(file).name;
    if (name === "index") {
      continue;
    }
    // console.info(`File: ${file}`);
    // console.info(`Name: ${name}`);
    const entity = requireEntities(file);
    // allow use default export (export default) or its own namespace (module.exports)
    const {
      handleGetAll,
      handleGet,
      handleCreate,
      handleUpdate,
      handleDelete,
      populateSomeData
    } = entity.default || entity;
    app.get(`${apiUriPath}${name}`, handleGetAll);
    app.get(`${apiUriPath}${name}/edit/:id`, handleGet);
    app.post(`${apiUriPath}${name}/add`, handleCreate);
    app.put(`${apiUriPath}${name}/update/:id`, handleUpdate);
    app.delete(`${apiUriPath}${name}/delete/:id`, handleDelete);
    if (populateSomeData) {
      populateSomeData();
    }

  }
};
module.exports = configureEntityHandlers;
