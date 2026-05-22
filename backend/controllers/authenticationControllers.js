const User = require('../models/user');

exports.getRegister = (req, res) =>
  res.render('authentication/register', { error: null, title: 'Register' });

exports.postRegister = async (req, res) => {
  try {
    const { username, email, password, phone, address, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.render('authentication/register', { error: 'Email já registado', title: 'Register' });

    await User.create({ username, email, password, phone, address, role: role || 'client' });
    res.redirect('/auth/login');
  } catch (err) {
    console.log(err);
    res.render('authentication/register', { error: 'Erro ao registar', title: 'Register' });
  }
};

exports.getLogin = (req, res) =>
  res.render('authentication/login', { error: null, title: 'Login' });

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    req.session.user = {
      _id: user._id,
      username: user.username,
      role: user.role,
      email: user.email
    };
    res.redirect('/dashboard');
  } catch (err) {
    return res.render('authentication/login', { error: 'Credenciais inválidas', title: 'Login' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
};