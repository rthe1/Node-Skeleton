const express = require('express');
const router  = express.Router();

module.exports = (db) => {


  router.get("/", (req, res) => {      // non-AJAX route; returns full page of HTML

    const templateVars = {
      order: req.session.order
    };
    console.log(templateVars);
    res.render("checkout", templateVars);

  });

  router.post("/add-cart",(req, res) => {

    const order = req.body.order;
    req.session.order = order;
    res.redirect("/checkout");

   console.log(order);
  });



  return router;
};

