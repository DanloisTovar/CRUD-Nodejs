const express = require('express');
const router = express.Router();

//Pagina inicial:
router.get('/', (req, res) => {
  res.render('index.ejs');
});

module.exports = router;
