const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {        // JSON-only route for AJAX GET
    db.query(`SELECT * FROM menu_item;`)
      .then(data => {
        console.log(data);
        let templateVars = data.rows;
        res.json({templateVars});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  })
  return router;
};