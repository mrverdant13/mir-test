const { Visitor } = require('./entity');

exports.createVisitor = async (req, res, next) => {
  try {
    const { body } = req;
    const visitorModel = new Visitor(body);
    const createdVisitorDoc = await visitorModel.save();
    res.status(201).send(`<h1>El visitante fue almacenado con éxito</h1>`);
  } catch (err) {
    next(err);
  }
};
