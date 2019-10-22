const marksObjectAssign = (arrOfArr) => {
  const retObj = {};
  const keys = arrOfArr[0];

  for (let i = 1; i < arrOfArr.length; i++) {
    const id = arrOfArr[i][0];
    const key1 = keys[1];
    const key2 = keys[2];  
    const val1 = arrOfArr[i][1];
    const val2 = arrOfArr[i][2];

    if (retObj[id]) {
      retObj[id][key1][val1] = {[key2]: val2}

    } else {
      retObj[id] = {
        [key1]: {
          [val1]: {
            [key2]: val2  
          }
        }    
      };
    }

  }
  return retObj;
};

const objectAssign = (arrOfArr) => {
  const retObj = {};
  const keys = arrOfArr[0];

  for (let i = 1; i < arrOfArr.length; i++) {
    keys.forEach((key, idx) => {
      const id = arrOfArr[i][0];
      const value = arrOfArr[i][idx];

      retObj[id] ? 
      retObj[id][key] = value : 
      retObj[id] = {};
    });
  }
  return retObj;
};

module.exports = { marksObjectAssign, objectAssign }