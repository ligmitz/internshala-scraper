const scraper = require("./src/scraper.js");

module.exports.query = function(queryoptions){
    return scraper.query_result(queryoptions);
}