const express = require('express');
const crypto = require('crypto');
const emailValidation = require('./middlewares/emailValidation');
const passwordValidation = require('./middlewares/passwordValidation');
const { readTalkers } = require('./utils/fsUtils');

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

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const talkersData = await readTalkers();
  const talkerRequestData = talkersData.find((talkerData) => talkerData.id === Number(id));
  if (!talkerRequestData) {
    return response.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  return response.status(HTTP_OK_STATUS).json(talkerRequestData);
});

app.get('/talker', async (_request, response) => {
  const talkersData = await readTalkers();
  response.status(HTTP_OK_STATUS).json(talkersData);
});

app.post('/login', emailValidation, passwordValidation, (request, response) => (
  response.status(200).json({
    token: crypto.randomBytes(8).toString('hex'),
})));

app.post('/talker', (request, response) => {
  // const { name, age, talk: { watchedAt, rate } } = request.body;
  response.status(201).json(request.body);
});
