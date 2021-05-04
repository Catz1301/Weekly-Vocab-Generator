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

export default clearImage;