const app = {};

// declares variables after doc is ready
app.variables = function() {
  app.$preview = $(`.preview.edit`);
}


app.scrollToElem = function(id) {
  let element = document.getElementById(id);
  element.scrollIntoView({ behavior: "smooth" });
};

app.init = function() {
  app.variables(); 
  
  $(`header button`).on(`click`, function() {
    // scrolls to the Button Area
    app.scrollToElem(`main`);
  });

  $(`.test button`).on(`click`, function() {
    // tests something   

    app.$preview.empty().append(
      `<button type="button"> Test </buton>`
    )


  
  });
}; // end of init

$(() => {
  app.init();
}); // end of doc ready
