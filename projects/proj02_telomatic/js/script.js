"use strict";

/* general */
// program state (load, sim)
let state = `load`;
// holder for webcam input
let video;
// holders for output graphics display
let trailBlazer;

/* ml5 */
// holder for Handpose model
let handpose;
// holder for Handpose model results
let predictions = [];
// holder for hand object to manipulate Handpose data
let hand;

/* ble */
// UUID address of actuating microcontroller
const TELO_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
// holder for BLE object
let teloBLE
// holder for BLE characteristic
let teloCharacteristic
// holder for value to send to BLE
let teloIntensity;

// SETUP: initialize canvas, video and model
function setup() {
  createCanvas(640,480);

  // start webcam and hide the resulting HTML element
  video = createCapture(VIDEO);
  video.hide();

  // instantiate hand object to manipulate Handpose data
  hand = new Hand();

  // initialize model, switch to simulation state upon load
  handpose = ml5.handpose(video, { flipHorizontal: true }, () => { state = `sim`; } );
  // start Handpose model, store prediction events in array if applicable
  handpose.on(`predict`, (results) => { predictions = results; } );

  // instantiate graphics element
  trailBlazer = createGraphics(width, height);

  // instantiate ble
  teloBLE = new p5ble();
}

// connect to device by passing the service UUID
function connectToBLE() {
  teloBLE.connect(TELO_UUID, gotCharacteristics);
}

function gotCharacteristics(error, characteristics) {
  // print connection error, if applicable
  if (error) console.log('error: ', error);
  console.log('characteristics: ', characteristics);
  // Set the first characteristic as myCharacteristic
  teloCharacteristic = characteristics[0];
}

function disconnectFromBLE() {
  teloBLE.write(teloCharacteristic, 0);
  teloBLE.disconnect();
}

// DRAW: handle program state
function draw() {
  switch (state) {
    case `load`: load(); break;
    case `sim`: sim(); break;
  }
}

// Display loading screen
function load() {
  background(255);
  push();
  textSize(32);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`LOADING...`, height / 2, width / 2);
  pop();
}

// SIM: update hand predictions and draw index finger tip to screen
function sim() {
  // DEBUG - display mirrored video feed
  image(ml5.flipImage(video), 0, 0, width, height);

  if (predictions.length > 0) {
    hand.coordinates = predictions[0];
    hand.coordinate();
  }
  drawIndexTip();
  writeToBLE();
}

// draw path following index finger tip
function drawIndexTip() {
  trailBlazer.push();
  trailBlazer.stroke(255,0,0);
  trailBlazer.strokeWeight(3);
  // console.log(`${hand.prev.x}, ${hand.prev.y}, ${hand.index.x}, ${hand.index.y}`);
  trailBlazer.line(hand.indexGhost.x, hand.indexGhost.y, hand.index.x, hand.index.y);
  trailBlazer.pop();
  image(trailBlazer, 0, 0);
}

function writeToBLE() {
  if (teloBLE.isConnected() && teloCharacteristic) {
    teloIntensity = hand.index.y;
    teloBLE.write(teloCharacteristic, teloIntensity);
  }
}

function keyPressed() {
  // 'c' key toggled connection
  if (keyCode === 67) {
    if (!teloBLE.isConnected()) { connectToBLE(); }
    else { disconnectFromBLE(); }
  }
}
