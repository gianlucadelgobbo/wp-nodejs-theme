var request = require('request');

exports.get = function(req, res){
  request({
      method: 'GET',
      //url: 'https://us7.api.mailchimp.com/3.0/lists/6be13adfd8/interest-categories/94dbbdfc87/interests', // Topics
      url: 'https://us7.api.mailchimp.com/3.0/lists/6be13adfd8/interest-categories/e9d31d255c/interests', // Private
      headers: {
        Authorization: 'apikey b7105e27ad52b156f2bd004161a173b4-us7',
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
      url: 'https://us7.api.mailchimp.com/3.0/lists/6be13adfd8/members',
      body: JSON.stringify({
        "email_address": req.body.email,
        "status": "subscribed",
        "double_optin": false,
        "interests" :{
          "c7850d049e" : true, // Topic livevisuals
          "62930ecf78" : true // Private LPMsite
        }
      }),
      headers: {
        Authorization: 'apikey b7105e27ad52b156f2bd004161a173b4-us7',
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