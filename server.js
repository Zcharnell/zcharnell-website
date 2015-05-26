var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    hostname = process.env.HOSTNAME || 'localhost';
    //port = parseInt(process.env.PORT, 10);

app.set('port', (process.env.PORT || 5000));

app.get("/", function (req, res) {
  res.redirect("/index.html");
});

/*var db = require('mongoskin').db('mongodb://accountUser:password@localhost:27017/todos');
console.log(db);

var todos = [];

app.get("/addtodo", function (req, res) {
  var x = req.query;
  var callback = function(error,result){
    if(!error){
      res.end("added");
    }
  }
  db.collection("todos").insert(x,callback);
  res.end('added');
});

app.get("/edittodo", function (req, res) {
  var x = req.query;
  console.log('editing... id: ' + x.todoid + ', newtodo: ' + x.newtodo);

  db.collection("todos").update({todoid: x.todoid},{'$set':{newtodo:x.newtodo}},function(err,result){
    if(!err){
      console.log('edit complete');
      res.end("edited");
    }
    else{
      console.log('err:' + err);
    }
  });

  res.end('edited');
});

app.get("/deletetodo", function (req, res) {
  var x = req.query.todoid;
  console.log('Delete id: ' + x);
  db.collection("todos").remove({todoid:x},function(err,result){
    console.log('deleting');
    if(!err) res.end('deleted');
  });
  res.end('deleted');
});

app.get("/listtodos", function (req, res) {
  db.collection('todos').find().toArray(function(err,result){
    if(err) throw err;
    res.end(JSON.stringify(result));
  });
});*/

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/client'));
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

console.log("Simple static server listening at http://" + hostname + ":" + app.get('port'));
app.listen(app.get('port'), hostname);