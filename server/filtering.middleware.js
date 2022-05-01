exports.parseFiltering = (relations) => {
  if (!relations) throw new Error('Missing available fields for filtering');
  return (req, _, next) => {
    const { params } = req;
    const filterBy = {};
    const paramKeys = Object.keys(params);
    const relationFields = Object.keys(relations);
    paramKeys.forEach((param) => {
      relationFields.forEach((field) => {
        const suffix = relations[field].paramSuffix;
        const filterKey = param.replace(suffix, '');
        const filterValue = params[param];
        filterBy[filterKey] = filterValue;
      });
    });
    req.filterBy = filterBy;
    next();
  };
};
