var request = require('superagent');

var mailchimpInstance   = 'us7',
    listUniqueId        = '6be13adfd8',
    mailchimpApiKey     = 'd6f941b09ba398bb520ffbb594e48054-us7';

exports.post = function post(req, res) {
  request
      .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
      .set('Content-Type', 'application/json;charset=utf-8')
      .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
      .send({
        'email_address': req.body.email,
        'status': 'subscribed'
      })
      .end(function(err, response) {
        console.log(response);
        if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
          res.send('Signed Up!');
        } else {
          res.send('Sign Up Failed :(');
        }
      });
}