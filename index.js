const img = document.getElementById('img');
const button = document.getElementById('next');
const result = document.getElementById('prediction');
result.style.display = 'none';



const fileInput = document.getElementById('fileInput');
const imageElement = document.getElementById('camera--output');
const targetInput = document.getElementById('image_url');
  
        fileInput.addEventListener('change', function() {
          const file = fileInput.files[0];
          const reader = new FileReader();
          reader.onload = function(e) {
            imageElement.src = e.target.result;
            targetInput.value = e.target.result;
          }
          reader.readAsDataURL(file);
          result.style.display = 'block'
          result.innerText = 'Loading...'
          doPrediction();
        });


let model;


button.onclick = () => {
    cameraOutput.src = '//:0'
}


// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
    
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
    result.style.display = 'block'
    result.innerText = 'Loading...'
    doPrediction();
};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);

        function doPrediction() {
            if( model ) {
                model.classify(cameraOutput).then(predictions => {
                    showPrediction(predictions);
                });
            } else {
                mobilenet.load().then(_model => {
                    model = _model;
                    model.classify(cameraOutput).then(predictions => {
                        showPrediction(predictions);
                    });
                });
            }
        }

        function showPrediction(predictions) {
            result.innerText = "This might be a " + predictions[0].className;
        }