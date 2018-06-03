function checkString (key) {
  if (typeof key !== 'string') {
    throw new Error('Key is not a string.');
  }
}

function checkKeyPresence (key, object) {
  if (object.hasOwnProperty(key)) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  checkString,
  checkKeyPresence
};
