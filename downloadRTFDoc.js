export default async function downloadRTFDoc() {
	await updateStatus("saving rtf string as blob");
	let blob = new Blob([rtfTemplateStr]);
	await updateStatus("creating a file from rtf string blob");
	let file = new File([blob], "testFile.rtf");
	await updateStatus("creating link for automatic download");
	let adownloadEl = document.createElement('a');
	adownloadEl.id = "downloadEl";
	adownloadEl.download = file.name;
	await updateStatus("creating special object url for file");
	let fileObjectURL = URL.createObjectURL(file);
	adownloadEl.href = fileObjectURL;
	await updateStatus("adding automatic download link to page");
	document.body.append(adownloadEl);
	let adownload = document.getElementById('downloadEl');
	await updateStatus("activating download link");
	adownload.click();
	adownload.remove();
	await updateStatus("remove special object url for security")
	URL.revokeObjectURL(fileObjectURL);
}