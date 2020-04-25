const express = require('express');
const router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/loadData', function (request, response) {
    console.log('here');
    try { 
        const db = fs.readFileSync('./db.json', 'utf-8');
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(db);
    }
    catch(e) {
        console.log(e);
    }
});

router.post('/writeData', function(request, response) {
    const database = request.body;
    
    if (typeof(database) === 'object') {
        console.log('Level 1')
        if ('notes' in database) {
            console.log('Level 2')
            if (typeof(database.notes) === 'object') {
                const old_database = (fs.readFileSync('./db.json', 'utf-8'));
                if (old_database !== JSON.stringify(database, null, 4)) {
                    try {
                        console.log('Level 3')
                        fs.writeFileSync(`./db.json`, JSON.stringify(database, null, 4));
                        response.writeHead(200);
                        return response.end('Data written');
                        
                    }
                    catch(e) {
                        console.error('Error while writing data');
                    }
                }
                else {
                    response.writeHead(202);
                    return response.end('Same data');
                    
                }
            }
        }
    }
    response.writeHead(400);
    response.end('Bad data received.');
    
})
  
module.exports = router;
  