const express = require('express');
const router  = express.Router();

module.exports = (db) => {


  router.get("/", (req, res) => {      // non-AJAX route; returns full page of HTML

    db.query("UPDATE menu_item SET item_quantity = $2 WHERE id = $1;",[Object.keys(req.session.order[0])[0],Object.values(req.session.order[0])[0] ])
    .then(
      db.query( "SELECT * FROM menu_item WHERE id = $1;",[Object.keys(req.session.order[0])[0]])
      .then(data => {console.log(data.rows)
        const templateVars = {
          order: req.session.order,
          menu_item: data.rows
        };
        console.log(templateVars);
        res.render("checkout", templateVars);})
      );


  });

  router.post("/add-cart",(req, res) => {
    const order = []
    for (items in req.body) {
      order.push({ [items]: req.body[items]})
    }
    req.session.order = order;
    res.redirect("/checkout");
  });

  router.get("/checkout/confirm", (req, res) => {      // non-AJAX route; returns full page of HTML
    

      );


  });


  // const form = $('#checkout-form');
  // function handleSubmit(event) {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);
  //   form.addEventListener('submit', handleSubmit);
  // }

  // db.query('INSERT INTO customers (name,phone,special_instructions) VALUES ($1,$2,$3)',[])




  return router;
};

