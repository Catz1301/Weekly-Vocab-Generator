import {preGenVocab as genVocab} from '/vocabGeneration.js';

async function main() {
	statusText.style.display = "inline";
	
	console.log("In an async function!");
	await updateStatus("generating vocab");
	await genVocab();
}


/*
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
*/

export default main;