const app = {};

// declares variables after doc is ready
app.variables = function() {
  app.$button = $(`.preview.edit button`);
}

// scrolls to the element with the given id
app.scrollToElem = function(id) {
  let element = document.getElementById(id);
  element.scrollIntoView({ behavior: "smooth" });
};

// replaces the innter text node of the button
app.replaceButtonText = function(text) {
     app.$button.text(text); 
} 

app.init = function() {

  app.variables(); 

  // Start It listener - scrolls to the Button Area
  $(`header button`).on(`click`, function() {
    app.scrollToElem(`main`);
  });


  // Button Text Input listener 
  $(`.option.text input`).on(`keyup`, function() {
      app.replaceButtonText($(this).val());
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
