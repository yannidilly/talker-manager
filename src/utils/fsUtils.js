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

module.exports = {
  readTalkers,
};
