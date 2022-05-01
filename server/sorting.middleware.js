const defaultSortBy = 'createdAt';
const directions = ['asc', 'desc'];

exports.parseSorting = (fields) => {
  if (!fields) throw new Error('Missing available fields for sorting');
  return (req, _, next) => {
    const { sortBy = defaultSortBy, direction = directions[0] } = req.query;
    const sortByIsValid = sortBy && fields.includes(sortBy);
    const directionIsValid = direction && directions.includes(direction);
    if (!sortByIsValid || !directionIsValid) {
      const sortByErrorMsg = sortByIsValid
        ? ''
        : ` 'sortBy' must be one of: '${fields.join("', '")}'.`;
      const directionErrorMsg = directionIsValid
        ? ''
        : ` 'direction' must be one of: '${directions.join("', '")}'.`;
      next({
        statusCode: 400,
        message:
          'Bad request: invalid sorting params.' +
          sortByErrorMsg +
          directionErrorMsg,
      });
    }
    req.sortBy = sortBy;
    req.direction = direction;
    next();
  };
};

exports.sortingDocsParams = (sortingFields) => [
  {
    in: 'query',
    name: 'sortBy',
    description: 'Field to sort by',
    required: false,
    schema: {
      type: 'string',
      enum: sortingFields,
      default: defaultSortBy,
    },
  },
  {
    in: 'query',
    name: 'direction',
    description: 'Sort direction',
    required: false,
    schema: {
      type: 'string',
      enum: directions,
      default: directions[0],
    },
  },
];
