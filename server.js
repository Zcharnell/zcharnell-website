var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  errorHandler = require('errorhandler'),
  methodOverride = require('method-override');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/client'));

var db = require('mongoskin').db('mongodb://heroku_app37223829:tolsu4ust0l7mhob7ahlon4v14@ds041032.mongolab.com:41032/heroku_app37223829/zcharnellphotos');
console.log(db);


app.get("/renamephoto", function (req, res) {
  var x = req.query;
  var callback = function(error, result){
    if(result)
    {
      res.end("done");
    }
  }
  db.collection("data").findOne({id: x.id}, function(err, result1) {
    if(result1){
      console.log(result1);
      result1.name = x.name;
      db.collection("data").save(result1, callback);
    }
    else{
      db.collection("data").insert(x, callback);
    }
  });
  
  });

app.get("/deletephoto", function (req, res) {
  var index = req.query.id;
  var callback = function(error, result){
    if(result)
    {
      res.end("deleted");
    }
  }
  db.collection("data").remove({"id": index.toString()}, callback);
});


app.get("/listphotos", function (req, res) {
  db.collection("data").find().toArray(function(err, result) {
      if(result)
      {
      res.end(JSON.stringify(result));
    }
  });
});







app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

var fs = require('fs');
var AWS = require('aws-sdk');
var aws = require('aws-sdk');
var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET;
AWS.config.loadFromPath('./credentials.json');
var s3 = new AWS.S3()//.client;

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
app.use('/uploadFile', multipartMiddleware);

app.post('/uploadFile', function(req, res){
     var intname = req.body.fileInput;
     var fordb = JSON.parse(decodeURIComponent(req.body.fordb));
     console.log(JSON.stringify(fordb));

     db.collection("data").insert(fordb, function(err2, result){
         if(result){
             res.end("success");
         }
     });

     var tmpPath = req.files.input.path;
     var s3Path = '/' + intname;
                            
     fs.readFile(tmpPath, function (err, data) {
         var params = {
             Bucket: 'portfolio-unsplash',
             ACL: 'public-read',
             Key: intname,
             Body: data
         };
         s3.putObject(params, function(err1, data) {});
     });
     
});



app.get('/sign_s3', function(req, res){
    aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
    var s3 = new aws.S3();
    console.log('envbucket: ' + process.env.S3_BUCKET);
    //console.log('bucket ' +);
    var s3_params = {
        Bucket: 'portfolio-unsplash',
        Key: req.query.file_name,
        Expires: 60,
        ContentType: req.query.file_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            var return_data = {
                signed_request: data,
                url: 'https://'+ 'portfolio-unsplash' + '.s3.amazonaws.com/'+req.query.file_name
            };
            res.write(JSON.stringify(return_data));
            res.end();
        }
    });
});










app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
