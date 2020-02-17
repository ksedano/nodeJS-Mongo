// framework express
var express = require('express');
// bodyparser ens permet processar variables GET i POST
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// per renderitzar les plantilles (render)
app.set('view engine','ejs');
  
var mongo = require('mongodb').MongoClient;
var mongoClient;
  
// connexió a mongo i start app
mongo.connect('mongodb://localhost:27017', function( err, _client ) {
    // si no ens podem connectar, sortim
    if( err ) throw err;
    mongoClient = _client;
    // si no hi ha cap error de connexió, engeguem el servidor
    app.listen(3000, function () {
        console.log('Example app listening on http://localhost:3000 !');
    });
});

// view: llistat elements
app.get('/', function (req, res) {
    var db = mongoClient.db("prova");
    var opcions = {};
    var query = {};
    db.collection('cotxes').find( query, opcions ).toArray(function( err, docs ) {
        if( err ) {
            res.render( 'error', {msg:"error a la query"} );
            return;
        }
        res.render( 'cotxes', {"cotxes":docs} );
    });
});