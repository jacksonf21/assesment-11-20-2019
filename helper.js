const csvGenerate = (filename, report) => {
  const fs = require('fs');
  
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, report, (err, data) => {
      if (err) reject(err);
      resolve(data);
    })  
  })
};

const fileReader = filename => {
  const fs = require('fs');
  
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    })  
  })
}; 

const splitter = data => {
  return data.trim().split('\n').map(line => line.split(','));
}

module.exports = { csvGenerate, fileReader, splitter }
