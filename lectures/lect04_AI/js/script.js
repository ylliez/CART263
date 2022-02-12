// let handpose;
// let video;
// let hands = [];
// let trailBlazer;
//
// function setup() {
//   createCanvas(640, 480);
//   video = createCapture(VIDEO);
//   video.size(width, height);
//
//   handpose = ml5.handpose(video, modelReady);
//
//   // This sets up an event that fills the global variable "predictions"
//   // with an array every time new hand poses are detected
//   handpose.on("hand", results => {
//     hands = results;
//   });
//
//   // Hide the video element, and just show the canvas
//   video.hide();
//
//   trailBlazer = createGraphics(width, height);
// }
//
// function modelReady() {
//   console.log("Model ready!");
// }
//
// function draw() {
//   image(video, 0, 0, width, height);
//
//   // We can call both functions to draw all keypoints and the skeletons
//   drawKeypoints();
//
// }
//
// // A function to draw ellipses over the detected keypoints
// function drawKeypoints() {
//   // console.log(hands);
//   // for (let i = 0; i < hands.length; i += 1) {
//   //   const hand = hands[i];
//   //   for (let j = 0; j < hand.landmarks.length; j += 1) {
//   //     const keypoint = hand.landmarks[j];
//   //     fill(0, keypoint[2], 0);
//   //     noStroke();
//   //     ellipse(keypoint[0], keypoint[1], 10, 10);
//       // console.log(keypoint[2]);
//     // }
//   // }
//   for (let i = 0; i < hands.length; i += 1) {
//     const hand = hands[i];
//     let keypoint = hand.annotations.indexFinger[3];
//     trailBlazer.push();
//     trailBlazer.fill(255,0, 0);
//     trailBlazer.noStroke();
//     trailBlazer.ellipse(keypoint[0], keypoint[1], 10, 10);
//     trailBlazer.pop();
//   }
//   image(trailBlazer, 0, 0);
// }

/**

Handpose Framework
Pippin Barr

A skeleton framework for using ml5.js's Handpose feature. Includes a
loading screen followed by a live webcam feed with a circle drawn at
the tip of the user's index finger.

*/

"use strict";

// Current state of program
let state = `loading`; // loading, running
// User's webcam
let video;
// The name of our model
let modelName = `Handpose`;
// Handpose object (using the name of the model for clarity)
let handpose;
// The current set of predictions made by Handpose once it's running
let predictions = [];
let trailBlazer;

/**
Starts the webcam and the Handpose
*/
function setup() {
  createCanvas(640, 480);

  // Start webcam and hide the resulting HTML element
  video = createCapture(VIDEO);
  video.hide();

  // Start the Handpose model and switch to our running state when it loads
  handpose = ml5.handpose(video, {
    flipHorizontal: true
  }, function() {
    // Switch to the running state
    state = `running`;
  });

  // Listen for prediction events from Handpose and store the results in our
  // predictions array when they occur
  handpose.on(`predict`, function(results) {
    predictions = results;
  });

  trailBlazer = createGraphics(width, height);
}

/**
Handles the two states of the program: loading, running
*/
function draw() {
  if (state === `loading`) {
    loading();
  }
  else if (state === `running`) {
    running();
  }
}

/**
Displays a simple loading screen with the loading model's name
*/
function loading() {
  background(255);

  push();
  textSize(32);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`Loading ${modelName}...`, width / 2, height / 2);
  pop();
}

/**
Displays the webcam.
If there is a hand it outlines it and highlights the tip of the index finger
*/
function running() {
  // Display the webcam with reveresd image so it's a mirror
  let flippedVideo = ml5.flipImage(video);
  image(flippedVideo, 0, 0, width, height);

  // Check if there currently predictions to display
  if (predictions.length > 0) {
    // Technically there will only be ONE because it only detects ONE hand
    // Get the hand predicted
    let hand = predictions[0];
    // Highlight it on the canvas
    highlightHand(hand);
  }
}

/**
Provided with a detected hand it highlights the tip of the index finger
*/
function highlightHand(hand) {
  // Display a circle at the tip of the index finger
  let index = hand.annotations.indexFinger[3];
  let indexX = index[0];
  let indexY = index[1];
  trailBlazer.push();
  trailBlazer.fill(255,0, 0);
  trailBlazer.noStroke();
  trailBlazer.ellipse(indexX, indexY, 10);
  trailBlazer.pop();
  image(trailBlazer, 0, 0);
}