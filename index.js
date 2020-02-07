const app = {};

// declares variables after doc is ready
app.variables = function() {
  // stores the preview button as jQuery object
  app.$button = $(`.preview.edit button`);

  // stores the current state of the preview button text 
  app.buttonText = `button text`;

}

// scrolls to the element with the given id
app.scrollToElem = function(id) {
  let element = document.getElementById(id);
  element.scrollIntoView({ behavior: "smooth" });
};

// replaces the innter text node of the button
app.setButtonText = function(inputText) {
    // update the variable that stores the button text
    app.buttonText = inputText;    

    // update the UI with the button text
    app.$button.text(app.buttonText); 
} 

app.init = function() {

  app.variables(); 

  // Start It handler - scrolls to the Button Area
  $(`header button`).on(`click`, function() {
    app.scrollToElem(`main`);
  });


  // Button Text Input handler
  $(`.option.text input`).on(`keyup`, function() {       
      app.setButtonText($(this).val());
  });









  // ----------------TEST BUTTON -----------------------------
  $(`.test button`).on(`click`, function() {
  
    app.$button.empty().append(
      `<button type="button"> Test </buton>`
    )  

  });




}; // end of init

$(() => {
  app.init();
}); // end of doc ready
