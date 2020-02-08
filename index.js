const app = {};

// declares variables after doc is ready
app.variables = function() {
  //form elements cached as jQuery objects
  app.$button = $(`.preview.edit button`);
  app.$input = $(`input#buttonText`);

  app.$styles = $(`button#buttonStyles`);
  app.$fills = $(`button#buttonFills`);

  app.$stylesMenu = $(`.stylesMenu`);
  app.$fillsMenu = $(`.fillsMenu`);

  app.menuOpen = false;

  // object that  - set to default
  app.button = {};

  // stores the current state of the preview button text - set to default
  app.button.text = `button text`;


}; // end of variables

// set up the form with defaults
app.setup = function() {
  app.$button.text(app.button.text);
  app.$input.val(app.button.text);
  app.setButtonDefaults();
};

app.setButtonDefaults = function() {
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
}

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

// jockeys control menu around depending on what is being opended/clicked
app.toggleMenu = function($menu, $other) {
  // check if anything open - hide/show the menu as needed - so that the menu goes hidden on the next click

  app.menuOpen
    ? $menu.css({ display: `none` }) // close it
    : $menu.css({ display: `block` }); // open it

  // toggle (closed to open) or (open to closed)
  app.menuOpen = !app.menuOpen;

  // check if anything open - hide/show the other control as needed
  app.menuOpen
    ? $other
        .css({ display: `none` })
        .prev()
        .css({ display: `none` })
        .parent().css({ display: `none` }) // make the other button and its label are hidden
    : $other
        .css({ display: `flex` })
        .prev()
        .css({ display: `block` })
        .parent().css({ display: `block` }); //  make the other button and its label visible

  app.menuOpen
    ? $menu.parent().css({ background: `#9FEDD7` })
    : $menu.parent().css({ background: `white` });
};

app.init = function() {
  app.variables();
  app.setup();

  // Handler Banner Button - scrolls to the Button Area
  $(`header button`).on(`click`, function() {
    app.scrollToElem(`main`);
  });

  // Handler Button Text Input
  app.$input.on(`focus`, function() {
    console.log(`clicking input`);

    $(`.option.text`).css({ background: `#9FEDD7`});

    setTimeout(() => {
      $(`.option.text`).css({ background: `white` });
    }, 3000);
        
  });

  app.$input.on(`keyup`, function() {
    app.setButtonText($(this).val());
  });

  // Hanlder Styles Button
  app.$styles.on(`click`, function() {
    // sends to toggle - passes the one to activate, and the one to hide
    app.toggleMenu(app.$stylesMenu, app.$fills);
  });

  // Handler Fills Button
  app.$fills.on(`click`, function() {
    //sends to toggle - passes the one to activate, and the one to hide
    app.toggleMenu(app.$fillsMenu, app.$styles);
  });



  // ----------------TEST BUTTONS -----------------------------
  $(`.test button`).on(`click`, function() {
    app.button.backgroundColor = `#FCE181`;
    app.button.border = `5px solid #E3430E`;
    app.updateDisplayButton();
  });

  $(`.test2 button`).on(`click`, function() {
    app.button.backgroundColor = `#026670`;
    app.button.border = `5px solid #9FEDD7`;
    app.updateDisplayButton();
  });
  // ----------------------------------------------------------
}; // end of init

$(() => {
  app.init();
}); // end of doc ready
