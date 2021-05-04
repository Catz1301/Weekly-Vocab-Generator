// The Browser API key obtained from the Google API Console.
// Replace with your own Browser API key, or your own key.
var developerKey = 'AIzaSyDumkc5N8MbINDPdNvNmBQygRkPP4XBme0';

// The Client ID obtained from the Google API Console. Replace with your own Client ID.
var clientId = "62124354117-qecrl0icoca3h3u656lu053apq4s8j7f.apps.googleusercontent.com"

// Replace with your own project number from console.developers.google.com.
// See "Project number" under "IAM & Admin" > "Settings"
var appId = "62124354117";

// Scope to use to access user's Drive items.
var scope = ['https://www.googleapis.com/auth/drive.file'];

var pickerApiLoaded = false;
var oauthToken;

// Use the Google API Loader script to load the google.picker script.
async function loadPicker() {
	console.log(window.location.host + "== replit.com: " + (window.location.host == "replit.com"));
	if (window.location.host != "replit.com") {
		gapi.load('auth', {'callback': onAuthApiLoad});
		gapi.load('picker', {'callback': onPickerApiLoad});
	}
}

async function onAuthApiLoad() {
	if (window.location.host !== "replit.com") {
		window.gapi.auth.authorize(
				{
					'client_id': clientId,
					'scope': scope,
					'immediate': false
				},
				handleAuthResult);
	}
}

async function onPickerApiLoad() {
	pickerApiLoaded = true;
	console.log(window.gapi.auth);
	//createPicker();
}

async function handleAuthResult(authResult) {
	if (authResult && !authResult.error) {
		oauthToken = authResult.access_token;
		//createPicker();
		loggedIn = true;
	}
}

// Create and render a Picker object for searching images.
function createPicker(obj) {
	if (pickerApiLoaded && oauthToken) {
		let photoUploadView = new google.picker.View(google.picker.ViewId.PHOTO_UPLOAD);
		let imageSearchView = new google.picker.ImageSearchView();
		let photosView = new google.picker.PhotosView();
		imageSearchView.setQuery(obj.query);
		photoUploadView.setMimeTypes("image/png,image/jpeg,image/jpg");
		var picker = new google.picker.PickerBuilder()
				.setAppId(appId)
				.setOAuthToken(oauthToken)
				.addView(imageSearchView)
				.addView(photosView)
				.addView(photoUploadView)
				.setOrigin(window.location.protocol + '//' + window.location.host)
				//.setRelayUrl(relayURL)
				.setDeveloperKey(developerKey)
				.setCallback(pickerCallback)
				.build();
			picker.setVisible(true);
	}
}

// A simple callback implementation.
function pickerCallback(data) {
	if (data.action == google.picker.Action.PICKED) {
		console.dir(data);
		var fileId = data.docs[0].id;
		let fullSizePicURL = data.docs[0].thumbnails[1].url;
		let fullSizePicHeight = data.docs[0].thumbnails[1].height;
		let fullSizePicWidth = data.docs[0].thumbnails[1].width;
		let alternatePicURL = data.docs[0].thumbnails[0].url;
		let alternatePicHeight = data.docs[0].thumbnails[0].height;
		let alternatePicWidth = data.docs[0].thumbnails[0].width;

		addPicture("picture" + currentPicture + "Result", data);
		// fullSize picture properties;
		pictures[currentPicture-1].pictureURL = fullSizePicURL;
		pictures[currentPicture-1].pictureDim.width = fullSizePicWidth;
		pictures[currentPicture-1].pictureDim.height = fullSizePicHeight;

		// alternate picture properties;
		pictures[currentPicture-1].alternativePicture.pictureURL = alternatePicURL;
		pictures[currentPicture-1].alternativePicture.pictureDim.width = alternatePicWidth;
		pictures[currentPicture-1].alternativePicture.pictureDim.height = alternatePicHeight;
	}
}

function addPicture(section, data) {
	let img = document.createElement("img");
	img.src = data.docs[0].thumbnails[1].url;
	//img; //.crossOrigin = "Anonymous";
	img.width = data.docs[0].thumbnails[0].width;
	img.height= data.docs[0].thumbnails[0].height;
	img.id = section + "Image";
	img.setAttribute('onclick', "clearImage(currentPicture)");
	let pictureResult = document.getElementById(section);
	if (pictureResult) {
		pictureResult.style.display = "block";
		pictureResult.append(img);
		let image = document.getElementById(section + "Image");
		// image.addEventListener('click', function() {
		// 	clearImage(currentPicture);
		// })
		var doc = data[google.picker.Response.DOCUMENTS][0];
		let url = doc[google.picker.Document.URL];
	} else {
		alert("Picture section does not exist! Contact the developer.");
	}
	// var message = 'You picked: ' + data.docs[0].url;
	// document.getElementById('result').innerHTML = message;
}