// Dependencies
const express = require('express');
const router = express.Router();
var params = require('../params.js');
var request = require('request');
var https = require('https');

/*
    @TODO:: No Authentication required for now, will implement if needed.
    Below url is to fetch contacts from zoho.com using organization id and
    respected Authorization would be set in params file.
*/

//Routes
router.get('/contacts', function(req, res, next) {
    // Url to fetch the data
    url = 'https://books.zoho.com/api/v3/organizations?organization_id='+params['organization_id']
    let requrl = request.defaults({
        headers: {'Authorization': ' Zoho-authtoken '+params['zohooauthtoken']}
    });
    requrl(url, function(err, response, body) {
        console.log(body);
        if (!err && response.statusCode === 200)
        {
            res.json(JSON.parse(body));
        }
        else
        {
            res.json(error);
        }
    });
});

// Return router
module.exports = router;