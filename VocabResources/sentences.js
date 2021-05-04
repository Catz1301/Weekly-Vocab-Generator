async function handleSentences() {
	let sentence1Str = sentence1.value;
	let sentence2Str = sentence2.value;
	let sentence3Str = sentence3.value;
	let sentence4Str = sentence4.value;

	await updateStatus("checking for sentences defined by user");
	if (sentence1Str != "") {
		sentences[0] = sentence1Str;
	} else {
		sentences[0] = googleSentences[0]
	}
	if (sentence2Str != "") {
		sentences[1] = sentence2Str;
	} else {
		sentences[1] = googleSentences[1]
	}
	if (sentence3Str != "") {
		sentences[2] = sentence3Str;
	} else {
		sentences[2] = googleSentences[2]
	}
	if (sentence4Str != "") {
		sentences[3] = sentence4Str;
	} else {
		sentences[3] = googleSentences[3]
	}
	
	await updateStatus("inserting saved sentences into vocab sheet");
	for (let i = 1; i < 5; i++) {
		await updateStatus("inserting sentence " + i + " into vocab sheet");
		rtfTemplateStr = rtfTemplateStr.replace("[SENTENCE" + i + "]", sentences[i - 1]);
	}
}

export default handleSentences