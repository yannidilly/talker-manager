const fs = require('fs').promises;
const path = require('path');

async function readTalkers() {
  try {
    const talkerJsonFile = await fs.readFile(path.resolve(__dirname, '../talker.json'));
    const talkerData = JSON.parse(talkerJsonFile);
    return talkerData;
  } catch (error) {
    console.log('Erro na leitura do arquivo talker.json', error);
  }
}

async function addTalker(talkerData) {
  const talker = talkerData;
  try {
    const allTalkers = await readTalkers();
    const lastTalkerId = allTalkers[allTalkers.length - 1].id;
    talker.id = lastTalkerId + 1;
    allTalkers.push(talker);
    const allTalkersFile = JSON.stringify(allTalkers);
    await fs.writeFile(path.resolve(__dirname, '../talker.json'), allTalkersFile);
    return talker;
  } catch (error) {
    console.log('Erro na escrita do arquivo talker.json', error);
  }
}

async function editTalker(id, newTalkerData) {
  const allTalkers = await readTalkers();
  const talkerIndex = allTalkers.findIndex((talker) => talker.id === id);
  console.log(talkerIndex);
  allTalkers.splice(talkerIndex, 1, { id, ...newTalkerData });
  const allTalkersFile = JSON.stringify(allTalkers);
  await fs.writeFile(path.resolve(__dirname, '../talker.json'), allTalkersFile);
}

module.exports = {
  readTalkers,
  addTalker,
  editTalker,
};
