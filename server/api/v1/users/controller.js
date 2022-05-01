const { buildToken } = require('./auth');
const { User } = require('./entity');

// Request handlers

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Visitantes recurrentes</title>
  </head>
  <body>
    <a href="/register">Registrarse</a>
    <table>
      <thead>
        <th>Name</th>
        <th>Email</th>
      </thead>
${users
  .map((user) =>
    `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
      </tr>
`.trim(),
  )
  .join('')}
    </table>
  </body>
</html>
`);
  } catch (err) {
    next(err);
  }
};

exports.showForm = (_, res) =>
  res.status(200).send(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Formulario de registro</title>
  </head>
  <body>
    <form method="post" action="/register">
      <label for="name">Nombre</label>
      <input type="text" name="name" id="name" />
      <label for="email">Email</label>
      <input type="email" name="email" id="email" />
      <label for="password">Contraseña</label>
      <input type="password" name="password" id="password" />
      <input type="submit" value="Registrarse" />
    </form>
  </body>
</html>
`);

exports.registerUser = async (req, res, next) => {
  try {
    const { body } = req;
    const userModel = new User(body);
    await userModel.save();
    res.redirect('/');
  } catch (err) {
    next(err);
  }
};
