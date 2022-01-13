// const res = require("express/lib/response");

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
function incNumber(id) {
  let myDisplay = $(`#counter_${id}`);
  let oldNumber = myDisplay.text();
  let newNumber = Number(oldNumber) + 1;
  myDisplay.text(newNumber);
  $.post("/checkout/add-cart", {
    menuId: id,
    itemQuantity: newNumber
  })
  console.log(data);
}
function decNumber(id) {
  // let myDisplay = $(.counter);
  let myDisplay = $(`#counter_${id}`);
    let oldNumber = myDisplay.text();
  let newNumber = Number(oldNumber) - 1;
  if (newNumber < 0) {
    newNumber = 0;
  }
  myDisplay.text(newNumber);
}
$('document').ready(()=>{
  console.log("ready");
  const createMenuElement = function(item) {
    console.log(item);
    const $avatar = $('<img />').attr("src", `${item.image}`);
    const $name = $('<span>').text(`${item.name}`);
    const $price = $('<span>').attr("id","user-email").text(`${item.price}`);
    const $content = $('<p>').text(`${item.description}`);
  

    const $hr = $('<hr />');

    const $item = $('<article>');
    const $header = $('<header>');
    const $footer = $('<footer>');

    const $divHeader = $('<div>');
    const $divMain = $('<div>');
    const $divFooter = $(
      `<div><input type="button" value="+" id="item-quan-${item.id}" class="inc" onclick="incNumber(${item.id})"/> <output name="counter" class="counter" id=counter_${item.id} for="item-quan">0</output> <input type="button" value="-" id = "item-quan-negative-${item.id}" class="dec" onclick="decNumber(${item.id})"/></div>`
    );
    $header.append($divHeader);
    $divHeader.append($avatar);
    $divHeader.append($name);
    
    $divMain.append($content);
    $divMain.append($hr);

    $footer.append($price);
    $footer.append($divFooter);

    $item.append($header);
    $item.append($divMain);
    $item.append($footer);

    return $item;
  };
  const renderItems = function(items) {
    const $itemContainer = $('.item-container');
    //Making sure conatiner is empty before populating new data
    $itemContainer.empty();
    // loops through items
    for (let item = 0; item < items.length; item++) {
    // calls createItemElement for each item
      const newItem = createMenuElement(items[item]);
      $itemContainer.prepend(newItem);
    }
  
  };
  //Ajax to get the data from back end to the front end
 $.get("/api/menu")
 .then(data => {
   console.log(data);
   renderItems(data.templateVars);
 });

  
});