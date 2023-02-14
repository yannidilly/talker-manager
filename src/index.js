const express = require('express');
const crypto = require('crypto');
const { readTalkers, addTalker, editTalker } = require('./utils/fsUtils');
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

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
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

app.post('/login', emailValidation, passwordValidation, (req, res) => (
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
  async (req, res) => {
  const talkerAdded = await addTalker(req.body);
  res.status(201).json(talkerAdded);
});

app.put('/talker/:id',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  async (req, res) => {
  const { id } = req.params;
    const numberId = Number(id);
  await editTalker(numberId, req.body);
  res.status(200).json({ id: numberId, ...req.body });
});
