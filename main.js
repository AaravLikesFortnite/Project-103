Webcam.set({
    height:300,
    width:350,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='capture_image' src="+data_uri+">";
    }
    );
}
console.log('ml5 version:',ml5.version);

var classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/jD3H-X2KF/model.json',modelLoaded);

function modelLoaded(){
    console.log("Huzzah! The model loaded!");   
}

function check(){
    img=document.getElementById("capture_image");
    classifier.classify(img,got_result);
}

function got_result(error,result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        document.getElementById("result_object_name").innerHTML=result[0].label;
        document.getElementById("result_object_accuracy").innerHTML=result[0].confidence.toFixed(3);
    }
}
