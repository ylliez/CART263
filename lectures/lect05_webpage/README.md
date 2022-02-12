# CART263 - Lecture 05 - The Webpage
## HTML
**H**yper **T**ext **M**arkup **L**anguage is used to define and structure the content of a webpage.<br>
HTML functions in a linear and hierarchical fashion.<br>
Uses markup tags (e.g. `<html>`, `<p>`, `<img>`) with attributes (e.g. `src=`, `href=`).<br>
Some markup tags are purely structural (e.g. `<div>`, `<nav>`, `<header>`, `<section>`, `<article>`, `<aside>`, `<footer>`)
Stored in text file with extension `.html` or `.htm`.<br>
The landing page of a specific folder is usually `index.html`.<br>
### Formatting
```
<!--  -->
<!DOCTYPE html>  <!-- obligatory document type declaration -->
<html>  <!-- container for entire content -->

  <head>  <!-- undisplayed webpage information (e.g. title, css, js, meta) -->
    <title>Title of webpage</title>  <!-- title appearing on browser and bookmark -->
  </head>  <!-- usually obligatory tag closure using </tag_name> -->

  <body>  <!-- webpage content -->

    <div>  <!-- invisible structuring tag -->
      <p>A paragraph of text. </p>  <!-- plain text -->
      <p>Another paragraph of text. </p>
    </div>

    <header>  <!-- more specific structuring tag -->
      <h1>Main heading</h1>  <!-- heading specified by level; h1 (top-level) -> h6 -->
    </header>

    <section>
      <h2>Sub-heading</h2>
      <p>An <em>emphasized</em> word.</p>  <!-- <em> for emphasis, default italicized -->
      <p>An <strong>strong</strong> word.</p>  <!-- <strong> for importance, default bolded -->
    </section>

    <section>
      <h2>Another sub-heading</h2>

      <h3>A sub-sub-heading</h3>
      <p>A <a href="https://thi.cc/">thicc link</a>.</p>  <!-- a hypertext link -->

      <h3>Another sub-sub-heading</h3>
      <img src="assets/images/clown.png" alt="A clown emoji.">  <!-- an image -->
    </section>

    <section>
      <h2>A third sub-heading</h2>
      <a href="https://thi.cc/">
        <img src="assets/images/clown.png" alt="A clown emoji.">  <!-- an image in a hypertext link -->
      </a>
    </section>

    <footer>
      <strong>Contact details</strong>: don't call me, I'll call you.
    </footer>
  </body>
</html>
```


<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0>

    <title>CHANGE THIS TITLE IN INDEX.HTML!</title>

    <!-- CSS stylesheet(s) -->
    <link rel="stylesheet" type="text/css" href="css/style.css" />

    <!-- Library script(s) go here -->
  </head>

  <body>
    <!-- HTML would go here if needed. -->

    <!-- My script(s) -->
    <script src="js/script.js"></script>
  </body>

</html>