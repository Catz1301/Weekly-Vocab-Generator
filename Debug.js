class Debug {
	static test = function() {
		(async () => await Debug._fullUnitTest())();
	}
	static _fullUnitTest = async function() {
		word1.value = "Tree";
		word2.value = "Cat";
		word3.value = "Meow";
		word4.value = "Forest";
		sentence2.value = "The four-legged creature with a tail is called a cat.";
		await loadPicker();
	}
	static fullTest = function() {
		(async () => {
			await Debug._fullUnitTest();
			await Debug._populatePictures()
		})();
	}

	static _populatePictures = async function() {
		pictures = [
			{
				"pictureURL": "https://live.staticflickr.com/3905/14675770684_7bac94d7c2_b.jpg",
				"pictureData": null,
				"pictureObj": {
					"width": 1024,
					"height": 576,
					"data": null
				},
				"pictureDim": {
					"width": 1024,
					"height": 576
				},
				"pictureBlob": null,
				"alternativePicture": {
					"pictureURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRboPQqxOIzWTKJElswkdWTshVP0wXOOs7mTvm-itSsQw9YpbynJUbezjM&s",
					"pictureDim": {
						"width": 150,
						"height": 84
					}
				}
			},
			{
				"pictureURL": "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?cs=srgb&dl=pexels-kelvin-valerio-617278.jpg&fm=jpg",
				"pictureData": null,
				"pictureObj": {
					"width": 4928,
					"height": 3264,
					"data": null
				},
				"pictureDim": {
					"width": 4928,
					"height": 3264
				},
				"pictureBlob": null,
				"alternativePicture": {
					"pictureURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTYciWtdgbpIYJmX2_VoIcFYFBEfXFEHd5K3mRxDJp00H97o_vBEPo5Q&s",
					"pictureDim": {
						"width": 150,
						"height": 99
					}
				}
			},
			{
				"pictureURL": "https://cdn.pixabay.com/photo/2014/09/27/15/33/cat-463794_960_720.jpg",
				"pictureData": null,
				"pictureObj": {
					"width": 148,
					"height": 111,
					"data": null
				},
				"pictureDim": {
					"width": 960,
					"height": 720
				},
				"pictureBlob": null,
				"alternativePicture": {
					"pictureURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqN2a7Gxjb3Wik6Z-qbS1OgDOaz7hMIisMhzW03miR6X6vEzgWyiCJ8g&s",
					"pictureDim": {
						"width": 148,
						"height": 111
					}
				}
			},
			{
				"pictureURL": "https://images.pexels.com/photos/1996051/pexels-photo-1996051.jpeg?cs=srgb&dl=pexels-johannes-plenio-1996051.jpg&fm=jpg",
				"pictureData": null,
				"pictureObj": {
					"width": 6000,
					"height": 4000,
					"data": null
				},
				"pictureDim": {
					"width": 6000,
					"height": 4000
				},
				"pictureBlob": null,
				"alternativePicture": {
					"pictureURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-JgdznWHXl4NeJIaeAn_iQ9jisZzk-X8gQManDe-_tCggkrsYaf3_Sg&s",
					"pictureDim": {
						"width": 150,
						"height": 100
					}
				}
			}
		];

		for (let i = 0; i < 4; i++) {
			var img = document.createElement("img");
			img.src = pictures[i].pictureURL;
			//img; //.crossOrigin = "Anonymous";
			img.width = pictures[i].alternativePicture.pictureDim.width;
			img.height= pictures[i].alternativePicture.pictureDim.height;
			let pictureResult = document.getElementById("picture" + (i+1) + "Result");
			if (pictureResult) {
				pictureResult.style.display = "block";
				pictureResult.append(img);
			}
		}
	}
}