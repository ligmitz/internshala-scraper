const puppeteer = require("puppeteer");

module.exports.query_result = function(queryoptions){
    url_genearate(queryoptions);
}

async function browseractions(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
}

function url_genearate(queryoptions){
    let url = "https://internshala.com.internships/";
    browseractions(url);
}