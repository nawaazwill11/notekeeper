var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/hello', function(req, res, next) {
    const response = {
        msg: 'Hello from Server'
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(response));
});
  
module.exports = router;
  