const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {        // JSON-only route for AJAX GET
    db.query(`SELECT * FROM menu_item;`)
      .then(data => {

        let templateVars = {
          menu_data: data.rows
        };
       
        res.render("menu", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  })
  return router;
};
