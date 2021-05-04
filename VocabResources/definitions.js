function getRandomInt(min = 1, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function handleSpeechParts(words) {
	let speechPartArr = [null, null, null, null];
	let synonymArr = [null, null, null, null];
	let definitionArr = [null, null, null, null];
	for (let i = 0; i < speechPartArr.length; i++) {
		await updateStatus("fetching definitions for word " + words[i]);
		let wordResponse = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en_US/" + words[i]);
		let wordJson = await wordResponse.json();
		console.log(wordJson);
		await updateStatus("saving part of speech for later");
		speechPartArr[i] = wordJson[0].meanings[0].partOfSpeech;
		await updateStatus("checking synonyms for word " + words[i])
		if (wordJson[0].meanings[0].definitions[0].hasOwnProperty('synonyms')) {
			await updateStatus('saving synonym for later');
			synonymArr[i] = wordJson[0].meanings[0].definitions[0].synonyms[getRandomInt(0, wordJson[0].meanings[0].definitions[0].synonyms.length-1)];
		}
		
		await updateStatus('saving definition for later');
		definitionArr[i] = wordJson[0].meanings[0].definitions[0].definition;//jsonDefine[0].shortdef[0];
		await updateStatus("saving sentence example for later");
		googleSentences[i] = wordJson[0].meanings[0].definitions[0].example;
		// console.log(googleSentences);
		// let defineResponse = await fetch("https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=" + MERRIAMWEBSTER_API_TOKEN);
		// let jsonDefine = await defineResponse.json();
		// console.log(wordJson);
	}

	for (let i = 1; i < 5; i++) {
		await updateStatus("inserting saved parts of speech into vocab sheet");
		rtfTemplateStr = rtfTemplateStr.replace("[SPEECHPART" + i + "]", speechPartArr[i-1]);
		await updateStatus("inserting saved synonyms into vocab sheet");
		rtfTemplateStr = rtfTemplateStr.replace("[SYNONYM" + i + "]", synonymArr[i-1]);
		await updateStatus("inserting saved definitions into vocab sheet");
		rtfTemplateStr = rtfTemplateStr.replace("[DEFINE" + i + "]", definitionArr[i-1]);
		
	}
}

export default handleSpeechParts