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
    if (isNaN(page) || page < 1) {
      page = 1;
    }
  } catch (_) {
    page = 1;
  }
  let limit = req.query && req.query.limit;
  if (limit !== undefined) {
    try {
      limit = parseInt(limit, 10);
      if (isNaN(limit) || limit <= 0) {
        limit = 10;
      }
    } catch (_) {
      limit = 10;
    }
  } else {
    limit = 10;
  }
  // make a sorted copy
  const resultingRows = entities.sort((a, b) => b._id - a._id);
  const total = resultingRows.length;
  // https://www.npmjs.com/package/mongoose-paginate-v2#modelpaginatequery-options-callback
  // we dont include pagingCounter entry
  const result = {
    docs: [],
    totalDocs: resultingRows.length,
    totalPages: Math.ceil(total / limit),
    hasNextPage: false,
    hasPrevPage: page > 1,
    nextPage: null,
    prevPage: page > 1 ? page - 1: null,
    limit,
    page
  }
  // UI 1 based => we need to handle it 0 based
  const startIndex = (page - 1) * limit;
  if (startIndex < total) {
    const endIndex = Math.max(total - 1, page * limit);
    result.docs = resultingRows.slice(startIndex, endIndex);
    result.hasNextPage = total - 1 > page * limit;
    if (result.hasNextPage) {
      result.nextPage = page + 1;
    }
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
