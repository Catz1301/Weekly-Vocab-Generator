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
		await updateStatus("setting rtf image properties for alternate image");
		twipRatio = (72 / ppi) * 20;
		twipWidth = Math.round(imgObj.width * twipRatio);
		twipHeight = Math.round(imgObj.height * twipRatio);
		console.log("Using alt; x=%d, y=%d", twipWidth, twipHeight);
	} else {
		await updateStatus("setting rtf image properties");
		twipRatio = (72 / ppi) * 20;
		let maxWidth = 200,
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
	await updateStatus("turning stuff into strings...");
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

// returns a hex string(?) of buffer's contents
async function buf2hex(buffer) { // buffer is an ArrayBuffer
	await updateStatus("doing black magic...");
	return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

async function getRemoteBlob(url) {
	console.log(url);
	await updateStatus("fetching image at " + url);
	var response = await fetch(url, {
		type: 'no-cors' // no-cors, *cors, same-origin
	});
	await updateStatus("getting blob from fetch results");
	var blob = await response.blob();
	console.log(blob);
	return blob;
}

// Returns string containing img at url's hexidecimal data.
async function getHexDataImage(url) {
	let hexDataStr;
	try {
		await updateStatus("getting blob of image at " + url);
		let b = await getRemoteBlob(url); // fetches img blob

		await updateStatus("getting buffer of image blob");
		let arrayBuffer = await b.arrayBuffer(); // get ArrayBuffer from blob;
		await updateStatus("converting buffer into string");
		hexDataStr = String(await buf2hex(arrayBuffer)); // converts hex data of arrayBuffer to string
	} catch (e) {
		console.error(e);
		hexDataStr = "useAlt";
	}
	console.debug(hexDataStr);
	return hexDataStr;
}

async function buildRTFImageElement(pictureNum) {
	let useAlt = false;
	let pictureEle = null;
	if (pictures[pictureNum].pictureURL != null) {
		await updateStatus("getting binary data for picture " + pictureNum);
		pictures[pictureNum].pictureData = await getHexDataImage(pictures[pictureNum].pictureURL);
		if (pictures[pictureNum].pictureData == "useAlt") {
			await updateStatus("getting binary data for alernate picture " + pictureNum);
			useAlt = true;
			pictures[pictureNum].pictureData = await getHexDataImage(pictures[pictureNum].alternativePicture.pictureURL);
			if (pictures[pictureNum].pictureData == "useAlt") {
				console.warn("Could not use picture ", pictureNum+1);
				await updateStatus("Giving up on getting binary data for picture " + pictureNum);
				pictures[pictureNum].pictureData = null;
			}
		}
	}
	
	if (pictures[pictureNum].pictureData != null) {
		if (useAlt == false) {
			await updateStatus("building an object for picture " + pictureNum);
			pictures[pictureNum].pictureObj = await buildImgObj(pictures[pictureNum].pictureData, pictures[pictureNum].pictureDim.width, pictures[pictureNum].pictureDim.height);
		} else {
			await updateStatus("building an object for alternate picture " + pictureNum);
			pictures[pictureNum].pictureObj = await buildImgObj(pictures[pictureNum].pictureData, pictures[pictureNum].alternativePicture.pictureDim.width, pictures[pictureNum].alternativePicture.pictureDim.height);
		}
	}

	if (pictures[pictureNum].pictureObj != null) {
		await updateStatus("building an rtf image element and magically turning it into a string... ZAP!\nWhoops!");
		pictureEle = await buildRTFImageElementStr(pictures[pictureNum].pictureObj, useAlt);
	}
	return pictureEle;
}


async function dealWithPictures() {
	await updateStatus("dealing with pictures");
	for (let i = 0; i < 4; i++) {
		await updateStatus("building rtf element for picture " + i);
		pictureEles[i] = await buildRTFImageElement(i);
	}
	return pictureEles;
}

export default dealWithPictures