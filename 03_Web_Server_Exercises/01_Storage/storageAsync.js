let storageArray = {};
const validate = require('./validate');
const fs = require('fs');

function put (key, value) {
  validate.checkString(key);
  if (validate.checkKeyPresence(key, storageArray)) {
    throw new Error('Key already exists.');
  }
  storageArray[key] = value;
}

function get (key) {
  validate.checkString(key);
  if (validate.checkKeyPresence(key, storageArray)) {
    return storageArray[key];
  }
  throw new Error('Key does not exist.');
}

// The "getAll" function should return all key-value pairs from the storage, if the storage is empty it should print appropriate message
function getAll () {
  if (Object.keys(storageArray).length === 0 && storageArray.constructor === Object) {
    // throw new Error('Storage array is empty.');
    return 'Storage array is empty.';
  }
  return storageArray;
}

// The "update" function should have two parameters – one for the key and one for the value.
// If the key is not a string, you should throw an error. If the key does not exist in the storage, you should throw an error.
// Otherwise you should update the key-value pair in memory
function update (key, newValue) {
  validate.checkString(key);
  if (!validate.checkKeyPresence(key, storageArray)) {
    throw new Error('Key does not exist.');
  }
  storageArray[key] = newValue;
}

// The "delete" function should have one parameter – for the key. If the key is not a string, you should throw an error.
// If the key does not exist in the storage, you should throw an error.
// Otherwise you should delete the key-value pair from the memory storage
function del (key) {
  validate.checkString(key);
  if (!validate.checkKeyPresence(key, storageArray)) {
    throw new Error('Key does not exist.');
  }
  delete storageArray[key];
  // return;
}

// The "clear" function should delete all saved key-value pairs in the storage.
function clear () {
  for (var member in storageArray) delete storageArray[member];
  // storageArray = {};
}

// The "save" function should save all key-value pairs on a file named "storage.json".
// Use JSON format for saving the data. Every time the "save" function is called the file should be overridden,
// starting from a blank state. Use asynchronous file access
function save () {
  fs.writeFile('./storage.json', JSON.stringify(storageArray), (err, data) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}

// The "load" function should read a file named "storage.json", parse the data,
// and load all the key-value pairs in memory. If the file does not exist yet, do nothing.
// Use asynchronous file access
function load () {
  fs.readFileSync('./storage.json', 'utf8', (err, data) => {
    if (err) throw err;
    storageArray = JSON.parse(data);
  });
}

module.exports = {
  put,
  get,
  getAll,
  update,
  del,
  clear,
  save,
  load
};
