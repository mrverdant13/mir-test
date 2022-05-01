exports.checkParentExistence = (Model, parentIdParamName) => {
  if (!Model) throw new Error('Missing model');
  if (!parentIdParamName) throw new Error('Missing parent ID param name');
  return async (req, _, next) => {
    const parentId = req.params[parentIdParamName];
    const maybeParent = await Model.findById(parentId);
    if (!maybeParent) {
      next({
        statusCode: 404,
        message: `${Model.modelName} with ID ${parentId} not found.`,
      });
    }
    next();
  };
};
