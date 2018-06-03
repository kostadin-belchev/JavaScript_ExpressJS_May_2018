// const storage = require('./storage');
const storage = require('./storageAsync');

storage.load();
storage.put('first', 'firstValue');
storage.put('second', 'secondValue');
storage.put('third', 'thirdValue');
storage.put('fouth', 'fourthValue');
storage.put('fifth', 'fifthValue');
console.log(storage.get('first'));
console.log(storage.getAll());
storage.del('second');
storage.update('first', 'updatedFirst');
storage.save();
storage.clear();
console.log(storage.getAll());
storage.load();
console.log(storage.getAll());
