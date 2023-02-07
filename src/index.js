const express = require('express');
const talkersList = require('./talker.json');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('talker/:id', (request, response) => {
  const { id } = request.params;
  const talkerRequestData = JSON.parse(talkersList)
    .find((talkerData) => talkerData.id === Number(id));
  if (!talkerRequestData) {
    return response.status(404);
  }
  return response.status(HTTP_OK_STATUS).json(talkerRequestData);
});

app.get('/talker', (_request, response) => {
  response.status(HTTP_OK_STATUS).json(talkersList);
});
