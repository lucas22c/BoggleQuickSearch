// backend/funcs/search.js

function getFrequencyMap(word) {
  const frequencyMap = {};
  for (const char of word) {
	frequencyMap[char] = (frequencyMap[char] || 0) + 1;
  }
  return frequencyMap;
}

function canFormWord(word, availableChars) {
	for (const char of word) {
		if(!availableChars[char] || word[char > availableChars[char]]) {
			return false;
		}
	}
	return true;
}

module.exports = { getFrequencyMap, canFormWord };

