const express = require('express');
const crypto = require('crypto');
const { readTalkers, addTalker } = require('./utils/fsUtils');
const {
  emailValidation,
  passwordValidation,
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
} = require('./middlewares/validations');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (req, res) => {
  res.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker/:id', async (request, res) => {
  const { id } = request.params;
  const talkersData = await readTalkers();
  const talkerRequestData = talkersData.find((talkerData) => talkerData.id === Number(id));
  if (!talkerRequestData) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  return res.status(HTTP_OK_STATUS).json(talkerRequestData);
});

app.get('/talker', async (req, res) => {
  const talkersData = await readTalkers();
  res.status(HTTP_OK_STATUS).json(talkersData);
});

app.post('/login', emailValidation, passwordValidation, (request, res) => (
  res.status(200).json({
    token: crypto.randomBytes(8).toString('hex'),
})));

app.post('/talker',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  async (request, res) => {
  const talkerAdded = await addTalker(request.body);
  res.status(201).json(talkerAdded);
});
