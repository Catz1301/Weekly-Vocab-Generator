/* import assembleSentences from './VocabResources/sentences.js';
import assembleImages from './VocabResources/images.js';
import assembleDefinitions from './VocabResources/definitions.js';*/
import downloadRTFDoc from './downloadRTFDoc.js';

import * as Vocab from './vocab.js';

async function preGenerateVocab() {
	await await updateStatus("Doing prechecks...");
	let alertStr = "";
	if (word1.value == "") {
		alertStr += "word 1 is required!\n";
	}
	if (word2.value == "") {
		alertStr += "word 2 is required!\n";
	}
	if (word3.value == "") {
		alertStr += "word 3 is required!\n";
	}
	if (word4.value == "") {
		alertStr += "word 4 is required!\n";
	}

	if (alertStr == "") {
		alertStr += "Working...";
		await generateVocab();
	}
}

async function generateVocab() {
	let word1Str = word1.value;
	let word2Str = word2.value;
	let word3Str = word3.value;
	let word4Str = word4.value;

	await updateStatus("calculating dates...")
	let date = new Date();
	let mondayDate = DateUtils.startOfWeek(date);
	let fridayDate = DateUtils.endOfWeek(date);

	rtfTemplateStr = rtfTemplateStr.replace("[DAYNUM]", "1");
	rtfTemplateStr = rtfTemplateStr.replace("[FROM]", mondayDate.getDate().toString() + '/' + (mondayDate.getMonth()+1).toString());
	rtfTemplateStr = rtfTemplateStr.replace("[TO]", fridayDate.getDate().toString() + '/' + (fridayDate.getMonth()+1).toString());

	let words = [word1Str, word2Str, word3Str, word4Str];
	
	await updateStatus("inserting words into vocab sheet");
	for (let i = 1; i < 5; i++) {
		rtfTemplateStr = rtfTemplateStr.replace("[WORD" + i + "]", words[i - 1]);
	}

	// console.log(words);
	// console.log("rtfTemplateStr after adding words: " + rtfTemplateStr.length);
	await updateStatus("assembling definitions");
	await Vocab.assembleDefinitions(words);
	await updateStatus("assembling sentences");
	await Vocab.assembleSentences();

	await updateStatus("assembling images");
	var rtfPictureElementArr = await Vocab.assembleImages();

	await updateStatus("inserting images into vocab sheet");
	for (let i = 1; i < 5; ++i) {
		let rtfPictureElementTemplate = "[IMAGE" + i + "]";
		let rtfPictureElement = rtfPictureElementArr[i - 1]
		if (rtfPictureElement != null) {
			rtfPictureElementTemplate = rtfPictureElement
		}
		rtfTemplateStr = rtfTemplateStr.replace("[IMAGE" + i + "]", rtfPictureElementTemplate);
	}

	//outputBox.value = rtfTemplateStr; // <-- Crashes page
	await updateStatus("downloading vocab sheet");
	await downloadRTFDoc();
	await updateStatus("Done.")
}

export {preGenerateVocab as preGenVocab};