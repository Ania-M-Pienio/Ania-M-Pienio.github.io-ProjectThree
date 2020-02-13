const app = {};

/****************************************************************/
/*****************        INITIALIZERS        *******************/
/****************************************************************/

// declares variables after doc is ready
app.variables = function() {
  app.button = {};
  app.menuOpen = false;
  app.$button = $(`.preview.edit button`);
  app.$input = $(`input#buttonText`);
  app.$drops = $(`.select`);
  app.$styles = $(`button#buttonStyles`);
  app.$fills = $(`button#buttonFills`);
  app.$stylesMenu = $(`.stylesMenu`);
  app.$fillsMenu = $(`.fillsMenu`);
  app.$gradient1 = $(`#gradient1`);
  app.$gradient2 = $(`#gradient2`);
  app.text = `button text`;
  app.switchHtml = ``;
  app.clipboard = ``;
}; // end of variables

// prepares defaults
app.setup = function() {
  // Handler Banner Button - scrolls to the Button Area
  $(`header button`).on(`click`, function() {
    app.scrollToElem(`main`);
  });
  app.$button.text(app.text);
  app.$input.val(app.text);
  app.setDefaults();
  $(`form.edit .display.icons.code .preview .cssFormat`).css(
    "transform",
    "scale(0.1)"
  );
};

/****************************************************************/
/*****************          SETTERS           *******************/
/****************************************************************/

// replaces the text that appears on the button
app.updateText = function(inputText) {
  // [1] updates the variable that stores the button text
  app.text = inputText;

  // [2] update the UI with the stored button text
  app.$button.text(app.text);
};

// set the default state of the button's css
app.setDefaults = function() {
  // [1]  sets default values for the button when not customized
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
    "border-bottom": { value: `4px solid #D9D1C3`, color: `blue` }
  };
  // [2]  update all UI to reflect the default values
  app.updatePickers();
  app.updateButton();
  app.updateCSS();
};

// replaces old css with new css into button display
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
}; // end of updateButton

// removes old list items and adds new list-items into the css code display
app.updateCSS = function() {
  const $list = $(`ul`);
  $list.html(``); // clear html
  app.clipboard = `.vibe {`; // clear the clipboard
  for (let cssItem in app.button) {
    const listItem = this.getCSSHtml(
      cssItem,
      app.button[cssItem].value,
      app.button[cssItem].color
    );
    $list.append(listItem); // goes to display
    app.clipboard =
      app.clipboard +
      "\n" +
      "\t" +
      `${cssItem} : ${app.button[cssItem].value};`;
  } // end of let-in
  app.clipboard = app.clipboard + "\n" + `}`;
}; // end of setCSS

// updates the values and background color of the color pickers on fill menu
app.updatePickers = function() {
  $(`input.jscolor:not(input#text):not(input#border)`).val(
    app.button.background.value
  );
  $(`input#text`).val(app.button.color.value);
  $(`input#border`).val(app.parseBorder(app.button.border.value));
};

/****************************************************************/
/*****************          GETTERS          *******************/
/****************************************************************/

// creates a list item as html and returns it
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

app.getToastHtml = function(mssg, icon, color, extra) {

  let toasterHtml = `<div class="toaster">`;
  if (icon) {
    toasterHtml += `<i class="${icon}" style="color: ${color}"></i>`;
  }
  toasterHtml += `<h3>${mssg}</h3>`;
  if (extra) {
    toasterHtml += `<button type="button">`;
    if (extra.icon) {
      toasterHtml += `<i class="${extra.icon}" style="color: ${extra.iconColor}"></i>`;
    } 
    toasterHtml += `<h4>${extra.mssg}</h4></button>`;
  }
  toasterHtml += `</div>`;
  return toasterHtml;
};

/****************************************************************/
/*****************           HELPERS          *******************/
/****************************************************************/

// moves drop-down buttons around depending on what is being opended/clicked
app.toggleMenu = function($menu, $other) {
  app.menuOpen ? $menu.hide() : $menu.show();

  app.menuOpen = !app.menuOpen;

  app.menuOpen
    ? $other
        .hide()
        .prev()
        .hide()
        .parent()
        .hide()
    : $other
        .css({ display: `flex` })
        .prev()
        .show()
        .parent()
        .show();

  app.menuOpen
    ? $menu.parent().css({ background: `#9FEDD7` })
    : $menu.parent().css({ background: `white` });
};

// scrolls to the element with the given id
app.scrollToElem = function(id) {
  const element = document.getElementById(id);
  element.scrollIntoView({ behavior: "smooth" });
};

// extracts the color hex from  a border string
app.parseBorder = function(border) {
  return border.split(` `)[2];
};

app.toggleToaster = function(id, duration, flex) {
  $(`${id} .toaster`)
    .show(`fast`)
    .css({
      display: `flex`,
      "flex-direction": `${flex}`,
      "justify-content": `space-evenly`,
      "align-items": `center`
    });
  $(`${id} .toaster i`).fadeIn(`slow`).focus();
  setTimeout(() => {
    $(`${id} .toaster`).fadeOut(`slow`);
     $(`${id} .toaster`).remove();
    $(`${id}`).blur(); // triggers an unfocus
  }, duration);
};

app.copyCSS = function() {
  $(`.css`).html(`<textarea>${app.clipboard}</textarea>`);
  const text = document.getElementsByTagName(`textarea`);
  text[0].select(); // select only works on html dom nodes
  text[0].setSelectionRange(0, 99999); // for mobile
  document.execCommand(`copy`);
};

/****************************************************************/
/*****************          HANDLERS          *******************/
/****************************************************************/

app.handlersAccessibility = function() {
  // Handler to style a parent upon child's focus
  // Textbox
  app.$input.focus(function() {
    $(this)
      .parent()
      .parent()
      .css({
        background: `#9FEDD7`
      });
  });

  // Handler to style a parent upon child's focus
  // Textbox
  app.$input.focusout(function() {
    $(this)
      .parent()
      .parent()
      .css({
        background: `white`
      });
  });

  // Handler to style a parent upon child's focus
  // List or Style Menu Button
  $(`.select`).focus(function() {
    $(this)
      .parent()
      .css({
        background: `#9FEDD7`
      });
  });

  // Handler to style a parent upon child's focus
  // List or Style Menu Button

  $(`.select`).focusout(function() {
    $(this)
      .parent()
      .css({
        background: `white`
      });
  });

  // Handler to style parent upon child's focus
  // all drop-down option buttons

  $(`button[role=menuitem]`).focus(function() {
    $(this)
      .parent()
      .parent()
      .css({ background: `#9FEDD7` });
  });
}; // end of Accessibility Handlers

// All event handlers for the Input for Button Text -------------------------------
app.hanldersText = function() {
  // Handler Apply Text Input
  app.$input.on(`keyup`, function() {
    app.updateText($(this).val());
  });
};

// All event handlers for Style Menu -------------------------------------
app.handlersStyles = function() {
  // Hanlder Style Menu
  app.$styles.on(`click`, function() {
    app.toggleMenu(app.$stylesMenu, app.$fills);
  });

  // Handler for resetting the form
  $(`button.title`).on(`click`, function() {
    const extra = {
      mssg: `Yes`,
      icon: `fas fa-thumbs-up fa-2x`,
      iconColor: `#9FEDD7`
    };
    $(`button.title`).append(
      app.getToastHtml(
        `Discard all changes?`,
        `fas fa-exclamation-triangle fa-2x`,
        `#FCE181`,
        extra
      )
    );
    app.toggleToaster(`button.title`, 5000, `column`);

    // code to handle smooth removal of toaster

    // to actually reset
    // app.setDefaults();
    // $(`.stylesMenu button`).removeClass(`selected`);
  });

  // Handle on change Style: Square
  $(`button.square`).on(`click`, function() {
    app.button["border-radius"].value = `0`;
    $(this)
      .addClass(`selected`)
      .next()
      .removeClass(`selected`);
    app.updateButton();
    app.updateCSS();
  });

  // Handle on change Style: Chip
  $(`button.chip`).on(`click`, function() {
    app.button["border-radius"].value = `30px`;
    $(this)
      .addClass(`selected`)
      .prev()
      .removeClass(`selected`);
    app.updateButton();
    app.updateCSS();
  });

  // Handle on change Style: Outline
  $(`button.outline`).on(`click`, function() {
    app.button.background.value = `#FFFFFF`;
    app.button.border.value = `4px solid ${app.button.color.value}`;
    app.button["border-bottom"].value = `4px solid ${app.button.color.value}`;
    $(this)
      .addClass(`selected`)
      .next()
      .removeClass(`selected`)
      .next()
      .removeClass(`selected`);
    app.updatePickers();
    app.updateButton();
    app.updateCSS();
  });

  // Handle on change Style: No Outline
  $(`button.none`).on(`click`, function() {
    app.button["border-bottom"].value = `none`;
    app.button.border.value = `none`;
    $(this)
      .addClass(`selected`)
      .prev()
      .removeClass(`selected`);
    app.updateButton();
    app.updateCSS();
  });

  // Handle on change Style : Link
  $(`button.link`).on(`click`, function() {
    app.button.background.value = `#FFFFFF`;
    app.button.border.value = `4px solid #FFFFFF`;
    app.button["border-bottom"].value = `4px solid ${app.button.color.value}`;
    $(this).addClass(`selected`);
    $(`button.none`).removeClass(`selected`);
    app.updatePickers();
    app.updateButton();
    app.updateCSS();
  });
}; // end of Styles

// All event handlers for Fill Menu ----------------------------------------------------
app.handlersFills = function() {
  // Handler Fill Menu
  app.$fills.on(`click`, function() {
    app.toggleMenu(app.$fillsMenu, app.$styles);
  });

  // Handler on change Fill: Text
  $(`input#text`).on(`change`, function() {
    app.button.color.value = $(this).val();
    app.updateButton();
    app.updateCSS();
  });

  // Handler on change Fill: Solid
  $(`input#color`).on(`change`, function() {
    app.button.background.value = $(this).val();
    app.updatePickers();
    app.updateButton();
    app.updateCSS();
  });

  // Handler on change Fill: Border
  $(`input#border`).on(`change`, function() {
    app.button.border.value = `4px solid ${$(this)
      .val()
      .toUpperCase()}`;
    app.button["border-bottom"].value = app.button.border.value;
    // this just styles the Outline option (on Style menu) to show as selcted automatically because applying border color means you are applying outline, and the No Outline becomes unselected
    $(`.option.style button.outline`)
      .addClass(`selected`)
      .next()
      .removeClass(`selected`);
    app.updateButton();
    app.updateCSS();
  });

  // Handler on change Fill: Gradient
  $(`.grad`).on(`change`, function() {
    const grad1 = app.$gradient1.val();
    const grad2 = app.$gradient2.val();
    app.button.background.value = `linear-gradient(to right, ${grad1}, ${grad2})`;
    app.updateButton();
    app.updateCSS();
  });
}; // end of Fills

// All event handlers for viewing the Code: CSS -------------------------------------------------------
app.handlersCCSView = function() {
  // Handler for switching to css code
  $(`button.switch`).on(`click`, function() {
    $(`form.edit .display.icons.code`).css({
      "margin-left": `10px`
    });
    $(`form.edit .display.icons.view`).css({
      visibility: `hidden`
    });
    $(`form.edit .display.icons.code .preview .cssFormat`).css(
      "transform",
      "scale(0.95)"
    );
  });

  // Handler for switching back to button view mode
  $(`button.view`).on(`click`, function() {
    $(`form.edit .icons.code`).css({
      "margin-left": "-2000px"
    });
    $(`form.edit .display.icons.view`).css({
      visibility: `visible`
    });
  });

  $(`button.copy`).on(`click`, function() {
    app.copyCSS();
    $(`button.copy`).append(
      app.getToastHtml(
        `COPIED`,
        `fas fa-check-circle fa-2x`,
        `#9FEDD7`,
        undefined
      )
    );
    app.toggleToaster(`button.copy`, 3000, `row`);
  });
};

app.init = function() {
  app.variables();
  app.setup();
  app.handlersAccessibility();
  app.hanldersText();
  app.handlersStyles();
  app.handlersFills();
  app.handlersCCSView();

  // ----------------TEST BUTTONS -----------------------------
  // ----------------------------------------------------------
  $(`.test2 button`).on(`click`, function() {});

  $(`.test button`).on(`click`, function() {
    const border = $(`input#border`).val();
    console.log(border);
  });
  // ----------------------------------------------------------
  // ----------------------------------------------------------
}; // end of init

$(() => {
  app.init();
}); // end of doc ready
