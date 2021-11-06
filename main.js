song1 = "";
song2 = "";
song_status = "";
leftWristX = 0;
leftWristY = 0;
leftWristscore = 0;
rightWristX = 0;
rightWristY = 0;

function preload(){
song1 = loadSound("Jamaica-Farewell.mp3");
song2 = loadSound("Country-Roads.mp3");
}

function setup(){
canvas = createCanvas(600,500);
canvas.center();

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses)
}

function modelLoaded(){
console.log("PoseNet is initialized");
}

function gotPoses(results){
if(results.length > 0){
console.log(results);

leftWristscore = results[0].pose.keypoints[9].score;
console.log("Left Wrist Score is- " + leftWristscore);

leftWristX = results[0].pose.leftWrist.x;
leftWristY = results[0].pose.leftWrist.y;
console.log("Left wrist x is " + leftWristX + " left wrist y is " + leftWristY);

rightWristX = results[0].pose.rightWrist.x;
rightWristY = results[0].pose.rightWrist.y;
console.log("Right wrist x is " + rightWristX + " right wrist y is " + rightWristY);
}
}

function draw(){
image(video, 0, 0, 600, 500);
    
fill('green');
stroke('green');
    
if(leftWristscore > 0.2){
circle(leftWristX, leftWristY, 20);
song2.stop();
song1.play();
song_status = "true";
}
    
if(song_status == "true"){
document.getElementById("song_name").innerHTML = "Playing Song- Jamaica Farewell";
}
}