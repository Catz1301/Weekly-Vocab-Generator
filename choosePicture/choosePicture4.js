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

export default choosePicture4;