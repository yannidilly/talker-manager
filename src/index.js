const express = require('express');
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
