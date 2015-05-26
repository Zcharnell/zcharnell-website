var express = require('express'),
  app = express(),
  cool = require('cool-ascii-faces'),
  bodyParser = require('body-parser'),
  errorHandler = require('errorhandler'),
  methodOverride = require('method-override');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/client'));

app.get("/", function (req, res) {
  res.redirect("/index.html");
});

app.get('/', function(request, response) {
  response.send(cool());
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
