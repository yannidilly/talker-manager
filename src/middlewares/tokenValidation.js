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

module.exports = tokenValidation;
