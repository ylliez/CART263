"use strict";

// // Get the <h1> element by its id and store it in a variable
// let $mainHeading = $(`#main-heading`);
// // Set its color property using the .css() method
// $mainHeading.css(`color`, `#339966`);

// $(`#main-heading`).css(`color`, `#339966`);

// $(`.header`).css(`color`, `#339966`);

// // This code causes jQuery to search for every element matching .header three times
// $(`.header`).css(`color`,`red`);
// $(`.header`).css(`background-color`,`black`);
// $(`.header`).css(`font-size`,`3rem`);

// // This code causes jQuery to search for every element matching .header once
// let $headers = $(`.header`);
// $headers.css(`color`,`red`);
// $headers.css(`background-color`,`black`);
// $headers.css(`font-size`,`3rem`);

// // Get the <h1> element by its id and store it in a variable
// let $mainHeading = $(`#main-heading`);
// // Set its CSS properties using the .css() method
// $mainHeading.css(`color`, `#339966`);
// $mainHeading.css(`font-size`, `5rem`);
// $mainHeading.css(`font-family`, `Helvetica, sans-serif`);
// $mainHeading.css(`background-color`, `#000000`);

$(`#main-heading`).css({
  "color": `#339966`,
  "font-size": `5rem`,
  "font-family": `Helvetica, sans-serif`,
  "background-color": `#000000`
});
