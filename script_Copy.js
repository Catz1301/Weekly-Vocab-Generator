function clearImage(imgNum) {
	let inputSect = document.getElementById('wordInputSect');
	let imgs = inputSect.getElementsByTagName('img');
	let img = imgs[imgNum-1];
	if (img) {
		img.parentElement.style.display = 'none';
		img.remove();
	}
	pictures[imgNum - 1] = picturesArrElTemplate;
}


async function preGenerateVocab() {
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

	let sentence1Str = sentence1.value;
	let sentence2Str = sentence2.value;
	let sentence3Str = sentence3.value;
	let sentence4Str = sentence4.value;

	let date = new Date();
	let mondayDate = DateUtils.startOfWeek(date);
	let fridayDate = DateUtils.endOfWeek(date);

	rtfTemplateStr = rtfTemplateStr.replace("[DAYNUM]", "1");
	rtfTemplateStr = rtfTemplateStr.replace("[FROM]", mondayDate.getDate().toString() + '/' + (mondayDate.getMonth()+1).toString());
	rtfTemplateStr = rtfTemplateStr.replace("[TO]", fridayDate.getDate().toString() + '/' + (fridayDate.getMonth()+1).toString());

	let words = [word1Str, word2Str, word3Str, word4Str];
	
	for (let i = 1; i < 5; i++) {
		rtfTemplateStr = rtfTemplateStr.replace("[WORD" + i + "]", words[i - 1]);
	}

	// console.log(words);
	// console.log("rtfTemplateStr after adding words: " + rtfTemplateStr.length);
	await handleSpeechParts(words);

	var rtfPictureElementArr = await dealWithPictures();

	for (let i = 1; i < 5; ++i) {
		let rtfPictureElementTemplate = "[IMAGE" + i + "]";
		let rtfPictureElement = rtfPictureElementArr[i - 1]
		if (rtfPictureElement != null) {
			rtfPictureElementTemplate = rtfPictureElement
		}
		rtfTemplateStr = rtfTemplateStr.replace("[IMAGE" + i + "]", rtfPictureElementTemplate);
	}

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
	
	for (let i = 1; i < 5; i++) {
		rtfTemplateStr = rtfTemplateStr.replace("[SENTENCE" + i + "]", sentences[i - 1]);
	}
	//outputBox.value = rtfTemplateStr; // <-- Crashes page
	await downloadRTFDoc();
}

async function main() {
	console.log("In an async function!");
	await preGenerateVocab();
}

function choosePicture1() {
	if (!loggedIn) {
		alert("You must first sign in to do that!");
	} else {
		currentPicture = 1;
		var pictureUrl = "";
		
		let pickerArgObj = {
			query: word1.value,
			currentPicture
		};
		createPicker(pickerArgObj);
	}
}

function choosePicture2() {
	if (!loggedIn) {
		alert("You must first sign in to do that!");
	} else {
		currentPicture = 2;
		var pictureUrl = "";
		
		let pickerArgObj = {
			query: word2.value,
			currentPicture
		};
		createPicker(pickerArgObj);
	}
}

function choosePicture3() {
	if (!loggedIn) {
		alert("You must first sign in to do that!");
	} else {
		currentPicture = 3;
		var pictureUrl = "";
		
		let pickerArgObj = {
			query: word3.value,
			currentPicture
		};
		createPicker(pickerArgObj);
	}
}

function choosePicture4() {
	if (!loggedIn) {
		alert("You must first sign in to do that!");
	} else {
		currentPicture = 4;
		var pictureUrl = "";
		
		let pickerArgObj = {
			query: word4.value,
			currentPicture
		};
		createPicker(pickerArgObj);
	}
}

async function buildRTFImageElement(pictureNum) {
	let useAlt = false;
	let pictureEle = null;
	if (pictures[pictureNum].pictureURL != null) {
		pictures[pictureNum].pictureData = await getHexDataImage(pictures[pictureNum].pictureURL);
		if (pictures[pictureNum].pictureData == "useAlt") {
			useAlt = true;
			pictures[pictureNum].pictureData = await getHexDataImage(pictures[pictureNum].alternativePicture.pictureURL);
			if (pictures[pictureNum].pictureData == "useAlt") {
				console.warn("Could not use picture ", pictureNum+1);
				pictures[pictureNum].pictureData = null;
			}
		}
	}
	
	if (pictures[pictureNum].pictureData != null) {
		if (useAlt == false) {
			pictures[pictureNum].pictureObj = await buildImgObj(pictures[pictureNum].pictureData, pictures[pictureNum].pictureDim.width, pictures[pictureNum].pictureDim.height);
		} else {
			pictures[pictureNum].pictureObj = await buildImgObj(pictures[pictureNum].pictureData, pictures[pictureNum].alternativePicture.pictureDim.width, pictures[pictureNum].alternativePicture.pictureDim.height);
		}
	}

	if (pictures[pictureNum].pictureObj != null) {
		pictureEle = await buildRTFImageElementStr(pictures[pictureNum].pictureObj, useAlt);
	}
	return pictureEle;
}

async function dealWithPictures() {
	for (let i = 0; i < 4; i++) {
		pictureEles[i] = await buildRTFImageElement(i);
	}
	/* if (pictures[0].pictureURL != null) {
		pictures[0].pictureData = await getHexDataImage(pictures[0].pictureURL);
	}
	if (pictures[1].pictureURL != null) {
		pictures[1].pictureData = await getHexDataImage(pictures[1].pictureURL);
	}
	if (pictures[2].pictureURL != null) {
		pictures[2].pictureData = await getHexDataImage(pictures[2].pictureURL);
	}
	if (pictures[3].pictureURL != null) {
		pictures[3].pictureData = await getHexDataImage(pictures[3].pictureURL);
	}

	if (pictures[0].pictureData != null) {
		pictures[0].pictureObj = await buildImgObj(pictures[0].pictureObj, picture1Dim.width, picture1Dim.height);
	}
	if (pictures[1].pictureData != null) {
		pictures[1].pictureObj = await buildImgObj(pictures[1].pictureObj, picture1Dim.width, picture1Dim.height);
	}
	if (pictures[2].pictureData != null) {
		pictures[2].pictureObj = await buildImgObj(pictures[2].pictureObj, picture2Dim.width, picture2Dim.height);
	}
	if (pictures[3].pictureData != null) {
		pictures[3].pictureObj = await buildImgObj(pictures[3].pictureObj, picture3Dim.width, picture3Dim.height);
	}

	if (pictureObjs[0] != null) {
		pictureEles[0] = await buildRTFImageElementStr(pictureObjs[0]);
	}
	if (pictureObjs[1] != null) {
		pictureEles[1] = await buildRTFImageElementStr(pictureObjs[1]);
	}
	if (pictureObjs[2] != null) {
		pictureEles[2] = await buildRTFImageElementStr(pictureObjs[2]);
	}
	if (pictureObjs[3] != null) {
		pictureEles[3] = await buildRTFImageElementStr(pictureObjs[3]);
	} */

	return pictureEles;
}

async function getRemoteBlob(url) {
	console.log(url);
	var response = await fetch(url, {
		type: 'no-cors' // no-cors, *cors, same-origin
	});
	var blob = await response.blob();
	console.log(blob);
	return blob;
}

// returns a hex string(?) of buffer's contents
function buf2hex(buffer) { // buffer is an ArrayBuffer
	return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

// Returns string containing img at url's hexidecimal data.
async function getHexDataImage(url) {
	let hexDataStr;
	try {
		let b = await getRemoteBlob(url); // fetches img blob
		// if (pictNum == 1) {
		// 	picture1Blob = b;
		// }
		// else if (pictNum == 2) {
		// 	picture2Blob = b;
		// }
		// else if (pictNum == 3) {
		// 	picture3Blob = b;
		// }
		// else if (pictNum == 4) {
		// 	picture4Blob = b;
		// }

		let arrayBuffer = await b.arrayBuffer(); // get ArrayBuffer from blob;
		hexDataStr = String(buf2hex(arrayBuffer)); // converts hex data of arrayBuffer to string
	} catch (e) {
		console.error(e);
		hexDataStr = "useAlt";
	}
	console.debug(hexDataStr);
	return hexDataStr;
}

async function buildImgObj(data, width, height) {
	return {
		width,
		height,
		data
	};
}

async function buildRTFImageElementStr(imgObj, usingAlt) {
	let ppi = 96;
	var twipRatio,
			twipWidth,
			twipHeight;
	if (usingAlt) {
		twipRatio = (72 / ppi) * 20;
		twipWidth = Math.round(imgObj.width * twipRatio);
		twipHeight = Math.round(imgObj.height * twipRatio);
		console.log("Using alt; x=%d, y=%d", twipWidth, twipHeight);
	} else {
		twipRatio = (72 / ppi) * 20;
		let maxWidth = 200
				maxHeight = Infinity,
				srcWidth = imgObj.width*twipRatio,
				srcHeight = imgObj.height*twipRatio;
		let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
		console.log(ratio);
		twipWidth = (Math.round(srcWidth * ratio) * twipRatio);
		twipHeight = (Math.round(srcHeight * ratio) * twipRatio);
		console.log("Not using alt; x=%d, y=%d", twipWidth, twipHeight);
	}
	console.log(imgObj.width, imgObj.height);
	// var twipWidth = Math.round(imgObj.width * twipRatio),
	// 	twipHeight = Math.round(imgObj.height * twipRatio);

	//output image information
	let picTypeBlip = '';
	if (imgObj.data.toLowerCase().substr(0, 4) == "ffd8")
		picTypeBlip = 'jpegblip';
	else
		picTypeBlip = 'pngblip';
	var output = '{\\pict\\' + picTypeBlip + '\\picw' + imgObj.width + '\\pich' + imgObj.height + '\\picwgoal' + twipWidth + '\\pichgoal' + twipHeight + ' ';
	output += imgObj.data;
	output += '}'
	return output;
}

async function downloadRTFDoc() {
	let blob = new Blob([rtfTemplateStr]);
	let file = new File([blob], "testFile.rtf");
	let adownloadEl = document.createElement('a');
	adownloadEl.id = "downloadEl";
	adownloadEl.download = file.name;
	let fileObjectURL = URL.createObjectURL(file);
	adownloadEl.href = fileObjectURL;
	document.body.append(adownloadEl);
	let adownload = document.getElementById('downloadEl');
	adownload.click();
	adownload.remove();
	URL.revokeObjectURL(fileObjectURL);
}

async function hex2blob(hexdata) {
	var byteArray = new Uint8Array(hexdata.length / 2);
	for (var x = 0; x < byteArray.length; x++) {
		byteArray[x] = parseInt(hexdata.substr(x * 2, 2), 16);
	}

	var blob = new Blob([byteArray], { type: "application/octet-stream" });
	return blob;
}

async function hex2File(hexData, name) {
	let b = await hex2blob(hexData);
	return new File([b], name);
}

async function handleSpeechParts(words) {
	let speechPartArr = [null, null, null, null];
	let synonymArr = [null, null, null, null];
	let definitionArr = [null, null, null, null];
	for (let i = 0; i < speechPartArr.length; i++) {
		let wordResponse = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en_US/" + words[i]);
		let wordJson = await wordResponse.json();
		console.log(wordJson);
		speechPartArr[i] = wordJson[0].meanings[0].partOfSpeech;
		if (wordJson[0].meanings[0].definitions[0].hasOwnProperty('synonyms')) {
			synonymArr[i] = wordJson[0].meanings[0].definitions[0].synonyms[getRandomInt(0, wordJson[0].meanings[0].definitions[0].synonyms.length-1)];
		}
		
		definitionArr[i] = wordJson[0].meanings[0].definitions[0].definition;//jsonDefine[0].shortdef[0];
		googleSentences[i] = wordJson[0].meanings[0].definitions[0].example;
		// let defineResponse = await fetch("https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=" + MERRIAMWEBSTER_API_TOKEN);
		// let jsonDefine = await defineResponse.json();
		// console.log(jsonDefine);
	}

	for (let i = 1; i < 5; i++) {
		rtfTemplateStr = rtfTemplateStr.replace("[SPEECHPART" + i + "]", speechPartArr[i-1]);
		rtfTemplateStr = rtfTemplateStr.replace("[SYNONYM" + i + "]", synonymArr[i-1]);
		rtfTemplateStr = rtfTemplateStr.replace("[DEFINE" + i + "]", definitionArr[i-1]);
		
	}
}

function getRandomInt(min = 1, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}