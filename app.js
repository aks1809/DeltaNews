var express     = require("express");
    bodyParser  = require("body-parser");
    app         = express();
    request     = require("request");
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({ extended: false }));

var business, entertainment, general, health, science, sports, technology, headlines;
//===============
//    Routes
//===============

app.get("/",function(req,res){
    var url = "https://newsapi.org/v2/top-headlines?country=in&sortBy=publishedAt&pageSize=11&apiKey=5b3784c38ccf4e99a23174d7ab0b80e4";
    request(url, function (error, response, body) {
        if(!error && response.statusCode == 200)
            headlines = JSON.parse(body);
            var url = "https://newsapi.org/v2/top-headlines?category=business&country=in&sortBy=publishedAt&pageSize=6&apiKey=5b3784c38ccf4e99a23174d7ab0b80e4";
            request(url, function (error, response, body) {
                if(!error && response.statusCode == 200)
                    business = JSON.parse(body);
                    var url = "https://newsapi.org/v2/top-headlines?category=entertainment&country=in&sortBy=publishedAt&pageSize=6&apiKey=5b3784c38ccf4e99a23174d7ab0b80e4";
                    request(url, function (error, response, body) {
                        if(!error && response.statusCode == 200)
                            entertainment = JSON.parse(body);
                            var url = "https://newsapi.org/v2/top-headlines?category=general&country=in&sortBy=publishedAt&pageSize=6&apiKey=5b3784c38ccf4e99a23174d7ab0b80e4";
                            request(url, function (error, response, body) {
                                if(!error && response.statusCode == 200)
                                    general = JSON.parse(body);
                                    var url = "https://newsapi.org/v2/top-headlines?category=health&country=in&sortBy=publishedAt&pageSize=6&apiKey=5b3784c38ccf4e99a23174d7ab0b80e4";
                                    request(url, function (error, response, body) {
                                        if(!error && response.statusCode == 200)
                                            health = JSON.parse(body);
                                            var url = "https://newsapi.org/v2/top-headlines?category=science&country=in&sortBy=publishedAt&pageSize=6&apiKey=5b3784c38ccf4e99a23174d7ab0b80e4";
                                            request(url, function (error, response, body) {
                                                if(!error && response.statusCode == 200)
                                                    science = JSON.parse(body);
                                                    var url = "https://newsapi.org/v2/top-headlines?category=sports&country=in&sortBy=publishedAt&pageSize=6&apiKey=5b3784c38ccf4e99a23174d7ab0b80e4";
                                                    request(url, function (error, response, body) {
                                                        if(!error && response.statusCode == 200)
                                                            sports = JSON.parse(body);
                                                            var url = "https://newsapi.org/v2/top-headlines?category=technology&country=in&sortBy=publishedAt&pageSize=6&apiKey=5b3784c38ccf4e99a23174d7ab0b80e4";
                                                            request(url, function (error, response, body) {
                                                                if(!error && response.statusCode == 200)
                                                                    technology = JSON.parse(body);
                                                                    res.render("index",{number:parseInt(req.params.pageNumber), headlines:headlines.articles, business:business.articles, entertainment:entertainment.articles, general:general.articles, health:health.articles, science:science.articles, sports:sports.articles, technology:technology.articles});
                                                            });
                                                    });
                                            });
                                    });
                            });
                    });
            });
    });
});
//headlines route
app.get("/:pageNumber",function(req,res){
    var url = "https://newsapi.org/v2/top-headlines?country=in&page="+req.params.pageNumber+"&sortBy=publishedAt&pageSize=10&apiKey=5b3784c38ccf4e99a23174d7ab0b80e4";
    request(url, function (error, response, body) {
        if(!error && response.statusCode == 200)
            var parsedBody = JSON.parse(body);
            var url = "https://newsapi.org/v2/top-headlines?country=in&language=en&sortBy=publishedAt&pageSize=3&apiKey=5b3784c38ccf4e99a23174d7ab0b80e4";
            request(url, function (error, response, body) {
                if(!error && response.statusCode == 200)
                    headlines = JSON.parse(body);
                    res.render("results",{number:parseInt(req.params.pageNumber), data:parsedBody.articles ,totalResults: parseInt(parsedBody.totalResults), headlines: headlines.articles});
            });
    });
});
//category route
app.get("/top-headlines/:category/:pageNumber",function(req,res){
    var url = "https://newsapi.org/v2/top-headlines?category="+req.params.category+"&page="+req.params.pageNumber+"&country=in&sortBy=publishedAt&pageSize=10&apiKey=5b3784c38ccf4e99a23174d7ab0b80e4";
    request(url, function (error, response, body) {
        if(!error && response.statusCode == 200)
            var parsedBody = JSON.parse(body);
            var url = "https://newsapi.org/v2/top-headlines?country=in&language=en&sortBy=publishedAt&pageSize=3&apiKey=5b3784c38ccf4e99a23174d7ab0b80e4";
            request(url, function (error, response, body) {
                if(!error && response.statusCode == 200)
                    headlines = JSON.parse(body);
                    res.render("results",{number:parseInt(req.params.pageNumber), data:parsedBody.articles ,totalResults: parseInt(parsedBody.totalResults), headlines: headlines.articles});
            });
    });
});
//search box route
app.get("/:query/:pageNumber",function(req,res){
    var url = "https://newsapi.org/v2/everything?q="+req.params.query+"&page="+req.params.pageNumber+"&language=en&sortBy=publishedAt&pageSize=10&apiKey=5b3784c38ccf4e99a23174d7ab0b80e4";
    request(url, function (error, response, body) {
        if(!error && response.statusCode == 200)
            var parsedBody = JSON.parse(body);
            var url = "https://newsapi.org/v2/top-headlines?country=in&language=en&sortBy=publishedAt&pageSize=3&apiKey=5b3784c38ccf4e99a23174d7ab0b80e4";
            request(url, function (error, response, body) {
                if(!error && response.statusCode == 200)
                    headlines = JSON.parse(body);
                    res.render("results",{number:parseInt(req.params.pageNumber), data:parsedBody.articles ,totalResults: parseInt(parsedBody.totalResults), headlines: headlines.articles});
            });
    });
});
app.listen(3000,function(){
    console.log("server is running...");
});