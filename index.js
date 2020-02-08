const app = {};

// declares variables after doc is ready
app.variables = function() {
  //form elements cached as jQuery objects
  app.$button = $(`.preview.edit button`);
  app.$input = $(`input#buttonText`);

  app.$drops = $(`.select`);
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
  app.setDefaults();
};

app.setDefaults = function() {
  // store the current state of  the button's css
  app.button.width = `200px`;
  app.button.height = `100px`;
  app.button.border = `none`;
  app.button.backgroundColor = `#D9D1C3`;
  app.button.color = `#FEF9C7`;
  app.button.textDecoration = `none`;
  app.button.fontFamily = `'Arial', sans-serif`;
  app.button.fontSize = `16px`;
  app.button.fontWeight = `bold`;
  app.button.letterSpacing = `1.2`;
  app.button.lineHeight = `normal`;
  app.button.textAlign = `center`;
};


// creates a list item as css 
app.getCSSHtml = function(key, value, color) {
  return `
    <li> 
      <span class="red"> ${key} </span>
      :
      <span class="${color}"> ${value} </span>
    </li>   
    `;
}

// scrolls to the element with the given id
app.scrollToElem = function(id) {
  let element = document.getElementById(id);
  element.scrollIntoView({ behavior: "smooth" });
};

// replaces the innter text node of the button
app.updateText = function(inputText) {
  // update the variable that stores the button text
  app.button.text = inputText;

  // update the UI with the button text
  app.$button.text(app.button.text);
};

// scrubs out old css (incl defaults) and replaces with all new css
app.updateButton = function() {
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
        .parent()
        .css({ display: `none` }) // make the other button and its label are hidden
    : $other
        .css({ display: `flex` })
        .prev()
        .css({ display: `block` })
        .parent()
        .css({ display: `block` }); //  make the other button and its label visible

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

  // Handler Button Text Input Focus
  app.$input.on(`mouseleave`, function() {
    $(`.option.text`).css({ background: `white` });
    $(this).css({ background: `#FCE181` });
  });

  // Handler Button Text Input Focus
  app.$input.on(`mouseenter`, function() {
    $(`.option.text`).css({ background: `#9FEDD7` });
    $(this).css({ background: `white` });
  });

  app.$drops.on(`mouseenter`, function() {
    $(this)
      .parent()
      .css({ background: `#9FEDD7` });
  });

  app.$drops.on(`mouseleave`, function() {
    app.menuOpen
      ? ""
      : $(this)
          .parent()
          .css({ background: `white` });
  });

  // Handler Button Text Engaged
  app.$input.on(`keyup`, function() {
    app.updateText($(this).val());
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
  $(`.test2 button`).on(`click`, function() {
    app.button.backgroundColor = `#FCE181`;
    app.button.border = `5px solid #E3430E`;
    app.updateButton();
  });

  $(`.test button`).on(`click`, function() {
      console.log(app.getCSSHtml(``))
  });
  // ----------------------------------------------------------
}; // end of init

$(() => {
  app.init();
}); // end of doc ready
