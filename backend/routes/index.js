var express = require('express');
var router = express.Router();
var title = "Drop 'n Swap";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: title });
});

router.get('/dash', function(req, res, next) {
  res.render('dash', { title: title });
});

module.exports = router;
