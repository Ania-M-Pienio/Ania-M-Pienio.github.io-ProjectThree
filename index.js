const app = {};

// declares variables after doc is ready
app.variables = function() {
  app.$button = $(`.preview.edit button`);
  app.$input = $(`input#buttonText`);
  app.$drops = $(`.select`);
  app.$styles = $(`button#buttonStyles`);
  app.$fills = $(`button#buttonFills`);
  app.$stylesMenu = $(`.stylesMenu`);
  app.$fillsMenu = $(`.fillsMenu`);
  app.$gradient1 = $(`#gradient1`);
  app.$gradient2 = $(`#gradient2`);
  app.menuOpen = false;
  app.button = {};
  app.button.text = `button text`;
}; // end of variables

// set up the form with defaults
app.setup = function() {
  app.variables();
  app.$button.text(app.button.text);
  app.$input.val(app.button.text);
  app.setDefaults();
  app.updateCSS();
  app.updatePickers();
  $(`.code .display .preview .cssFormat`).css("transform", "scale(0.1)");
};



app.updatePickers = function() {
  $(`input.jscolor:not(input#text):not(input#border)`).val(
    app.parseHex(app.button.background.value)
  );
  $(`input.jscolor:not(input#text):not(input#border)`).css({
    background: app.button.background.value
  });
  $(`input#text`).val(app.parseHex(app.button.color.value));
  $(`input#text`).css({
    background: app.button.color.value
  });

  $(`input#border`).val(app.parseBorder(app.button.border.value));
  $(`input#border`).css({
    background: `#${app.parseBorder(app.button.border.value)}`
  });
};

// store the current state of  the button's css
app.setDefaults = function() {
  app.button = {
    width: { value: `200px`, color: `green` },
    height: { value: `60px`, color: `green` },
    border: { value: `4px solid #D9D1C3`, color: `blue` },
    color: { value: `#026670`, color: `blue` },
    background: { value: `#D9D1C3`, color: `blue` },
    "font-family": { value: `'Arial', sans-serif`, color: `brown` },
    "font-size": { value: `18px`, color: `green` },
    "font-weight": { value: `bold`, color: `blue` },
    "letter-spacing": { value: `1.2`, color: `green` },
    "line-height": { value: `normal`, color: `blue` },
    "text-align": { value: `center`, color: `blue` },
    "border-radius": { value: `0`, color: `blue` },
    "border-bottom": { value: `none`, color: `blue` }
  };
};

// removes old listitems and adds new list-items into the code display
app.updateCSS = function() {
  const $list = $(`ul`);
  $list.html(``);
  for (let cssItem in app.button) {
    let listItem = this.getCSSHtml(
      cssItem,
      app.button[cssItem].value,
      app.button[cssItem].color
    );
    $list.append(listItem);
  } // end of let-in
}; // end of setCSS


// creates a list item as css and returns it
app.getCSSHtml = function(key, value, color) {
  return `
    <li class="cssFormat"> 
      <span class="red"> ${key} </span>
      <span class="brown"> : </span>
      <span class="${color}"> ${value} </span>
      <span class="brown">; </span>
    </li>   
    `;
};


// scrolls to the element with the given id
app.scrollToElem = function(id) {
  let element = document.getElementById(id);
  element.scrollIntoView({ behavior: "smooth" });
};

// replaces the innter text node of the button with the given
app.updateText = function(inputText) {
  // update the variable that stores the button text
  app.button.text = inputText;

  // update the UI with the stored button text
  app.$button.text(app.button.text);
};

// scrubs out old css from the button and replaces with new css
app.updateButton = function() {
  app.$button.css({
    width: app.button.width.value,
    height: app.button.height.value,
    border: app.button.border.value,
    color: app.button.color.value,
    background: app.button.background.value,
    "font-family": app.button["font-family"].value,
    "font-size": app.button["font-size"].value,
    "font-weight": app.button["font-weight"].value,
    "letter-spacing": app.button["letter-spacing"].value,
    "line-height": app.button["line-height"].value,
    "text-align": app.button["text-align"].value,
    "border-radius": app.button["border-radius"].value,
    "border-bottom": app.button["border-bottom"].value
  });
}; // end of updateDisplayButton

// jockeys control menu around depending on what is being opended/clicked
app.toggleMenu = function($menu, $other) {
  app.menuOpen
    ? $menu.css({ display: `none` })
    : $menu.css({ display: `block` });

  app.menuOpen = !app.menuOpen;

  app.menuOpen
    ? $other
        .css({ display: `none` })
        .prev()
        .css({ display: `none` })
        .parent()
        .css({ display: `none` })
    : $other
        .css({ display: `flex` })
        .prev()
        .css({ display: `block` })
        .parent()
        .css({ display: `block` });

  app.menuOpen
    ? $menu.parent().css({ background: `#9FEDD7` })
    : $menu.parent().css({ background: `white` });
};

app.parseHex = function(hex) {
  if (hex.charAt(0) === `#`) {
    return hex.substring(1, hex.length);
  } else {
    return hex;
  }
};

app.parseBorder = function(border) {
  return border.split(`#`)[1];
};

// All event handlers for Style
app.launchStyles = function() {

   // Hanlder Style Menu
  app.$styles.on(`click`, function() {
    app.toggleMenu(app.$stylesMenu, app.$fills);
  });


    // Handler for resetting the styling
  $(`button.title`).on(`click`, function() {
    app.setDefaults();
    app.updatePickers();
    app.updateButton();
    app.updateCSS();
  });

  // Handle on change Style: Square 
  $(`button.square`).on(`click`, function() {
    app.button["border-radius"].value = `0`;
    app.updateButton();
    app.updateCSS();
  });

  // Handle on change Style: Chip 
  $(`button.chip`).on(`click`, function() {
    app.button["border-radius"].value = `30px`;
    app.updateButton();
    app.updateCSS();
  });

  // Handle on change Style: Outline 
  $(`button.outline`).on(`click`, function() {
    app.button.background.value = `#FFFFFF`;
    app.button.border.value = `4px solid ${app.button.color.value}`;
    app.button["border-bottom"].value = `4px solid ${app.button.color.value}`;
    app.updatePickers();
    app.updateButton();
    app.updateCSS();
  });

  // Handle on change Style: None
  $(`button.none`).on(`click`, function() {
    app.button["border-bottom"].value = `none`;
    app.button.border.value = `none`;
    app.updateButton();
    app.updateCSS();
  });

  // Handle on change Style : Link
  $(`button.link`).on(`click`, function() {
    app.button.background.value = `#FFFFFF`;
    app.button.border.value = `4px solid #FFFFFF`;
    app.button["border-bottom"].value = `4px solid ${app.button.color.value}`;
    app.updatePickers();
    app.updateButton();
    app.updateCSS();
  });

}

// All event handlers for Fill
app.launchFills = function () {

    // Handler Fill Menu
  app.$fills.on(`click`, function() {
    app.toggleMenu(app.$fillsMenu, app.$styles);
  });

  // Handler on change Fill: Text
  $(`input#text`).on(`change`, function() {
    app.button.color.value = `#${$(this).val()}`;
    app.updateButton();
    app.updateCSS();
  });

  // Handler on change Fill: Solid
  $(`input#color`).on(`change`, function() {
    app.button.background.value = `#${$(this).val()}`;
    app.updatePickers();
    app.updateButton();
    app.updateCSS();
  });

  // Handler on change Fill: Border
  $(`input#border`).on(`change`, function() {
    app.button.border.value = `4px solid #${$(this).val()}`;
    app.button["border-bottom"].value = app.button.border.value;
    app.updateButton();
    app.updateCSS();
  });

  // Handler on change Fill: Gradient
  $(`.grad`).on(`change`, function() {
    const grad1 = app.parseHex(app.$gradient1.val());
    const grad2 = app.parseHex(app.$gradient2.val());
    app.button.background.value = `linear-gradient(to right, #${grad1}, #${grad2})`;
    app.updateButton();
    app.updateCSS();
  });
}


app.launchCode = function() {
  
}

app.init = function() {
  app.setup();
  app.launchStyles();
  app.launchFills();

  // Handler Banner Button - scrolls to the Button Area
  $(`header button`).on(`click`, function() {
    app.scrollToElem(`main`);
  });

  // Handler for switching to css code
  $(`button.switch`).on(`click`, function() {
    $(`form.code`).css({
      "margin-left": `0`,
    });
    $(`form.edit .display.icons`).css({
      visibility: `hidden`
    });
    $(`.code .display .preview .cssFormat`)
    .css("transform", "scale(0.95)");
  });

  // Handler Button Text Input Focus
  app.$input.on(`mouseleave`, function() {
    $(`.option.text`).css({ background: `white` });
    $(this).css({ background: `#FCE181` });
  });

  // Handler Button Text Input Unfocus
  app.$input.on(`mouseenter`, function() {
    $(`.option.text`).css({ background: `#9FEDD7` });
    $(this).css({ background: `white` });
  });

  // Handler for when mouse moves over a drop-down menu button
  app.$drops.on(`mouseenter`, function() {
    $(this)
      .parent()
      .css({ background: `#9FEDD7` });
  });

  // Handler for when mouse moves from a drop-down menu button
  app.$drops.on(`mouseleave`, function() {
    app.menuOpen
      ? ""
      : $(this)
          .parent()
          .css({ background: `white` });
  });

  // Handler Apply Text Input
  app.$input.on(`keyup`, function() {
    app.updateText($(this).val());
  });
  
  // Handler for switching back to button view mode
  $(`button.view`).on(`click`, function() {
    $(`form.code`).css({
      "margin-left": "-2000px"
    });
    $(`form.edit .display.icons`).css({
      visibility: `visible`
    });
  });

  // ----------------TEST BUTTONS -----------------------------
  // ----------------------------------------------------------
  $(`.test2 button`).on(`click`, function() {});

  $(`.test button`).on(`click`, function() {});
  // ----------------------------------------------------------
  // ----------------------------------------------------------
}; // end of init

$(() => {
  app.init();
}); // end of doc ready
