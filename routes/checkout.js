const express = require('express');
const router  = express.Router();

module.exports = (db) => {


  router.get("/", (req, res) => {      // non-AJAX route; returns full page of HTML

    const templateVars = {
      order: req.session.order
    };
    console.log(templateVars);
    res.render("checkout", templateVars);

    db.query("UPDATE menu_item SET item_quantity = $2 WHERE id = $1;",[Object.keys(templateVars.order[0])[0],Object.values(templateVars.order[0])[0] ])
    .then(
      db.query( "SELECT * FROM menu_item WHERE id = $1;",[Object.keys(templateVars.order[0])[0]])
      .then(data => {console.log(data.rows)})
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




  return router;
};

