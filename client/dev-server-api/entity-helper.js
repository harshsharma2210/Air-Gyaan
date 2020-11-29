const entities = [];

const populateData = entity => entities.push(entity);

const addNewEntity = (entity, res) => {
  const id = entities.length + 1;
  entities.unshift(Object.assign({}, entity, {
    _id: `${id}`,
    __lu: new Date().toISOString(),
    __v: 0
  }));
  //todo@userquin: unify this with same server logic or modify server logic
  // res.status(200).json({ 'business': 'business in added successfully' });
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

const doGetAll = (req, res) => {
  let page = 1;
  try {
    page = parseInt(req.query && req.query.page, 10);
    if (page < 0 || isNaN(page)) {
      page = 1;
    }
  } catch (_) {
    page = 1;
  }
  let limit = req.query && req.query.limit;
  if (limit !== undefined) {
    try {
      limit = parseInt(limit, 10);
    } catch (_) {
      limit = 10;
    }
  } else {
    limit = 10;
  }
  // make a sorted copy
  const resultingRows = entities.sort((a, b) => b._id - a._id);
  // https://github.com/edwardhotchkiss/mongoose-paginate#modelpaginatequery-options-callback
  const result = {
    docs: [],
    total: resultingRows.length,
    limit,
    page
  }
  // UI 1 based => we need to handle it 0 based
  const startIndex = (page - 1) * limit;
  if (startIndex < resultingRows.length) {
    const endIndex = Math.max(resultingRows.length - 1, page * limit);
    result.docs = resultingRows.slice(startIndex, endIndex)
  }
  res.json(result);
};

const doGet = (req, res) => {
  const id = req.params.id;
  const entity = entities.find(p => p._id === id);
  if (entity) {
    res.json(entity);
  } else {
    res.status(404).send(`cannot find requested post: ${id}`);
  }
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
