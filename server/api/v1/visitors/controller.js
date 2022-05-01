const { Visitor } = require('./entity');

const buildTable = (visitors) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Visitantes recurrentes</title>
  </head>
  <body>
    <table>
      <thead>
        <th>Id</th>
        <th>Name</th>
        <th>Visits</th>
      </thead>
${visitors
  .map((visitor) =>
    `
      <tr>
        <td>${visitor.id}</td>
        <td>${visitor.name}</td>
        <td>${visitor.count}</td>
      </tr>
`.trim(),
  )
  .join('')}
    </table>
  </body>
</html>
`;

exports.createVisitor = async (req, res, next) => {
  try {
    const { name } = req.query;
    const visitorExists = (await Visitor.count({ name })) > 0;
    if (visitorExists) {
      await Visitor.findOneAndUpdate({ name }, { $inc: { count: 1 } });
    } else {
      const visitor = new Visitor(req.query);
      await visitor.save();
    }
    const visitors = await Visitor.find();
    res.status(200).send(buildTable(visitors));
  } catch (err) {
    next(err);
  }
};
