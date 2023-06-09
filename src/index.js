const express = require('express');
const crypto = require('crypto');
const {
  readTalkers,
  addTalker,
  editTalker,
  deleteTalker,
  searchTalker,
} = require('./utils/fsUtils');
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

app.get('/talker/search', tokenValidation, async (req, res) => {
  const { q } = req.query;
  const searchedTalker = await searchTalker(q);
  return res.status(200).json(searchedTalker);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  console.log('query: ', req.query);
  const talkersData = await readTalkers();
  const talkerRequestData = talkersData.find((talkerData) => talkerData.id === Number(id));
  if (!talkerRequestData) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(talkerRequestData);
});

app.get('/talker', async (req, res) => {
  const talkersData = await readTalkers();
  return res.status(HTTP_OK_STATUS).json(talkersData);
});

app.post('/login', emailValidation, passwordValidation, (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
});

app.post('/talker',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  async (req, res) => {
  const talkerAdded = await addTalker(req.body);
  return res.status(201).json(talkerAdded);
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
  return res.status(200).json({ id: numberId, ...req.body });
});

app.delete('/talker/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;
  const numberId = Number(id);
  await deleteTalker(numberId);
  return res.status(204).json();
});
