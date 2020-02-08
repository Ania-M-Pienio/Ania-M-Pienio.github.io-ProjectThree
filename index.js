const app = {};

// declares variables after doc is ready
app.variables = function() {
  // stores the preview button node as jQuery object
  app.$button = $(`.preview.edit button`);

  // object that  - set to default
  app.button = {};

  // stores the current state of the preview button text - set to default
  app.button.text = `button text`;

  // store the current state of  the button's css
  app.button.width = `200px`;
  app.button.height = `100px`;
  app.button.border = `none`;
  app.button.backgroundColor = `#EDEAE5`;
  app.button.color = `#FEF9C7`;
  app.button.textDecoration = `none`;
  app.button.fontFamily = `'Arial', sans-serif`;
  app.button.fontSize = `16px`;
  app.button.fontWeight = `bold`;
  app.button.letterSpacing = `1.2`;
  app.button.lineHeight = `normal`;
  app.button.textAlign = `center`;
}; // end of variables

// scrolls to the element with the given id
app.scrollToElem = function(id) {
  let element = document.getElementById(id);
  element.scrollIntoView({ behavior: "smooth" });
};

// replaces the innter text node of the button
app.setButtonText = function(inputText) {
  // update the variable that stores the button text
  app.button.text = inputText;

  // update the UI with the button text
  app.$button.text(app.button.text);
};

// scrubs out old css (incl defaults) and replaces with all new css
app.updateDisplayButton = function() {
  app.$button.removeClass(`default`); // removes any defaults
  app.$button.css("all", "unset"); // start css from scratch - variables will keep track of state
  app.$button.css({
    width: `${app.button.width}`,
    height: `${app.button.height}`,
    border: `${app.button.border}`,
    "background-color": `${app.button.backgroundColor}`,
    color: `${app.button.color}`,
    "text-decoration": `${app.button.textDecoration}`,
    "font-family": `${app.button.fontFamily}`,
    "font-size": `${app.button.fontSize}`,
    "font-weight": `${app.button.fontWeight}`,
    "letter-spacing": `${app.button.letterSpacing}`,
    "line-height": `${app.button.lineHeight}`,
    "text-align": `${app.button.textAlign}`
  });
}; // end of updateDisplayButton

app.init = function() {
  app.variables();

  // Handler Menu Button - scrolls to the Button Area
  $(`header button`).on(`click`, function() {
    app.scrollToElem(`main`);
  });

  // Handler Button Text Input
  $(`.option.text input`).on(`keyup`, function() {
    app.setButtonText($(this).val());
  });






  // ----------------TEST BUTTON -----------------------------
  $(`.test button`).on(`click`, function() {});

  $(`.test2 button`).on(`click`, function() {});
  // ----------------------------------------------------------





}; // end of init

$(() => {
  app.init();
}); // end of doc ready
