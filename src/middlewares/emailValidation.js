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

module.exports = emailValidation;