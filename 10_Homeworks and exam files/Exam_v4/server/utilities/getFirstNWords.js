module.exports = function getFirstNWordsInAString (str, n) {
  return str.split(/\s+/).slice(0, n).join(' ')
}
