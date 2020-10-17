const requireContext = require("../require-context");
const requireUsers = requireContext("./users", false, /\.js$/);
const path = require('path');
const fs = require('fs');
const configureUsers = (users, apiUriPath) => {
  for (const file of requireUsers.keys()) {
    const name = path.parse(file).name;
    if (name === "index") {
      continue;
    }
    // console.info(`File: ${file}`);
    // console.info(`Name: ${name}`);
    const user = requireUsers(file);
    // allow use default export (export default) or its own namespace (module.exports)
    const userData = user.default || user;
    userData.platformId = userData.platformId || name;
    userData.userPassword = userData.userPassword || "111";
    const id = userData.platformId;
    const avatar = path.resolve(path.dirname(file), `${id}.png`);
    if (fs.existsSync(avatar)) {
      userData.picPath = avatar;
      userData.pic = `${apiUriPath}avatar/${id}`;
    } else {
      delete userData.pic;
    }
    users.set(id, userData);
  }
};
module.exports = configureUsers;
