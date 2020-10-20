const entities = [];

const populateData = entity => entities.push(entity);

const addNewEntity = (entity, res) => {
  const id = entities.length + 1;
  entities.unshift(Object.assign({}, entity, {
    _id: `${id}`,
    __lu: new Date().toISOString(),
    __v: 0
  }));
  res.json({ created: true });
}

const updateEntity = (req, res, callback) => {
  const id = req.params.id;
  const post = entities.find(p => p._id === id);
  const updated = !!post;
  if (updated) {
    const data = callback(req);
    Object.assign(post, data, {
      __lu: new Date().toISOString(),
      __v: post.__v + 1
    });
  }
  res.json({ updated });
}

const doGetAll = res => {
  res.json(entities.sort((a, b) => b._id - a._id));
};

const doGet = (req, res) => {
  const id = req.params.id;
  res.json(entities.find(p => p._id === id));
};

const doDelete = (req, res) => {
  const id = req.params.id;
  const idx = entities.findIndex(p => p._id === id);
  const deleted = idx > -1;
  if (deleted) {
    entities.splice(idx, 1);
  }
  res.json({ deleted });
};

module.exports = {
  populateData,
  addNewEntity,
  updateEntity,
  doGetAll,
  doGet,
  doDelete
}
