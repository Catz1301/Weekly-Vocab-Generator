import populateWords from './populateWords.js';
function checkImport() {
	if (Cookies.get('imported') == "true") {
		console.debug("HERE!")
		let wordStrList = decodeURI(Cookies.get('importedWords'));
		let words = wordStrList.split(',');
		console.log(words);
		for (let i = 1; i <=4; i++) {
			populateWords(i, words[i-1]);
		}
		Cookies.remove('imported');
		Cookies.remove('importedWords');
	}
}

export default checkImport;