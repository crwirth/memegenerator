var topInput = document.getElementById('topText');
var bottomInput = document.getElementById('bottomText');

window.topText = "";
window.bottomText = "";

topInput.oninput = textChangeListener;
bottomInput.oninput = textChangeListener;


document.getElementById("file").addEventListener("change", handleFileSelect);
document.getElementById("saveBtn").addEventListener("click", saveFile);

function redrawMeme(image, topText, bottomText) {
	var c = document.getElementById("c");
	var ctx = c.getContext("2d");
	
	
	ctx.drawImage(image, 0, 0, 400, 400);
	
	ctx.textAlign = "center"
	ctx.strokeStyle = "black";
	ctx.fillStyle = "white";
	ctx.lineWidth = 6;
	
	
	if (topText.length < 15) {
		ctx.font = "60px impact";
	} else if (topText.length < 24) {
		ctx.font = "40px impact";
	} else {
		ctx.font = "20px impact";
	}
	ctx.textBaseline = "top";
	ctx.strokeText(topText, 200, 10);
	ctx.fillText(topText, 200, 10);
	
	if (bottomText.length < 15) {
		ctx.font = "60px impact";
	} else if (bottomText.length < 24) {
		ctx.font = "40px impact";
	} else {
		ctx.font = "20px impact";
	}
	ctx.textBaseline = "bottom";
	ctx.strokeText(bottomText, 200, 390);
	ctx.fillText(bottomText, 200, 390);
}



function textChangeListener (evt) {
	
	var id = evt.target.id;
	var text = evt.target.value;
	
	
	if (id == "topText") {
		window.topText = text;
	} else {
		window.bottomText = text;
	}
	redrawMeme(window.imageSrc, window.topText, window.bottomText);
}



function handleFileSelect(evt) {
	var canvasWidth = 400;
	var canvasHeight = 400;
	
	var file = evt.target.files[0];
	
	
	var reader = new FileReader();
	
	reader.onload = function(fileObject) {
		
		var data = fileObject.target.result;
		
		
		var image = new Image();
		image.onload = function() {
			window.imageSrc = this;
			redrawMeme(window.imageSrc, window.topText, window.bottomText);
		}
		
		image.src = data;
		console.log(fileObject.target.result);
	};
	
	reader.readAsDataURL(file);
}

function saveFile() {
	
	
	var url = document.querySelector("canvas").toDataURL();
	var img = "<title>My Meme</title><img src='" + url + "'></img>";
	var openWin = window.open();
	openWin.document.open();
	openWin.document.write(img);
	openWin.document.close();
}