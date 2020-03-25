var express = require("express");
var req = require("request");
var app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
   response.render("home"); 
});

app.get("/results", function(request, response) {
    var query = request.query.search;
    var url = 'https://openlibrary.org/api/books?bibkeys=ISBN:' + query + "&jscmd=data&format=json";
    req(url, function(error, res, dataStream) {
        if(!error && res.statusCode == 200) {
            var data = JSON.parse(dataStream);
            console.dir(data["ISBN:" + query]);
            response.render("results", { data : data["ISBN:" + query]});
        }
    });
});

app.get('*', function(request, response) {
    response.render("error");
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is up ;)");  
})