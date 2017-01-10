var request = require('request');

exports.get = function(req, res){
  request({
      method: 'GET',
      //url: config.accounts.newsletter.url+"/interest-categories/94dbbdfc87/interests", // Topics
      url: config.accounts.newsletter.url+"/interest-categories/e9d31d255c/interests", // Private
      headers: {
        Authorization: 'apikey '+config.accounts.newsletter.apikey,
        'Content-Type': 'application/json'
      }
    },
    function(error, response, body){
      if(error) {
        res.send(error);
      } else {
        var bodyObj = JSON.parse(body);
        res.send(bodyObj);
      }
    }
  );
};

exports.post = function(req, res){
  request({
      method: 'POST',
      url: config.accounts.newsletter.url+"/members",
      body: JSON.stringify({
        "email_address": req.body.email,
        "status": "subscribed",
        "double_optin": false,
        "interests" :config.accounts.newsletter.interests
      }),
      headers: {
        Authorization: 'apikey '+config.accounts.newsletter.apikey,
        'Content-Type': 'application/json'
      }
    },
    function(error, response, body){
      if(error) {
        res.send(error);
      } else {
        var bodyObj = JSON.parse(body);
        res.send(bodyObj);
      }
    }
  );
};