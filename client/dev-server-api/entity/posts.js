const {
  populateData,
  addNewEntity,
  updateEntity,
  doGetAll,
  doGet,
  doDelete
} = require("../entity-helper");

const {
  addPostAction,
  verifyGrecaptcha
} = require("../grecaptcha");

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
  handleCreate: async function(req, res) {
    const {
      title,
      subtitle = null,
      body,
      action,
      grecaptcha
    } = req.body;
    if (action === addPostAction && !!grecaptcha) {
      const verifyError = await verifyGrecaptcha(addPostAction, grecaptcha);
      if (verifyError.valid) {
        addNewEntity(
          {
            title,
            subtitle,
            body
          },
          res
        );
      } else {
        res.json({
          "errorKey": "recaptcha-error",
          "error": verifyError.error.message || "unknown"
        });
      }
    } else {
      res.json({
        "errorKey": "missing-recaptcha"
      });
    }
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
