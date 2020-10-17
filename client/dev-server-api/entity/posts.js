const posts = [];
const handler = {
  handleGetAll: function(req, res) {
    res.json(posts.sort((a, b) => b._id - a._id));
  },
  handleGet: function(req, res) {
    const id = req.params.id;
    res.json(posts.find(p => p._id === id));
  },
  handleCreate: function(req, res) {
    const id = posts.length + 1;
    const {
      title,
      subtitle = null,
      body
    } = req.body;
    posts.push({
      title,
      subtitle,
      body
    }, {
      _id: `${id}`,
      __lu: new Date().toISOString(),
      __v: 0
    })
    res.json({ created: true });
  },
  handleUpdate: function(req, res) {
    const id = req.params.id;
    const post = posts.find(p => p._id === id);
    const updated = !!post;
    if (updated) {
      const {
        title,
        subtitle = null,
        body
      } = req.body;
      Object.assign(post,{
        title,
        subtitle,
        body,
        __lu: new Date().toISOString(),
        __v: post.__v + 1
      });
    }
    res.json({ updated });
  },
  handleDelete: function(req, res) {
    const id = req.params.id;
    const idx = posts.findIndex(p => p._id === id);
    const deleted = idx > -1;
    if (deleted) {
      posts.splice(idx, 1);
    }
    res.json({ deleted });
  },
  populateSomeData: function() {
    for (let i = 0; i < 3; i++) {
      posts.push({
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
