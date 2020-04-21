var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/hello', function(req, res, next) {
    const response = {
        msg: 'Hello from Server'
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(response));
});

router.get('/loadData', function (req, res, next) {
    console.log('here');
    try {
        const db = fs.readFileSync('db.json', 'utf-8');
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(db);
    }
    catch(e) {
        console.log(e);
    }
});
  
module.exports = router;
  