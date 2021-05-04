function populateWords(currentWord, word) {
	if (currentWord == 1) {
		word1.value = word;
	} else if (currentWord == 2) {
		word2.value = word;
	} else if (currentWord == 3) {
		word3.value = word;
	} else if (currentWord == 4) {
		word4.value = word;
	}
}

export default populateWords;