// TO ADD
// Start page
// selectable redaction?
// ^\w*\s\d+:\d+\s
/* image dims: 1792*1008 */

"use strict";
let state = `title`;
// holders for grammar JSON & object
let grammarJSON, grammar;
const NUM_COMMANDS = 10;
const REVEAL_PROB = 0.01;
const ATTEMPT_FREQ = 50;
// holders for sound effects and info
let sfx = [];
const NUM_SOUNDS = 8;
// holder for diagetic text elements
let textIntro;
const END_TEXT = `
And all the people saw the thunderings, and the lightnings, and the noise of the trumpet, and the mountain smoking.
The commandments have been set in stone. Would you like a printed copy to safeguard your soul?`;

function preload() {
  grammarJSON = loadJSON('assets/data/grammar.json');
  textIntro = loadJSON('assets/data/instructions.json');
  for (let i = 0; i < NUM_SOUNDS; i++) {
    sfx[i] = loadSound(`assets/audio/sfx_holy_${i}.wav`);
  }
}

function setup() {
  // set RiTa grammar rules
  grammar = RiTa.grammar(grammarJSON);
  // set click start feature
  $('body').one(`click`, startSim);
}

function startSim() {
  $('#intro').empty();
  // $('#intro').css(`opacity`, `0`);
  $('#startClk').empty();
  // generate 10 lines following the grammar
  for (let i = 0; i < NUM_COMMANDS; i++) {
    // let id = `#cmd${i}`;
    // $(id).innerHTML = grammar.expand();
    document.getElementById(`cmd${i}`).innerHTML = grammar.expand();
  }
  // start timer for intervallic line revelation
  setInterval(revelation, ATTEMPT_FREQ);
  // set query for click action, hides & changes command
  $(`.apocrypha`).on(`click`, obfuscate);
}

//
// function draw() {
//   switch (state) {
//     case `title`: title(); break;
//     case `sim`: sim(); break;
//   }
// }

function revelation() { $(`.esoteric`).each(attemptReveal); }

function attemptReveal() {
  if (Math.random() < REVEAL_PROB) {
    random(sfx).play();
    $(this).animate( { "opacity": 1 }, 1000, checkEnd);
    $(this).removeClass(`esoteric`);
    $(this).addClass(`revealed`);
  }
}

function obfuscate() {
  $(this).animate( { "opacity": 0 }, 1000, function() {
    $(this)[0].innerHTML = grammar.expand();
  });
  $(this).removeClass(`revealed`);
  $(this).addClass(`esoteric`);
}

function checkEnd() {
  if (!$(`.esoteric`).length) {
    if(confirm(END_TEXT)) { window.print(); }
  }
}
