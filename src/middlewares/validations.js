const emailValidation = (request, response, next) => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/i;
  const { email } = request.body;
  if (!email) {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!regex.test(email)) {
    return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const passwordValidation = (request, response, next) => {
  const { password } = request.body;
  if (!password) {
    return response.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return response.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const tokenValidation = (request, response, next) => {
  const token = request.header.authorization;
  if (!token) {
    return response.status(401).json({ message: 'Token não encontrado' });
  }
  if ((token.length !== 16) || (typeof token !== 'string')) {
    return response.status(401).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = {
  emailValidation,
  passwordValidation,
  tokenValidation,
};