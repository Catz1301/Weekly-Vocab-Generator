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

export default choosePicture2;