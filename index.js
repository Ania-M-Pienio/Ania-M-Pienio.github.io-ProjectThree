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
};

app.updatePickers = function() {
  $(`input.jscolor:not(input#text)`).val(app.button.background.value);
  $(`input.jscolor:not(input#text)`).css({
    background: app.button.background.value
  });
  $(`input#text`).val(app.button.color.value);
  $(`input#text`).css({
    background: app.button.color.value
  });
};

// store the current state of  the button's css
app.setDefaults = function() {
  app.button = {
    width: { value: `200px`, color: `green` },
    height: { value: `65px`, color: `green` },
    border: { value: `none`, color: `blue` },
    color: { value: `#026670`, color: `blue` },
    background: { value: `#D9D1C3`, color: `blue` },
    "font-family": { value: `'Arial', sans-serif`, color: `brown` },
    "font-size": { value: `16px`, color: `green` },
    "font-weight": { value: `bold`, color: `blue` },
    "letter-spacing": { value: `1.2`, color: `green` },
    "line-height": { value: `normal`, color: `blue` },
    "text-align": { value: `center`, color: `blue` }
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

// replaces the innter text node of the button with the given inputText
app.updateText = function(inputText) {
  // update the variable that stores the button text
  app.button.text = inputText;

  // update the UI with the stored button text
  app.$button.text(app.button.text);
};

// scrubs out old css from the button and replaces with new css
app.updateButton = function() {
  // app.$button.removeClass(`default`); // removes any defaults
  // app.$button.css("all", "unset"); // start css from scratch - variables will keep track of state
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

app.parseGradient = function(hex) {
  if (hex.charAt(0) === `#`) {
    return hex.substring(1, hex.length);
  } else {
    return hex;
  }
};

app.init = function() {
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

  // Handler Button Text Engaged
  app.$input.on(`keyup`, function() {
    app.updateText($(this).val());
  });

  // Hanlder Styles Buttons
  app.$styles.on(`click`, function() {
    app.toggleMenu(app.$stylesMenu, app.$fills);
  });

  // Handler Fills Buttons
  app.$fills.on(`click`, function() {
    app.toggleMenu(app.$fillsMenu, app.$styles);
  });

  // Handler on change Fill: Text
  $(`input#text`).on(`change`, function() {
    app.button.color.value = `#${$(this).val()}`;
    app.updateButton();
    app.updateCSS();
  });

  // Handler on change Fill: Color
  $(`input#color`).on(`change`, function() {
    app.button.background.value = `#${$(this).val()}`;
    app.updatePickers();
    app.updateButton();
    app.updateCSS();
  });

  // Handler on change Fill: Gradient
  $(`.grad`).on(`change`, function() {
    const grad1 = app.parseGradient(app.$gradient1.val());
    const grad2 = app.parseGradient(app.$gradient2.val());
    app.button.background.value = `linear-gradient(to right, #${grad1}, #${grad2})`;
    app.updateButton();
    app.updateCSS();
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
