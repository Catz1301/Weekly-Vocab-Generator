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

export default choosePicture1;