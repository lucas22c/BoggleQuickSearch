// backend/funcs/search.js

function getFrequencyMap(word) {
  const frequencyMap = {};
  for (const char of word) {
	frequencyMap[char] = (frequencyMap[char] || 0) + 1;
  }
  return frequencyMap;
}

function canFormWord(word, availableChars) {
	const charsCopy = { ...availableChars };
	for (const char of word) {
		if (!charsCopy[char] || charsCopy[char] < 1) {
			return false;
		}
		charsCopy[char]--;
	}
	return true;
}

module.exports = { getFrequencyMap, canFormWord };

