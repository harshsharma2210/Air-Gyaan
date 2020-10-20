const {
  populateData,
  addNewEntity,
  updateEntity,
  doGetAll,
  doGet,
  doDelete
} = require("../entity-helper");

const handler = {
  handleGetAll: function(req, res) {
    doGetAll(res);
  },
  handleGet: function(req, res) {
    doGet(req, res);
  },
  handleDelete: function(req, res) {
    doDelete(req, res);
  },
  handleCreate: function(req, res) {
    const {
      title,
      subtitle = null,
      body
    } = req.body;
    addNewEntity(
      {
        title,
        subtitle,
        body
      },
      res
    );
  },
  handleUpdate: function(req, res) {
    updateEntity(req, res, r => {
      const {
        title,
        subtitle = null,
        body
      } = r.body;
      return {
        title,
        subtitle,
        body
      }
    })
  },
  populateSomeData: function() {
    for (let i = 0; i < 3; i++) {
      populateData({
        _id: `${i + 1}`,
        title: `Post ${i + 1}`,
        subtitle: `Subtitle ${i + 1}`,
        body: "Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.",
        __lu: new Date().toISOString(),
        __v: 0
      })
    }
  }
};
module.exports = handler;
