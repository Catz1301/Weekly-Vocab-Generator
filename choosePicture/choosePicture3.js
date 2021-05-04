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

export default choosePicture3;