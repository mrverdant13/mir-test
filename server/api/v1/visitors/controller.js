const { Visitor } = require('./entity');

exports.createVisitor = async (req, res, next) => {
  try {
    const { name } = req.query;
    const visitorModel = new Visitor({ name });
    await visitorModel.save();
    res.status(201).send(`<h1>El visitante fue almacenado con éxito</h1>`);
  } catch (err) {
    next(err);
  }
};
